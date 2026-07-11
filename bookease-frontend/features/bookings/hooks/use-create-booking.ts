'use client';

import { useMutation } from '@tanstack/react-query';

import { getAuthUser } from '@/features/auth/lib/auth-storage';
import { createBooking, createMyBooking } from '@/lib/api/bookings';

export function useCreateBooking() {
  return useMutation({
    mutationFn: (bookingData: Parameters<typeof createBooking>[0]) => {
      const user = getAuthUser();

      if (user?.role === 'USER') {
        return createMyBooking(bookingData);
      }

      return createBooking(bookingData);
    },
  });
}
