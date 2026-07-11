"use client";

import {
  AlertCircle,
  CalendarCheck,
  Clock3,
  LayoutDashboard,
  Loader2,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { useBookings } from "@/features/bookings/hooks/use-bookings";
import { useServices } from "@/features/services/hooks/use-services";

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

export default function AdminDashboardPage() {
  const {
    data: services = [],
    isLoading: isServicesLoading,
    isError: isServicesError,
  } = useServices();

  const {
    data: recentBookingsResult,
    isLoading: isBookingsLoading,
    isError: isBookingsError,
  } = useBookings({
    page: 1,
    limit: 5,
    sort: "desc",
  });

  const {
    data: pendingBookingsResult,
    isLoading: isPendingLoading,
    isError: isPendingError,
  } = useBookings({
    page: 1,
    limit: 1,
    status: "PENDING",
    sort: "desc",
  });

  const activeServicesCount = services.filter(
    (service) => service.isActive,
  ).length;

  const totalBookings =
    recentBookingsResult?.meta.total ?? 0;

  const pendingBookings =
    pendingBookingsResult?.meta.total ?? 0;

  const recentBookings =
    recentBookingsResult?.data ?? [];

  const isLoading =
    isServicesLoading ||
    isBookingsLoading ||
    isPendingLoading;

  const hasError =
    isServicesError ||
    isBookingsError ||
    isPendingError;

  const statistics = [
    {
      title: "Total Services",
      value: services.length,
      description: "All services created in BookEase",
      icon: Wrench,
    },
    {
      title: "Active Services",
      value: activeServicesCount,
      description: "Services currently available to customers",
      icon: CalendarCheck,
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      description: "All customer booking records",
      icon: LayoutDashboard,
    },
    {
      title: "Pending Bookings",
      value: pendingBookings,
      description: "Bookings that still need attention",
      icon: Clock3,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Admin Overview
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            BookEase Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Monitor services and customer bookings from one place.
          </p>
        </div>

        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <Link
            href="/admin/services/new"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Add Service
          </Link>

          <Link
            href="/admin/bookings"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Manage Bookings
          </Link>
        </div>
      </div>

      {isLoading && (
        <div className="mt-8 flex min-h-48 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading dashboard information...
          </div>
        </div>
      )}

      {!isLoading && hasError && (
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="font-medium text-red-900">
              Unable to load complete dashboard information
            </p>

            <p className="mt-1 text-sm text-red-700">
              Check whether you are logged in and the backend server is
              running.
            </p>
          </div>
        </div>
      )}

      {!isLoading && !hasError && (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {statistics.map((statistic) => {
              const Icon = statistic.icon;

              return (
                <article
                  key={statistic.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        {statistic.title}
                      </p>

                      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                        {statistic.value}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100">
                      <Icon className="h-5 w-5 text-slate-700" />
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    {statistic.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <h2 className="font-semibold text-slate-950">
                    Recent Bookings
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Latest customer booking requests
                  </p>
                </div>

                <Link
                  href="/admin/bookings"
                  className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
                >
                  View all
                </Link>
              </div>

              {recentBookings.length === 0 ? (
                <div className="flex min-h-56 flex-col items-center justify-center px-6 text-center">
                  <CalendarCheck className="h-9 w-9 text-slate-400" />

                  <p className="mt-3 font-medium text-slate-900">
                    No bookings available
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    New customer bookings will appear here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="hidden w-full min-w-175 text-left md:table">
                    <thead className="bg-slate-50 text-xs font-semibold tracking-wide text-slate-600 uppercase">
                      <tr>
                        <th className="px-5 py-4">Customer</th>
                        <th className="px-5 py-4">Service</th>
                        <th className="px-5 py-4">Date</th>
                        <th className="px-5 py-4">Status</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {recentBookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="transition hover:bg-slate-50"
                        >
                          <td className="px-5 py-4">
                            <p className="text-sm font-medium text-slate-900">
                              {booking.customerName}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {booking.customerEmail}
                            </p>
                          </td>

                          <td className="px-5 py-4 text-sm text-slate-700">
                            {booking.service.title}
                          </td>

                          <td className="px-5 py-4">
                            <p className="text-sm text-slate-700">
                              {formatBookingDate(
                                booking.bookingDate,
                              )}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {booking.bookingTime}
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="divide-y divide-slate-200 md:hidden">
                    {recentBookings.map((booking) => (
                      <article key={booking.id} className="space-y-3 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="break-words text-sm font-medium text-slate-900">
                              {booking.customerName}
                            </h3>

                            <p className="mt-1 break-all text-sm text-slate-500">
                              {booking.customerEmail}
                            </p>
                          </div>

                          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                            {booking.status}
                          </span>
                        </div>

                        <dl className="grid gap-3 text-sm min-[460px]:grid-cols-2">
                          <div>
                            <dt className="text-slate-500">Service</dt>
                            <dd className="mt-1 break-words font-medium text-slate-900">
                              {booking.service.title}
                            </dd>
                          </div>

                          <div>
                            <dt className="text-slate-500">Date & time</dt>
                            <dd className="mt-1 font-medium text-slate-900">
                              {formatBookingDate(booking.bookingDate)}
                            </dd>
                            <dd className="mt-1 text-slate-500">
                              {booking.bookingTime}
                            </dd>
                          </div>
                        </dl>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-5">
              <Link
                href="/admin/services"
                className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100">
                  <Wrench className="h-5 w-5 text-slate-700" />
                </div>

                <h2 className="mt-5 font-semibold text-slate-950">
                  Service Management
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Create, edit, activate, deactivate, and remove
                  BookEase services.
                </p>

                <p className="mt-5 text-sm font-medium text-slate-900">
                  Manage services →
                </p>
              </Link>

              <Link
                href="/admin/bookings"
                className="block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100">
                  <CalendarCheck className="h-5 w-5 text-slate-700" />
                </div>

                <h2 className="mt-5 font-semibold text-slate-950">
                  Booking Management
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Review customer details, update bookings, change
                  statuses, cancel, and delete records.
                </p>

                <p className="mt-5 text-sm font-medium text-slate-900">
                  Manage bookings →
                </p>
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
