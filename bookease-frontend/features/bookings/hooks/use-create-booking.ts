'use client';

import { useMutation } from '@tanstack/react-query';

import { createBooking } from '@/lib/api/bookings';

export function useCreateBooking() {
  return useMutation({
    mutationFn: createBooking,
  });
}
