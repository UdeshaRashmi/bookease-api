"use client";

import {
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Pencil,
  Search,
} from "lucide-react";
import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";

import { BookingActionControls } from "@/features/bookings/components/booking-action-controls";
import { BookingStatusControl } from "@/features/bookings/components/booking-status-control";
import { useBookings } from "@/features/bookings/hooks/use-bookings";
import { useServices } from "@/features/services/hooks/use-services";
import type {
  BookingQueryParams,
  BookingStatus,
} from "@/types/booking";

const bookingStatuses: BookingStatus[] = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
];

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

export default function AdminBookingsPage() {
  const [page, setPage] = useState(1);

  const [searchInput, setSearchInput] = useState("");
  const [statusInput, setStatusInput] =
    useState<BookingStatus | "">("");
  const [dateInput, setDateInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedStatus, setAppliedStatus] =
    useState<BookingStatus | "">("");
  const [appliedDate, setAppliedDate] = useState("");
  const [appliedServiceId, setAppliedServiceId] = useState("");

  const queryParams = useMemo<BookingQueryParams>(
    () => ({
      page,
      limit: 10,
      sort: "desc",
      ...(appliedSearch ? { search: appliedSearch } : {}),
      ...(appliedStatus ? { status: appliedStatus } : {}),
      ...(appliedDate ? { date: appliedDate } : {}),
      ...(appliedServiceId
        ? { serviceId: appliedServiceId }
        : {}),
    }),
    [
      appliedDate,
      appliedSearch,
      appliedServiceId,
      appliedStatus,
      page,
    ],
  );

  const {
    data: bookingResult,
    isLoading,
    isError,
    isFetching,
  } = useBookings(queryParams);

  const {
    data: services = [],
    isLoading: isServicesLoading,
  } = useServices();

  const bookings = bookingResult?.data ?? [];
  const meta = bookingResult?.meta;

  function handleFilterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setAppliedSearch(searchInput.trim());
    setAppliedStatus(statusInput);
    setAppliedDate(dateInput);
    setAppliedServiceId(serviceInput);
    setPage(1);
  }

  function handleClearFilters() {
    setSearchInput("");
    setStatusInput("");
    setDateInput("");
    setServiceInput("");

    setAppliedSearch("");
    setAppliedStatus("");
    setAppliedDate("");
    setAppliedServiceId("");
    setPage(1);
  }

  const hasAppliedFilters =
    Boolean(appliedSearch) ||
    Boolean(appliedStatus) ||
    Boolean(appliedDate) ||
    Boolean(appliedServiceId);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Booking Management
        </h1>

        <p className="mt-1 text-sm text-slate-600">
          View and manage customer booking requests.
        </p>
      </div>

      <form
        onSubmit={handleFilterSubmit}
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label
              htmlFor="bookingSearch"
              className="text-sm font-medium text-slate-700"
            >
              Search
            </label>

            <div className="relative mt-2">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                id="bookingSearch"
                type="search"
                value={searchInput}
                onChange={(event) =>
                  setSearchInput(event.target.value)
                }
                placeholder="Name, email, phone or service"
                className="h-10 w-full rounded-lg border border-slate-300 bg-white pr-3 pl-10 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="bookingStatus"
              className="text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="bookingStatus"
              value={statusInput}
              onChange={(event) =>
                setStatusInput(
                  event.target.value as BookingStatus | "",
                )
              }
              className="mt-2 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            >
              <option value="">All statuses</option>

              {bookingStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="bookingDate"
              className="text-sm font-medium text-slate-700"
            >
              Booking date
            </label>

            <input
              id="bookingDate"
              type="date"
              value={dateInput}
              onChange={(event) =>
                setDateInput(event.target.value)
              }
              className="mt-2 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div>
            <label
              htmlFor="bookingService"
              className="text-sm font-medium text-slate-700"
            >
              Service
            </label>

            <select
              id="bookingService"
              value={serviceInput}
              disabled={isServicesLoading}
              onChange={(event) =>
                setServiceInput(event.target.value)
              }
              className="mt-2 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
            >
              <option value="">
                {isServicesLoading
                  ? "Loading services..."
                  : "All services"}
              </option>

              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap sm:justify-end">
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Clear filters
          </button>

          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            <Search className="h-4 w-4" />
            Apply filters
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div className="min-w-0">
            <p className="font-medium text-slate-900">
              Customer bookings
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {meta
                ? `${meta.total} booking${
                    meta.total === 1 ? "" : "s"
                  } found`
                : "Booking records"}
            </p>
          </div>

          {isFetching && !isLoading && (
            <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
          )}
        </div>

        {isLoading && (
          <div className="flex min-h-72 items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading bookings...
            </div>
          </div>
        )}

        {isError && (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3 px-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-500" />

            <div>
              <p className="font-medium text-slate-900">
                Unable to load bookings
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Check whether you are logged in and the backend server
                is running.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !isError && bookings.length === 0 && (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <CalendarDays className="h-9 w-9 text-slate-400" />

            <p className="mt-3 font-medium text-slate-900">
              No bookings found
            </p>

            <p className="mt-1 text-sm text-slate-600">
              {hasAppliedFilters
                ? "Try clearing or changing the selected filters."
                : "Customer bookings will appear here after they are created."}
            </p>
          </div>
        )}

        {!isLoading && !isError && bookings.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="hidden w-full min-w-[68rem] text-left lg:table">
                <thead className="bg-slate-50 text-xs font-semibold tracking-wide text-slate-600 uppercase">
                  <tr>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Service</th>
                    <th className="px-5 py-4">Date & time</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Created</th>
                    <th className="px-5 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="align-top transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-900">
                          {booking.customerName}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {booking.customerEmail}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {booking.customerPhone}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-900">
                          {booking.service.title}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          LKR{" "}
                          {booking.service.price.toLocaleString(
                            "en-LK",
                          )}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-900">
                          {formatBookingDate(booking.bookingDate)}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {booking.bookingTime}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <BookingStatusControl
                          bookingId={booking.id}
                          currentStatus={booking.status}
                        />
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {formatBookingDate(booking.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-col items-end gap-2">
                          <Link
                            href={`/admin/bookings/${booking.id}/edit`}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950"
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </Link>

                          <BookingActionControls
                            bookingId={booking.id}
                            customerName={booking.customerName}
                            currentStatus={booking.status}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="divide-y divide-slate-200 lg:hidden">
                {bookings.map((booking) => (
                  <article key={booking.id} className="space-y-4 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h2 className="break-words font-medium text-slate-900">
                          {booking.customerName}
                        </h2>

                        <p className="mt-1 break-all text-sm text-slate-500">
                          {booking.customerEmail}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {booking.customerPhone}
                        </p>
                      </div>

                      <BookingStatusControl
                        bookingId={booking.id}
                        currentStatus={booking.status}
                      />
                    </div>

                    <dl className="grid gap-3 text-sm min-[480px]:grid-cols-2">
                      <div>
                        <dt className="text-slate-500">Service</dt>
                        <dd className="mt-1 break-words font-medium text-slate-900">
                          {booking.service.title}
                        </dd>
                        <dd className="mt-1 text-slate-500">
                          LKR{" "}
                          {booking.service.price.toLocaleString(
                            "en-LK",
                          )}
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

                      <div>
                        <dt className="text-slate-500">Created</dt>
                        <dd className="mt-1 font-medium text-slate-900">
                          {formatBookingDate(booking.createdAt)}
                        </dd>
                      </div>
                    </dl>

                    <div className="grid gap-2 min-[420px]:grid-cols-2 sm:grid-cols-[auto_1fr] sm:items-start">
                      <Link
                        href={`/admin/bookings/${booking.id}/edit`}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Link>

                      <div className="sm:justify-self-end">
                        <BookingActionControls
                          bookingId={booking.id}
                          customerName={booking.customerName}
                          currentStatus={booking.status}
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {meta && meta.totalPages > 1 && (
              <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600">
                  Page {meta.page} of {meta.totalPages}
                </p>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                  <button
                    type="button"
                    disabled={page <= 1 || isFetching}
                    onClick={() =>
                      setPage((currentPage) =>
                        Math.max(1, currentPage - 1),
                      )
                    }
                    className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={
                      page >= meta.totalPages || isFetching
                    }
                    onClick={() =>
                      setPage((currentPage) =>
                        Math.min(
                          meta.totalPages,
                          currentPage + 1,
                        ),
                      )
                    }
                    className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
