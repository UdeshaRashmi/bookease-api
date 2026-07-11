import type { Service } from '@/types/service';

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED';

export type BookingSortOrder = 'asc' | 'desc';

export interface CreateBookingPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
}

export type UpdateBookingPayload = Partial<CreateBookingPayload>;

export interface UpdateBookingStatusPayload {
  status: BookingStatus;
}

export interface BookingQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: BookingStatus;
  date?: string;
  serviceId?: string;
  sort?: BookingSortOrder;
}

export interface BookingPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
  status: BookingStatus;
  notes: string | null;
  service: Service;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedBookings {
  data: Booking[];
  meta: BookingPaginationMeta;
}

export interface DeleteBookingResponse {
  message: string;
}
