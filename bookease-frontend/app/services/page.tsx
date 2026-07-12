'use client';

import { AlertCircle, RefreshCw, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { ServiceCard } from '@/features/services/components/service-card';
import { useServices } from '@/features/services/hooks/use-services';

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    data: services,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useServices();

  const filteredServices = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!services || !normalizedSearch) {
      return services ?? [];
    }

    return services.filter((service) => {
      return (
        service.title.toLowerCase().includes(normalizedSearch) ||
        service.description.toLowerCase().includes(normalizedSearch) ||
        service.doctorName?.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [searchTerm, services]);

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
        {!isLoading && !isError && services && services.length > 0 && (
          <div className="mb-8 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <label htmlFor="serviceSearch" className="sr-only">
              Search services
            </label>
            <div className="relative">
              <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
              <input
                id="serviceSearch"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by service, doctor, or care details"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>
          </div>
        )}

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
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-950">
                  {filteredServices.length}
                </span>{' '}
                {filteredServices.length === 1 ? 'service' : 'services'} shown
              </p>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="w-fit text-sm font-semibold text-teal-700 underline-offset-2 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>

            {filteredServices.length === 0 ? (
              <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 px-6 text-center">
                <Search className="size-9 text-slate-400" />
                <h2 className="mt-4 text-lg font-semibold text-slate-950">
                  No matching services found
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Try searching by another service name, doctor, or care detail.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
