'use client';

import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CalendarCheck, LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { useCreateBooking } from '@/features/bookings/hooks/use-create-booking';
import { useServices } from '@/features/services/hooks/use-services';
import {
  bookingSchema,
  type BookingFormValues,
} from '@/schemas/booking-schema';
import type { ApiErrorResponse } from '@/types/api';

interface BookingFormProps {
  defaultServiceId?: string;
}

function getTodayDateString() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    return message ?? 'Unable to create the booking.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong while creating the booking.';
}

export function BookingForm({ defaultServiceId = '' }: BookingFormProps) {
  const {
    data: services = [],
    isLoading: isServicesLoading,
    isError: isServicesError,
  } = useServices();

  const createBookingMutation = useCreateBooking();

  const activeServices = services.filter((service) => service.isActive);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      serviceId: defaultServiceId,
      bookingDate: '',
      bookingTime: '',
      notes: '',
    },
    mode: 'onBlur',
  });

  async function onSubmit(values: BookingFormValues) {
    createBookingMutation.reset();

    try {
      await createBookingMutation.mutateAsync(values);

      reset({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        serviceId: values.serviceId,
        bookingDate: '',
        bookingTime: '',
        notes: '',
      });
    } catch {
      // The mutation stores the error, and the UI displays it below.
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border bg-card p-5 shadow-sm sm:p-8"
      noValidate
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Booking details
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-card-foreground">
          Reserve your appointment
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enter your contact information and choose a suitable service, date,
          and time.
        </p>
      </div>

      {createBookingMutation.isSuccess && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <p className="font-medium">Booking created successfully</p>
            <p className="mt-1 text-sm">
              Your booking was submitted with the PENDING status.
            </p>
          </div>
        </div>
      )}

      {createBookingMutation.isError && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <p className="font-medium">Unable to create booking</p>
            <p className="mt-1 text-sm">
              {getApiErrorMessage(createBookingMutation.error)}
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="customerName"
            className="text-sm font-medium text-foreground"
          >
            Full name
            <span className="text-destructive" aria-hidden="true"> *</span>
          </label>

          <input
            id="customerName"
            type="text"
            placeholder="Nimal Perera"
            aria-invalid={Boolean(errors.customerName)}
            {...register('customerName')}
            className="mt-2 h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          {errors.customerName && (
            <p className="mt-2 text-sm text-destructive">
              {errors.customerName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="customerEmail"
            className="text-sm font-medium text-foreground"
          >
            Email address
            <span className="text-destructive" aria-hidden="true"> *</span>
          </label>

          <input
            id="customerEmail"
            type="email"
            placeholder="nimal@gmail.com"
            aria-invalid={Boolean(errors.customerEmail)}
            {...register('customerEmail')}
            className="mt-2 h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          {errors.customerEmail && (
            <p className="mt-2 text-sm text-destructive">
              {errors.customerEmail.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="customerPhone"
            className="text-sm font-medium text-foreground"
          >
            Phone number
            <span className="text-destructive" aria-hidden="true"> *</span>
          </label>

          <input
            id="customerPhone"
            type="tel"
            placeholder="0771234567"
            aria-invalid={Boolean(errors.customerPhone)}
            {...register('customerPhone')}
            className="mt-2 h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          {errors.customerPhone && (
            <p className="mt-2 text-sm text-destructive">
              {errors.customerPhone.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="serviceId"
            className="text-sm font-medium text-foreground"
          >
            Service
            <span className="text-destructive" aria-hidden="true"> *</span>
          </label>

          <select
            id="serviceId"
            disabled={isServicesLoading || isServicesError}
            aria-invalid={Boolean(errors.serviceId)}
            {...register('serviceId')}
            className="mt-2 h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">
              {isServicesLoading ? 'Loading services...' : 'Select a service'}
            </option>

            {activeServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title} - LKR {service.price.toLocaleString('en-LK')}
              </option>
            ))}
          </select>

          {isServicesError && (
            <p className="mt-2 text-sm text-destructive">
              Services could not be loaded. Check whether the backend is
              running.
            </p>
          )}

          {errors.serviceId && (
            <p className="mt-2 text-sm text-destructive">
              {errors.serviceId.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="bookingDate"
            className="text-sm font-medium text-foreground"
          >
            Booking date
            <span className="text-destructive" aria-hidden="true"> *</span>
          </label>

          <input
            id="bookingDate"
            type="date"
            min={getTodayDateString()}
            aria-invalid={Boolean(errors.bookingDate)}
            {...register('bookingDate')}
            className="mt-2 h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          {errors.bookingDate && (
            <p className="mt-2 text-sm text-destructive">
              {errors.bookingDate.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="bookingTime"
            className="text-sm font-medium text-foreground"
          >
            Booking time
            <span className="text-destructive" aria-hidden="true"> *</span>
          </label>

          <input
            id="bookingTime"
            type="time"
            aria-invalid={Boolean(errors.bookingTime)}
            {...register('bookingTime')}
            className="mt-2 h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          {errors.bookingTime && (
            <p className="mt-2 text-sm text-destructive">
              {errors.bookingTime.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="notes"
            className="text-sm font-medium text-foreground"
          >
            Additional notes{' '}
            <span className="text-muted-foreground">(optional)</span>
          </label>

          <textarea
            id="notes"
            rows={4}
            placeholder="Add any special requirements or additional information"
            {...register('notes')}
            className="mt-2 w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={
          createBookingMutation.isPending ||
          isServicesLoading ||
          isServicesError ||
          activeServices.length === 0
        }
        className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {createBookingMutation.isPending && (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        )}

        {createBookingMutation.isPending
          ? 'Creating booking...'
          : 'Confirm booking'}
      </button>
    </form>
  );
}
