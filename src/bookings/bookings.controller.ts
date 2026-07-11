import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../../generated/prisma/client';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { GetBookingsQueryDto } from './dto/get-bookings-query.dto';
import { ReplaceBookingDto } from './dto/replace-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // Public endpoint - customer can create a booking without login
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Post('my/bookings')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createMyBooking(@Body() createBookingDto: CreateBookingDto, @Req() request) {
    return this.bookingsService.createForUser(
      createBookingDto,
      request.user.userId,
    );
  }

  // Protected endpoints
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  findAll(@Query() query: GetBookingsQueryDto) {
    return this.bookingsService.findAll(query);
  }

  @Get('my/bookings')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findMyBookings(@Query() query: GetBookingsQueryDto, @Req() request) {
    return this.bookingsService.findForUser(request.user.userId, query);
  }

  @Get('my/bookings/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findMyBooking(@Param('id') id: string, @Req() request) {
    return this.bookingsService.findOneForUser(id, request.user.userId);
  }

  @Patch('my/bookings/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateMyBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Req() request,
  ) {
    return this.bookingsService.updateForUser(
      id,
      request.user.userId,
      updateBookingDto,
    );
  }

  @Patch('my/bookings/:id/cancel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  cancelMyBooking(@Param('id') id: string, @Req() request) {
    return this.bookingsService.cancelForUser(id, request.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  replace(
    @Param('id') id: string,
    @Body() replaceBookingDto: ReplaceBookingDto,
  ) {
    return this.bookingsService.replace(id, replaceBookingDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  updateStatus(
    @Param('id') id: string,
    @Body() updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    return this.bookingsService.updateStatus(id, updateBookingStatusDto);
  }

  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  cancel(@Param('id') id: string) {
    return this.bookingsService.cancel(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
