"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useServices } from "@/features/services/hooks/use-services";
import {
  bookingSchema,
  type BookingFormValues,
} from "@/schemas/booking-schema";
import { capitalizeWords } from "@/lib/validation";

type AdminBookingFormProps = {
  initialValues: BookingFormValues;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: (
    values: BookingFormValues,
  ) => void | Promise<void>;
};

function getTodayDateString() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function AdminBookingForm({
  initialValues,
  submitLabel,
  isSubmitting = false,
  onSubmit,
}: AdminBookingFormProps) {
  const {
    data: services = [],
    isLoading: isServicesLoading,
    isError: isServicesError,
  } = useServices();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: initialValues,
    mode: "onBlur",
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const activeServices = services.filter(
    (service) => service.isActive,
  );

  async function handleBookingSubmit(
    values: BookingFormValues,
  ) {
    await onSubmit(values);
  }

  return (
    <form
      onSubmit={handleSubmit(handleBookingSubmit)}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
      noValidate
    >
      {isServicesError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="text-sm font-medium text-red-800">
              Unable to load services
            </p>

            <p className="mt-1 text-sm text-red-700">
              Check whether the backend server is running.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="customerName"
          className="block text-sm font-medium text-slate-800"
        >
          Customer name
          <span className="text-red-600" aria-hidden="true"> *</span>
        </label>

        <input
          id="customerName"
          type="text"
          placeholder="Rashmi Paranamana"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.customerName)}
          {...register("customerName", {
            onBlur: (event) => {
              setValue(
                "customerName",
                capitalizeWords(event.target.value),
                {
                  shouldValidate: true,
                },
              );
            },
          })}
          className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
        />

        {errors.customerName?.message && (
          <p className="text-sm text-red-600">
            {errors.customerName.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="customerEmail"
            className="block text-sm font-medium text-slate-800"
          >
            Customer email
            <span className="text-red-600" aria-hidden="true"> *</span>
          </label>

          <input
            id="customerEmail"
            type="email"
            placeholder="rashmi@gmail.com"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.customerEmail)}
            {...register("customerEmail")}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          {errors.customerEmail?.message && (
            <p className="text-sm text-red-600">
              {errors.customerEmail.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="customerPhone"
            className="block text-sm font-medium text-slate-800"
          >
            Customer phone
            <span className="text-red-600" aria-hidden="true"> *</span>
          </label>

          <input
            id="customerPhone"
            type="tel"
            placeholder="0771234567"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.customerPhone)}
            {...register("customerPhone")}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          {errors.customerPhone?.message && (
            <p className="text-sm text-red-600">
              {errors.customerPhone.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="serviceId"
          className="block text-sm font-medium text-slate-800"
        >
          Service
          <span className="text-red-600" aria-hidden="true"> *</span>
        </label>

        <select
          id="serviceId"
          disabled={
            isSubmitting ||
            isServicesLoading ||
            isServicesError
          }
          aria-invalid={Boolean(errors.serviceId)}
          {...register("serviceId")}
          className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
        >
          <option value="">
            {isServicesLoading
              ? "Loading services..."
              : "Select a service"}
          </option>

          {activeServices.map((service) => (
            <option key={service.id} value={service.id}>
              {service.title} - LKR{" "}
              {service.price.toLocaleString("en-LK")}
            </option>
          ))}
        </select>

        {errors.serviceId?.message && (
          <p className="text-sm text-red-600">
            {errors.serviceId.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="bookingDate"
            className="block text-sm font-medium text-slate-800"
          >
            Booking date
            <span className="text-red-600" aria-hidden="true"> *</span>
          </label>

          <input
            id="bookingDate"
            type="date"
            min={getTodayDateString()}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.bookingDate)}
            {...register("bookingDate")}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          {errors.bookingDate?.message && (
            <p className="text-sm text-red-600">
              {errors.bookingDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="bookingTime"
            className="block text-sm font-medium text-slate-800"
          >
            Booking time
            <span className="text-red-600" aria-hidden="true"> *</span>
          </label>

          <input
            id="bookingTime"
            type="time"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.bookingTime)}
            {...register("bookingTime")}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          {errors.bookingTime?.message && (
            <p className="text-sm text-red-600">
              {errors.bookingTime.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-slate-800"
        >
          Notes{" "}
          <span className="font-normal text-slate-500">
            (optional)
          </span>
        </label>

        <textarea
          id="notes"
          rows={5}
          placeholder="Additional booking information"
          disabled={isSubmitting}
          {...register("notes")}
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
        />

        {errors.notes?.message && (
          <p className="text-sm text-red-600">
            {errors.notes.message}
          </p>
        )}
      </div>

      <div className="grid border-t border-slate-200 pt-6 sm:flex sm:justify-end">
        <button
          type="submit"
          disabled={
            isSubmitting ||
            isServicesLoading ||
            isServicesError
          }
          className="inline-flex h-10 min-w-40 items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}

          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
