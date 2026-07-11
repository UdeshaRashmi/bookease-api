"use client";

import {
  Ban,
  Loader2,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import {
  useCancelBooking,
  useDeleteBooking,
} from "@/features/bookings/hooks/use-bookings";
import type { BookingStatus } from "@/types/booking";

type BookingActionControlsProps = {
  bookingId: string;
  customerName: string;
  currentStatus: BookingStatus;
};

export function BookingActionControls({
  bookingId,
  customerName,
  currentStatus,
}: BookingActionControlsProps) {
  const cancelBookingMutation = useCancelBooking();
  const deleteBookingMutation = useDeleteBooking();

  const [errorMessage, setErrorMessage] = useState("");

  const isCancelling = cancelBookingMutation.isPending;
  const isDeleting = deleteBookingMutation.isPending;
  const isProcessing = isCancelling || isDeleting;

  const cannotCancel =
    currentStatus === "CANCELLED" ||
    currentStatus === "COMPLETED";

  async function handleCancelBooking() {
    const shouldCancel = window.confirm(
      `Are you sure you want to cancel ${customerName}'s booking?`,
    );

    if (!shouldCancel) {
      return;
    }

    setErrorMessage("");

    try {
      await cancelBookingMutation.mutateAsync(bookingId);
    } catch {
      setErrorMessage(
        "Unable to cancel this booking. Completed or already cancelled bookings cannot be cancelled.",
      );
    }
  }

  async function handleDeleteBooking() {
    const shouldDelete = window.confirm(
      `Are you sure you want to permanently delete ${customerName}'s booking? This action cannot be undone.`,
    );

    if (!shouldDelete) {
      return;
    }

    setErrorMessage("");

    try {
      await deleteBookingMutation.mutateAsync(bookingId);
    } catch {
      setErrorMessage(
        "Unable to delete this booking. Please try again.",
      );
    }
  }

  return (
    <div className="w-full min-w-0 sm:min-w-44">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
        <button
          type="button"
          disabled={isProcessing || cannotCancel}
          onClick={handleCancelBooking}
          title={
            currentStatus === "COMPLETED"
              ? "Completed bookings cannot be cancelled"
              : currentStatus === "CANCELLED"
                ? "This booking is already cancelled"
                : "Cancel booking"
          }
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50 sm:px-3"
        >
          {isCancelling ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Ban className="h-4 w-4" />
          )}

          {isCancelling ? "Cancelling..." : "Cancel"}
        </button>

        <button
          type="button"
          disabled={isProcessing}
          onClick={handleDeleteBooking}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-red-300 bg-red-50 px-2 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:px-3"
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}

          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {errorMessage && (
        <p className="mt-2 text-left text-xs leading-5 text-red-600 sm:text-right">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
