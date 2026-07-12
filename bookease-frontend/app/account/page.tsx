"use client";

import {
  AlertCircle,
  CalendarCheck,
  Loader2,
  Pencil,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { getAuthUser } from "@/features/auth/lib/auth-storage";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import {
  useCancelMyBooking,
  useMyBookings,
} from "@/features/bookings/hooks/use-my-bookings";
import { useState } from "react";

function formatBookingDate(dateValue: string) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-LK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getAuthNameSnapshot() {
  return getAuthUser()?.name ?? "";
}

export default function AccountDashboardPage() {
  const [cancelError, setCancelError] = useState("");
  const userName = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);

      return () => {
        window.removeEventListener("storage", onStoreChange);
      };
    },
    getAuthNameSnapshot,
    () => "",
  );
  const {
    data: bookingResult,
    isLoading,
    isError,
    isFetching,
  } = useMyBookings({
    page: 1,
    limit: 10,
    sort: "desc",
  });
  const cancelBookingMutation = useCancelMyBooking();

  const bookings = bookingResult?.data ?? [];

  async function handleCancelBooking(bookingId: string) {
    const shouldCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!shouldCancel) {
      return;
    }

    setCancelError("");

    try {
      await cancelBookingMutation.mutateAsync(bookingId);
    } catch {
      setCancelError(
        "Unable to cancel this booking. Completed or already cancelled bookings cannot be cancelled.",
      );
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
          My Account
        </p>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="break-words text-3xl font-bold tracking-tight text-slate-950">
              Welcome{userName ? `, ${userName}` : ""}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              View your registered bookings, check their status, and manage
              upcoming requests from one place.
            </p>
          </div>

          <div className="grid gap-2 sm:flex sm:flex-wrap">
            <Link
              href="/book"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Create Booking
            </Link>

            <LogoutButton redirectTo="/user" />
          </div>
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-950">My Bookings</h2>
            <p className="mt-1 text-sm text-slate-500">
              {bookingResult
                ? `${bookingResult.meta.total} booking${
                    bookingResult.meta.total === 1 ? "" : "s"
                  } found`
                : "Your booking history"}
            </p>
          </div>

          {isFetching && !isLoading && (
            <Loader2 className="size-5 animate-spin text-slate-500" />
          )}
        </div>

        {isLoading && (
          <div className="flex min-h-72 items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2 className="size-5 animate-spin" />
              Loading your bookings...
            </div>
          </div>
        )}

        {isError && (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3 px-6 text-center">
            <AlertCircle className="size-9 text-red-500" />
            <div>
              <p className="font-medium text-slate-950">Unable to load bookings</p>
              <p className="mt-1 text-sm text-slate-500">
                Please refresh the page or sign in again.
              </p>
            </div>
          </div>
        )}

        {cancelError && (
          <div className="border-b border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
            {cancelError}
          </div>
        )}

        {!isLoading && !isError && bookings.length === 0 && (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <CalendarCheck className="size-10 text-slate-400" />
            <p className="mt-4 font-medium text-slate-950">
              No registered bookings yet
            </p>
            <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
              Bookings created while signed in will appear here.
            </p>
          </div>
        )}

        {!isLoading && !isError && bookings.length > 0 && (
          <div className="divide-y divide-slate-100">
            {bookings.map((booking) => {
              const canManage =
                booking.status !== "CANCELLED" &&
                booking.status !== "COMPLETED";

              return (
                <article key={booking.id} className="space-y-4 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-950">
                        {booking.service.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {formatBookingDate(booking.bookingDate)} at{" "}
                        {booking.bookingTime}
                      </p>
                    </div>

                    <span className="inline-flex w-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                      {booking.status}
                    </span>
                  </div>

                  <dl className="grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-slate-500">Name</dt>
                      <dd className="mt-1 font-medium text-slate-950">
                        {booking.customerName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Email</dt>
                      <dd className="mt-1 break-all font-medium text-slate-950">
                        {booking.customerEmail}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Phone</dt>
                      <dd className="mt-1 font-medium text-slate-950">
                        {booking.customerPhone}
                      </dd>
                    </div>
                  </dl>

                  {canManage && (
                    <div className="grid gap-2 sm:flex">
                      <Link
                        href={`/account/bookings/${booking.id}/edit`}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950"
                      >
                        <Pencil className="size-4" />
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={cancelBookingMutation.isPending}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <XCircle className="size-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
