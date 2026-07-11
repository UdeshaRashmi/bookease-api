"use client";

import {
  AlertCircle,
  CalendarCheck,
  Loader2,
  Pencil,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import { getAuthUser } from "@/features/auth/lib/auth-storage";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import {
  useCancelMyBooking,
  useMyBookings,
} from "@/features/bookings/hooks/use-my-bookings";

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

export default function AccountDashboardPage() {
  const user = getAuthUser();
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

    await cancelBookingMutation.mutateAsync(bookingId);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          My Account
        </p>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome{user?.name ? `, ${user.name}` : ""}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              View your registered bookings, check their status, and manage
              upcoming requests from one place.
            </p>
          </div>

          <div className="grid gap-2 sm:flex">
            <Link
              href="/book"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Create Booking
            </Link>

            <LogoutButton redirectTo="/user" />
          </div>
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="font-semibold">My Bookings</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {bookingResult
                ? `${bookingResult.meta.total} booking${
                    bookingResult.meta.total === 1 ? "" : "s"
                  } found`
                : "Your booking history"}
            </p>
          </div>

          {isFetching && !isLoading && (
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          )}
        </div>

        {isLoading && (
          <div className="flex min-h-72 items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-5 animate-spin" />
              Loading your bookings...
            </div>
          </div>
        )}

        {isError && (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3 px-6 text-center">
            <AlertCircle className="size-9 text-destructive" />
            <div>
              <p className="font-medium">Unable to load bookings</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Please refresh the page or sign in again.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !isError && bookings.length === 0 && (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <CalendarCheck className="size-10 text-muted-foreground" />
            <p className="mt-4 font-medium">No registered bookings yet</p>
            <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">
              Bookings created while signed in will appear here.
            </p>
          </div>
        )}

        {!isLoading && !isError && bookings.length > 0 && (
          <div className="divide-y">
            {bookings.map((booking) => {
              const canManage =
                booking.status !== "CANCELLED" &&
                booking.status !== "COMPLETED";

              return (
                <article key={booking.id} className="space-y-4 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {booking.service.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatBookingDate(booking.bookingDate)} at{" "}
                        {booking.bookingTime}
                      </p>
                    </div>

                    <span className="inline-flex w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {booking.status}
                    </span>
                  </div>

                  <dl className="grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-muted-foreground">Name</dt>
                      <dd className="mt-1 font-medium">
                        {booking.customerName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Email</dt>
                      <dd className="mt-1 break-all font-medium">
                        {booking.customerEmail}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd className="mt-1 font-medium">
                        {booking.customerPhone}
                      </dd>
                    </div>
                  </dl>

                  {canManage && (
                    <div className="grid gap-2 sm:flex">
                      <Link
                        href={`/account/bookings/${booking.id}/edit`}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <Pencil className="size-4" />
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={cancelBookingMutation.isPending}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive/15 disabled:cursor-not-allowed disabled:opacity-60"
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
