import { apiClient } from '@/lib/api/axios';
import type { ApiResponse } from '@/types/api';
import type {
  Booking,
  BookingQueryParams,
  BookingStatus,
  CreateBookingPayload,
  DeleteBookingResponse,
  PaginatedBookings,
  UpdateBookingPayload,
} from '@/types/booking';

export async function createBooking(
  bookingData: CreateBookingPayload,
): Promise<Booking> {
  const response = await apiClient.post<ApiResponse<Booking>>(
    '/bookings',
    bookingData,
  );

  return response.data.data;
}

export async function createMyBooking(
  bookingData: CreateBookingPayload,
): Promise<Booking> {
  const response = await apiClient.post<ApiResponse<Booking>>(
    '/bookings/my/bookings',
    bookingData,
  );

  return response.data.data;
}

export async function getBookings(
  params: BookingQueryParams = {},
): Promise<PaginatedBookings> {
  const response = await apiClient.get<ApiResponse<PaginatedBookings>>(
    '/bookings',
    {
      params,
    },
  );

  return response.data.data;
}

export async function getMyBookings(
  params: BookingQueryParams = {},
): Promise<PaginatedBookings> {
  const response = await apiClient.get<ApiResponse<PaginatedBookings>>(
    '/bookings/my/bookings',
    {
      params,
    },
  );

  return response.data.data;
}

export async function getBookingById(id: string): Promise<Booking> {
  const response = await apiClient.get<ApiResponse<Booking>>(
    `/bookings/${id}`,
  );

  return response.data.data;
}

export async function getMyBookingById(id: string): Promise<Booking> {
  const response = await apiClient.get<ApiResponse<Booking>>(
    `/bookings/my/bookings/${id}`,
  );

  return response.data.data;
}

export async function updateBooking(
  id: string,
  bookingData: UpdateBookingPayload,
): Promise<Booking> {
  const response = await apiClient.patch<ApiResponse<Booking>>(
    `/bookings/${id}`,
    bookingData,
  );

  return response.data.data;
}

export async function updateMyBooking(
  id: string,
  bookingData: UpdateBookingPayload,
): Promise<Booking> {
  const response = await apiClient.patch<ApiResponse<Booking>>(
    `/bookings/my/bookings/${id}`,
    bookingData,
  );

  return response.data.data;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<Booking> {
  const response = await apiClient.patch<ApiResponse<Booking>>(
    `/bookings/${id}/status`,
    {
      status,
    },
  );

  return response.data.data;
}

export async function cancelBooking(id: string): Promise<Booking> {
  const response = await apiClient.patch<ApiResponse<Booking>>(
    `/bookings/${id}/cancel`,
  );

  return response.data.data;
}

export async function cancelMyBooking(id: string): Promise<Booking> {
  const response = await apiClient.patch<ApiResponse<Booking>>(
    `/bookings/my/bookings/${id}/cancel`,
  );

  return response.data.data;
}

export async function deleteBooking(
  id: string,
): Promise<DeleteBookingResponse> {
  const response = await apiClient.delete<
    ApiResponse<DeleteBookingResponse>
  >(`/bookings/${id}`);

  return response.data.data;
}
