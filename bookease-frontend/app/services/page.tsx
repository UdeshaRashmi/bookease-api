'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

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
    <main className="min-h-screen bg-white">
      {/* ── Page Header ── */}
      <section className="border-b bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">
            Our Services
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Find the right service for you.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Browse available BookEase services, compare prices and durations,
            and select the one that matches your needs.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Loading skeletons */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl border border-slate-100 bg-slate-50"
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 px-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-red-100 text-red-500">
              <AlertCircle className="size-5" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-950">
              Unable to load services
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              {error instanceof Error
                ? error.message
                : 'Something went wrong while loading the services.'}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw className={`size-4 ${isFetching ? 'animate-spin' : ''}`} />
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && services?.length === 0 && (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 px-6 text-center">
            <div className="mb-1 h-px w-8 bg-teal-500" />
            <h2 className="mt-4 text-lg font-semibold text-slate-950">
              No services available
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Services have not been added yet. Please check again later.
            </p>
          </div>
        )}

        {/* Services grid */}
        {!isLoading && !isError && services && services.length > 0 && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-950">
                  {services.length}
                </span>{' '}
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
