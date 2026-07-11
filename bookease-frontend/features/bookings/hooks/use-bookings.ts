"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  cancelBooking,
  deleteBooking,
  getBookingById,
  getBookings,
  updateBooking,
  updateBookingStatus,
} from "@/lib/api/bookings";
import type {
  BookingQueryParams,
  BookingStatus,
  UpdateBookingPayload,
} from "@/types/booking";

export const bookingQueryKeys = {
  all: ["bookings"] as const,

  lists: () => [...bookingQueryKeys.all, "list"] as const,

  list: (params: BookingQueryParams) =>
    [...bookingQueryKeys.lists(), params] as const,

  details: () => [...bookingQueryKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...bookingQueryKeys.details(), id] as const,
};

export function useBookings(params: BookingQueryParams) {
  return useQuery({
    queryKey: bookingQueryKeys.list(params),
    queryFn: () => getBookings(params),
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: bookingQueryKeys.detail(id),
    queryFn: () => getBookingById(id),
    enabled: Boolean(id),
  });
}

type UpdateBookingVariables = {
  id: string;
  bookingData: UpdateBookingPayload;
};

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      bookingData,
    }: UpdateBookingVariables) =>
      updateBooking(id, bookingData),

    onSuccess: (updatedBooking) => {
      queryClient.invalidateQueries({
        queryKey: bookingQueryKeys.lists(),
      });

      queryClient.setQueryData(
        bookingQueryKeys.detail(updatedBooking.id),
        updatedBooking,
      );
    },
  });
}

type UpdateBookingStatusVariables = {
  id: string;
  status: BookingStatus;
};

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: UpdateBookingStatusVariables) =>
      updateBookingStatus(id, status),

    onSuccess: (updatedBooking) => {
      queryClient.invalidateQueries({
        queryKey: bookingQueryKeys.lists(),
      });

      queryClient.setQueryData(
        bookingQueryKeys.detail(updatedBooking.id),
        updatedBooking,
      );
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelBooking(id),

    onSuccess: (cancelledBooking) => {
      queryClient.invalidateQueries({
        queryKey: bookingQueryKeys.lists(),
      });

      queryClient.setQueryData(
        bookingQueryKeys.detail(cancelledBooking.id),
        cancelledBooking,
      );
    },
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBooking(id),

    onSuccess: (_, deletedBookingId) => {
      queryClient.invalidateQueries({
        queryKey: bookingQueryKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: bookingQueryKeys.detail(deletedBookingId),
      });
    },
  });
}
