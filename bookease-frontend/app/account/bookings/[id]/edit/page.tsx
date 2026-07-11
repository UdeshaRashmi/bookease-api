"use client";

import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { AdminBookingForm } from "@/features/bookings/components/admin-booking-form";
import {
  useMyBooking,
  useUpdateMyBooking,
} from "@/features/bookings/hooks/use-my-bookings";
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

export default function EditMyBookingPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const bookingId = params.id;
  const [errorMessage, setErrorMessage] = useState("");

  const { data: booking, isLoading, isError } = useMyBooking(bookingId);
  const updateBookingMutation = useUpdateMyBooking();

  const initialValues = useMemo<BookingFormValues | undefined>(() => {
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

  async function handleUpdateBooking(values: BookingFormValues) {
    setErrorMessage("");

    try {
      await updateBookingMutation.mutateAsync({
        id: bookingId,
        bookingData: values,
      });

      router.push("/account");
    } catch {
      setErrorMessage(
        "Unable to update this booking. Cancelled or completed bookings cannot be updated.",
      );
    }
  }

  if (isLoading) {
    return (
      <main className="flex min-h-80 items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          Loading booking details...
        </div>
      </main>
    );
  }

  if (isError || !booking || !initialValues) {
    return (
      <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to my account
        </Link>

        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-6 text-center">
          <AlertCircle className="size-8 text-destructive" />
          <div>
            <p className="font-medium">Unable to load booking</p>
            <p className="mt-1 text-sm text-muted-foreground">
              This booking may not belong to your account.
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
          href="/account"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to my account
        </Link>

        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Edit My Booking
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Update details for an upcoming booking request.
          </p>
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-destructive"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p className="text-sm">{errorMessage}</p>
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
