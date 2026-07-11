"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

import { useUpdateBookingStatus } from "@/features/bookings/hooks/use-bookings";
import type { BookingStatus } from "@/types/booking";

const bookingStatuses: BookingStatus[] = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
];

type BookingStatusControlProps = {
  bookingId: string;
  currentStatus: BookingStatus;
};

function getStatusClasses(status: BookingStatus) {
  switch (status) {
    case "CONFIRMED":
      return "border-blue-300 bg-blue-50 text-blue-700";

    case "COMPLETED":
      return "border-emerald-300 bg-emerald-50 text-emerald-700";

    case "CANCELLED":
      return "border-red-300 bg-red-50 text-red-700";

    default:
      return "border-amber-300 bg-amber-50 text-amber-700";
  }
}

export function BookingStatusControl({
  bookingId,
  currentStatus,
}: BookingStatusControlProps) {
  const updateStatusMutation = useUpdateBookingStatus();

  const [selectedStatus, setSelectedStatus] =
    useState<BookingStatus>(currentStatus);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleStatusChange(newStatus: BookingStatus) {
    if (newStatus === currentStatus) {
      setSelectedStatus(currentStatus);
      return;
    }

    setSelectedStatus(newStatus);
    setErrorMessage("");

    try {
      await updateStatusMutation.mutateAsync({
        id: bookingId,
        status: newStatus,
      });
    } catch {
      setSelectedStatus(currentStatus);
      setErrorMessage("Unable to update status.");
    }
  }

  return (
    <div className="w-full min-w-0 sm:min-w-40">
      <div className="relative">
        <select
          aria-label="Booking status"
          value={selectedStatus}
          disabled={updateStatusMutation.isPending}
          onChange={(event) =>
            handleStatusChange(event.target.value as BookingStatus)
          }
          className={`h-9 w-full rounded-lg border px-3 pr-9 text-xs font-semibold outline-none transition focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60 ${getStatusClasses(
            selectedStatus,
          )}`}
        >
          {bookingStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {updateStatusMutation.isPending && (
          <Loader2 className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin" />
        )}
      </div>

      {errorMessage && (
        <p className="mt-2 flex items-center gap-1 break-words text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {errorMessage}
        </p>
      )}
    </div>
  );
}
