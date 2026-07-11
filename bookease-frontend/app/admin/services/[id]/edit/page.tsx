"use client";

import {
  AlertCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import {
  useParams,
  useRouter,
} from "next/navigation";
import { useMemo, useState } from "react";

import { ServiceForm } from "@/features/services/components/service-form";
import {
  useService,
  useUpdateService,
} from "@/features/services/hooks/use-services";
import type { ServiceFormValues } from "@/schemas/service.schema";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const serviceId = params.id;

  const {
    data: service,
    isLoading,
    isError,
  } = useService(serviceId);

  const updateServiceMutation = useUpdateService();

  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = useMemo<ServiceFormValues | undefined>(() => {
    if (!service) {
      return undefined;
    }

    return {
      title: service.title,
      description: service.description,
      duration: service.duration,
      price: service.price,
      isActive: service.isActive,
    };
  }, [service]);

  async function handleUpdateService(values: ServiceFormValues) {
    setErrorMessage("");

    try {
      await updateServiceMutation.mutateAsync({
        id: serviceId,
        serviceData: values,
      });

      router.push("/admin/services");
    } catch {
      setErrorMessage(
        "Unable to update the service. Please check the entered details and try again.",
      );
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading service details...
        </div>
      </div>
    );
  }

  if (isError || !service || !initialValues) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to services
        </Link>

        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 text-center">
          <AlertCircle className="h-8 w-8 text-red-600" />

          <div>
            <p className="font-medium text-red-900">
              Unable to load service
            </p>

            <p className="mt-1 text-sm text-red-700">
              The service may not exist, or the backend server may be
              unavailable.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to services
        </Link>

        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Edit Service
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Update the information, price, duration, or availability of
            this service.
          </p>
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="text-sm font-medium text-red-800">
              Service update failed
            </p>

            <p className="mt-1 text-sm text-red-700">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      <ServiceForm
        initialValues={initialValues}
        submitLabel="Update Service"
        isSubmitting={updateServiceMutation.isPending}
        onSubmit={handleUpdateService}
      />
    </div>
  );
}
