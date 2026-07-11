'use client';

import { AlertCircle, CalendarDays, RefreshCw } from 'lucide-react';

import { ServiceCard } from '@/features/services/components/service-card';
import { useServices } from '@/features/services/hooks/use-services';

export default function ServicesPage() {
  const {
    data: services,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useServices();

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Services
          </p>

          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Find the right service and book your appointment easily.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Browse available BookEase services, compare prices and durations,
            and select the service that matches your needs.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl border bg-muted/50"
              />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/5 px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-foreground">
              Unable to load services
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              {error instanceof Error
                ? error.message
                : 'Something went wrong while loading the services.'}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`}
              />
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && services?.length === 0 && (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarDays className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-foreground">
              No services available
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Services have not been added yet. Please check again later.
            </p>
          </div>
        )}

        {!isLoading && !isError && services && services.length > 0 && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {services.length}{' '}
                {services.length === 1 ? 'service' : 'services'} available
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
