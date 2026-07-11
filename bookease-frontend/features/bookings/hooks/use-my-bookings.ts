"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelMyBooking,
  getMyBookingById,
  getMyBookings,
  updateMyBooking,
} from "@/lib/api/bookings";
import type {
  BookingQueryParams,
  UpdateBookingPayload,
} from "@/types/booking";

export const myBookingQueryKeys = {
  all: ["my-bookings"] as const,
  list: (params: BookingQueryParams) =>
    [...myBookingQueryKeys.all, params] as const,
  detail: (id: string) => [...myBookingQueryKeys.all, "detail", id] as const,
};

export function useMyBookings(params: BookingQueryParams) {
  return useQuery({
    queryKey: myBookingQueryKeys.list(params),
    queryFn: () => getMyBookings(params),
  });
}

export function useMyBooking(id: string) {
  return useQuery({
    queryKey: myBookingQueryKeys.detail(id),
    queryFn: () => getMyBookingById(id),
    enabled: Boolean(id),
  });
}

export function useCancelMyBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelMyBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: myBookingQueryKeys.all,
      });
    },
  });
}

type UpdateMyBookingVariables = {
  id: string;
  bookingData: UpdateBookingPayload;
};

export function useUpdateMyBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, bookingData }: UpdateMyBookingVariables) =>
      updateMyBooking(id, bookingData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: myBookingQueryKeys.all,
      });
    },
  });
}
