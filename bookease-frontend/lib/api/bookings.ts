import { apiClient } from '@/lib/api/axios';
import type { ApiResponse } from '@/types/api';
import type { Booking, CreateBookingPayload } from '@/types/booking';

export async function createBooking(
  bookingData: CreateBookingPayload,
): Promise<Booking> {
  const response = await apiClient.post<ApiResponse<Booking>>(
    '/bookings',
    bookingData,
  );

  return response.data.data;
}
