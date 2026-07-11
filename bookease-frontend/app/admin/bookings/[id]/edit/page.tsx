"use client";

import {
  AlertCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import {
  useParams,
  useRouter,
} from "next/navigation";
import { useMemo, useState } from "react";

import { AdminBookingForm } from "@/features/bookings/components/admin-booking-form";
import {
  useBooking,
  useUpdateBooking,
} from "@/features/bookings/hooks/use-bookings";
import type { BookingFormValues } from "@/schemas/booking-schema";

function formatDateForInput(dateValue: string) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function EditBookingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const bookingId = params.id;

  const {
    data: booking,
    isLoading,
    isError,
  } = useBooking(bookingId);

  const updateBookingMutation = useUpdateBooking();

  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = useMemo<
    BookingFormValues | undefined
  >(() => {
    if (!booking) {
      return undefined;
    }

    return {
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      serviceId: booking.serviceId,
      bookingDate: formatDateForInput(booking.bookingDate),
      bookingTime: booking.bookingTime,
      notes: booking.notes ?? "",
    };
  }, [booking]);

  async function handleUpdateBooking(
    values: BookingFormValues,
  ) {
    setErrorMessage("");

    try {
      await updateBookingMutation.mutateAsync({
        id: bookingId,
        bookingData: values,
      });

      router.push("/admin/bookings");
    } catch {
      setErrorMessage(
        "Unable to update the booking. Check the entered information and make sure the selected time slot is available.",
      );
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading booking details...
        </div>
      </div>
    );
  }

  if (isError || !booking || !initialValues) {
    return (
      <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to bookings
        </Link>

        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 text-center">
          <AlertCircle className="h-8 w-8 text-red-600" />

          <div>
            <p className="font-medium text-red-900">
              Unable to load booking
            </p>

            <p className="mt-1 text-sm text-red-700">
              The booking may not exist, or the backend server may be
              unavailable.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to bookings
        </Link>

        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Edit Booking
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Update the customer, service, date, time, or additional
            booking information.
          </p>
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="text-sm font-medium text-red-800">
              Booking update failed
            </p>

            <p className="mt-1 text-sm text-red-700">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      <AdminBookingForm
        initialValues={initialValues}
        submitLabel="Update Booking"
        isSubmitting={updateBookingMutation.isPending}
        onSubmit={handleUpdateBooking}
      />
    </main>
  );
}
