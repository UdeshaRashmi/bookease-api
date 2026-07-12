"use client";

import {
  AlertCircle,
  Loader2,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  useDeleteService,
  useServices,
} from "@/features/services/hooks/use-services";

export default function AdminServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(
    null,
  );
  const [deleteError, setDeleteError] = useState("");

  const {
    data: services = [],
    isLoading,
    isError,
  } = useServices();

  const deleteServiceMutation = useDeleteService();

  const filteredServices = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return services;
    }

    return services.filter((service) => {
      return (
        service.title.toLowerCase().includes(normalizedSearchTerm) ||
        service.description.toLowerCase().includes(normalizedSearchTerm) ||
        service.doctorName?.toLowerCase().includes(normalizedSearchTerm)
      );
    });
  }, [searchTerm, services]);

  async function handleDeleteService(
    serviceId: string,
    serviceTitle: string,
  ) {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete "${serviceTitle}"? This action cannot be undone.`,
    );

    if (!shouldDelete) {
      return;
    }

    setDeleteError("");
    setDeletingServiceId(serviceId);

    try {
      await deleteServiceMutation.mutateAsync(serviceId);
    } catch {
      setDeleteError(
        "Unable to delete the service. Please try again.",
      );
    } finally {
      setDeletingServiceId(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Service Management
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            View and manage the services available for booking.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-cyan-700 px-4 text-sm font-medium text-white transition hover:bg-cyan-600 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </Link>
      </div>

      {deleteError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="text-sm font-medium text-red-800">
              Service deletion failed
            </p>

            <p className="mt-1 text-sm text-red-700">
              {deleteError}
            </p>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-cyan-100 bg-white shadow-sm">
        <div className="border-b border-cyan-100 p-4">
          <div className="relative max-w-md">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search services..."
              className="h-10 w-full rounded-lg border border-slate-300 bg-white pr-4 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading services...
            </div>
          </div>
        )}

        {isError && (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-500" />

            <div>
              <p className="font-medium text-slate-900">
                Unable to load services
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Please check whether the backend server is running.
              </p>
            </div>
          </div>
        )}

        {!isLoading && !isError && filteredServices.length === 0 && (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <p className="font-medium text-slate-900">
              {searchTerm
                ? "No matching services found"
                : "No services available"}
            </p>

            <p className="mt-1 text-sm text-slate-600">
              {searchTerm
                ? "Try using a different search term."
                : "Create your first service to get started."}
            </p>
          </div>
        )}

        {!isLoading && !isError && filteredServices.length > 0 && (
          <div className="overflow-x-auto">
            <table className="hidden w-full min-w-[50rem] text-left md:table">
              <thead className="bg-cyan-50/70 text-xs font-semibold tracking-wide text-cyan-800 uppercase">
                <tr>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Doctor</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredServices.map((service) => {
                  const isDeleting =
                    deletingServiceId === service.id;

                  return (
                    <tr
                      key={service.id}
                      className="transition hover:bg-cyan-50/40"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">
                            {service.title}
                          </p>

                          <p className="mt-1 max-w-md truncate text-sm text-slate-500">
                            {service.description}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {service.doctorName ?? "Doctor A"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {service.duration} minutes
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        LKR {service.price.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            service.isActive
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-4">
                          <Link
                            href={`/admin/services/${service.id}/edit`}
                            className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200 transition hover:bg-emerald-100 hover:text-emerald-900"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={() =>
                              handleDeleteService(
                                service.id,
                                service.title,
                              )
                            }
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 transition hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isDeleting ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}

                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="divide-y divide-slate-200 md:hidden">
              {filteredServices.map((service) => {
                const isDeleting = deletingServiceId === service.id;

                return (
                  <article key={service.id} className="space-y-4 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="break-words font-medium text-slate-900">
                          {service.title}
                        </h2>

                        <p className="mt-1 line-clamp-3 text-sm leading-6 text-slate-500">
                          {service.description}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                          service.isActive
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <dl className="grid gap-3 text-sm min-[420px]:grid-cols-2">
                      <div>
                        <dt className="text-slate-500">Doctor</dt>
                        <dd className="mt-1 font-medium text-slate-900">
                          {service.doctorName ?? "Doctor A"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-slate-500">Duration</dt>
                        <dd className="mt-1 font-medium text-slate-900">
                          {service.duration} minutes
                        </dd>
                      </div>

                      <div>
                        <dt className="text-slate-500">Price</dt>
                        <dd className="mt-1 font-medium text-slate-900">
                          LKR {service.price.toLocaleString()}
                        </dd>
                      </div>
                    </dl>

                    <div className="grid gap-2 min-[420px]:grid-cols-2">
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-sm font-medium text-emerald-800 transition hover:bg-emerald-100 hover:text-emerald-900"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() =>
                          handleDeleteService(
                            service.id,
                            service.title,
                          )
                        }
                        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 text-sm font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}

                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
