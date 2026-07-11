import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus, Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  BookingSortOrder,
  GetBookingsQueryDto,
} from './dto/get-bookings-query.dto';
import { ReplaceBookingDto } from './dto/replace-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  private validateBookingDate(bookingDate: string) {
    const selectedDate = new Date(bookingDate);
    const today = new Date();

    if (Number.isNaN(selectedDate.getTime())) {
      throw new BadRequestException('Invalid booking date');
    }

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      throw new BadRequestException('Booking date cannot be in the past');
    }
  }

  private async validateService(serviceId: string) {
    const service = await this.prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    if (!service.isActive) {
      throw new BadRequestException('Service is not active');
    }

    return service;
  }

  private async preventDuplicateBooking(
    serviceId: string,
    bookingDate: Date,
    bookingTime: string,
    excludedBookingId?: string,
  ) {
    const duplicateBooking = await this.prisma.booking.findFirst({
      where: {
        serviceId,
        bookingDate,
        bookingTime,
        status: {
          not: BookingStatus.CANCELLED,
        },
        ...(excludedBookingId
          ? {
              id: {
                not: excludedBookingId,
              },
            }
          : {}),
      },
    });

    if (duplicateBooking) {
      throw new BadRequestException(
        'A booking already exists for this service, date and time',
      );
    }
  }

  // CREATE
  async create(createBookingDto: CreateBookingDto) {
    return this.createBooking(createBookingDto);
  }

  async createForUser(createBookingDto: CreateBookingDto, userId: string) {
    return this.createBooking(createBookingDto, userId);
  }

  private async createBooking(createBookingDto: CreateBookingDto, userId?: string) {
    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceId,
      bookingDate,
      bookingTime,
      notes,
    } = createBookingDto;

    await this.validateService(serviceId);
    this.validateBookingDate(bookingDate);

    const parsedBookingDate = new Date(bookingDate);

    await this.preventDuplicateBooking(
      serviceId,
      parsedBookingDate,
      bookingTime,
    );

    return this.prisma.booking.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        serviceId,
        bookingDate: parsedBookingDate,
        bookingTime,
        notes,
        userId,
      },
      include: {
        service: true,
      },
    });
  }

  // RETRIEVE ALL + PAGINATION + SEARCH + FILTER + SORTING
  async findAll(query: GetBookingsQueryDto) {
    return this.findBookings(query);
  }

  async findForUser(userId: string, query: GetBookingsQueryDto) {
    return this.findBookings(query, userId);
  }

  private async findBookings(query: GetBookingsQueryDto, userId?: string) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      date,
      serviceId,
      sort = BookingSortOrder.DESC,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.BookingWhereInput = userId ? { userId } : {};

    if (search) {
      where.OR = [
        {
          customerName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          customerEmail: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          customerPhone: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          service: {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (serviceId) {
      where.serviceId = serviceId;
    }

    if (date) {
      const bookingDate = new Date(date);

      if (Number.isNaN(bookingDate.getTime())) {
        throw new BadRequestException('Invalid booking date filter');
      }

      bookingDate.setHours(0, 0, 0, 0);

      const nextDate = new Date(bookingDate);
      nextDate.setDate(nextDate.getDate() + 1);

      where.bookingDate = {
        gte: bookingDate,
        lt: nextDate,
      };
    }

    const [total, bookings] = await this.prisma.$transaction([
      this.prisma.booking.count({
        where,
      }),
      this.prisma.booking.findMany({
        where,
        include: {
          service: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: sort,
        },
      }),
    ]);

    return {
      data: bookings,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // RETRIEVE ONE
  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async findOneForUser(id: string, userId: string) {
    const booking = await this.findOne(id);

    if (booking.userId !== userId) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  // PUT - FULL UPDATE
  async replace(id: string, replaceBookingDto: ReplaceBookingDto) {
    await this.findOne(id);

    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceId,
      bookingDate,
      bookingTime,
      notes,
    } = replaceBookingDto;

    await this.validateService(serviceId);
    this.validateBookingDate(bookingDate);

    const parsedBookingDate = new Date(bookingDate);

    await this.preventDuplicateBooking(
      serviceId,
      parsedBookingDate,
      bookingTime,
      id,
    );

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        customerName,
        customerEmail,
        customerPhone,
        serviceId,
        bookingDate: parsedBookingDate,
        bookingTime,
        notes,
      },
      include: {
        service: true,
      },
    });
  }

  // PATCH - PARTIAL UPDATE
  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const existingBooking = await this.findOne(id);

    const serviceId = updateBookingDto.serviceId ?? existingBooking.serviceId;

    const bookingDateString =
      updateBookingDto.bookingDate ?? existingBooking.bookingDate.toISOString();

    const bookingTime =
      updateBookingDto.bookingTime ?? existingBooking.bookingTime;

    await this.validateService(serviceId);
    this.validateBookingDate(bookingDateString);

    const parsedBookingDate = new Date(bookingDateString);

    await this.preventDuplicateBooking(
      serviceId,
      parsedBookingDate,
      bookingTime,
      id,
    );

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        customerName: updateBookingDto.customerName,
        customerEmail: updateBookingDto.customerEmail,
        customerPhone: updateBookingDto.customerPhone,
        serviceId: updateBookingDto.serviceId,
        bookingDate: updateBookingDto.bookingDate
          ? parsedBookingDate
          : undefined,
        bookingTime: updateBookingDto.bookingTime,
        notes: updateBookingDto.notes,
      },
      include: {
        service: true,
      },
    });
  }

  async updateForUser(
    id: string,
    userId: string,
    updateBookingDto: UpdateBookingDto,
  ) {
    const booking = await this.findOne(id);

    if (booking.userId !== userId) {
      throw new NotFoundException('Booking not found');
    }

    if (
      booking.status === BookingStatus.CANCELLED ||
      booking.status === BookingStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Cancelled or completed bookings cannot be updated',
      );
    }

    return this.update(id, updateBookingDto);
  }

  // PATCH STATUS
  async updateStatus(
    id: string,
    updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    const booking = await this.findOne(id);

    if (
      booking.status === BookingStatus.CANCELLED &&
      updateBookingStatusDto.status === BookingStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Cancelled booking cannot be marked as completed',
      );
    }

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: updateBookingStatusDto.status,
      },
      include: {
        service: true,
      },
    });
  }

  // CANCEL BOOKING
  async cancel(id: string) {
    const booking = await this.findOne(id);

    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException('Booking is already cancelled');
    }

    if (booking.status === BookingStatus.COMPLETED) {
      throw new BadRequestException('Completed booking cannot be cancelled');
    }

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: BookingStatus.CANCELLED,
      },
      include: {
        service: true,
      },
    });
  }

  async cancelForUser(id: string, userId: string) {
    const booking = await this.findOne(id);

    if (booking.userId !== userId) {
      throw new NotFoundException('Booking not found');
    }

    return this.cancel(id);
  }

  // DELETE
  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.booking.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Booking deleted successfully',
    };
  }
}
