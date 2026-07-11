'use client';

import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  CalendarCheck,
  Clock,
  RefreshCw,
  WalletCards,
} from 'lucide-react';

import { useService } from '@/features/services/hooks/use-services';

interface ServiceDetailsProps {
  serviceId: string;
}

export function ServiceDetails({ serviceId }: ServiceDetailsProps) {
  const {
    data: service,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useService(serviceId);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="h-6 w-36 animate-pulse rounded-md bg-muted" />

          <div className="mt-8 animate-pulse rounded-xl border bg-card p-5 sm:p-10">
            <div className="h-6 w-28 rounded-full bg-muted" />
            <div className="mt-6 h-12 max-w-xl rounded-lg bg-muted" />
            <div className="mt-5 h-24 rounded-lg bg-muted" />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="h-28 rounded-2xl bg-muted" />
              <div className="h-28 rounded-2xl bg-muted" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (isError || !service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <section className="w-full max-w-xl rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-6 w-6" />
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-foreground">
            Unable to load service
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {error instanceof Error
              ? error.message
              : 'The requested service could not be found.'}
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to services
            </Link>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`}
              />
              Try again
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to services
        </Link>

        <article className="mt-8 overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="border-b bg-muted/30 p-5 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Service details
              </p>

              <span
                className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                  service.isActive
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {service.isActive ? 'Available' : 'Currently unavailable'}
              </span>
            </div>

            <h1 className="mt-6 break-words text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {service.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              {service.description}
            </p>
          </div>

          <div className="p-5 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border bg-background p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <WalletCards className="h-5 w-5" />
                </div>

                <p className="mt-5 text-sm text-muted-foreground">
                  Service price
                </p>

                <p className="mt-1 text-2xl font-semibold text-foreground">
                  LKR {service.price.toLocaleString('en-LK')}
                </p>
              </div>

              <div className="rounded-2xl border bg-background p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>

                <p className="mt-5 text-sm text-muted-foreground">
                  Estimated duration
                </p>

                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {service.duration} minutes
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border bg-muted/30 p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CalendarCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-foreground">
                      Ready to make a booking?
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Continue to the booking form with this service already
                      selected.
                    </p>
                  </div>
                </div>

                {service.isActive ? (
                  <Link
                    href={`/book?serviceId=${service.id}`}
                    className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
                  >
                    Book this service
                  </Link>
                ) : (
                  <span className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-xl bg-muted px-6 text-sm font-medium text-muted-foreground sm:w-auto">
                    Service unavailable
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
