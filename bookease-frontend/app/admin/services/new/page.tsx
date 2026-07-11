"use client";

import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ServiceForm } from "@/features/services/components/service-form";
import { useCreateService } from "@/features/services/hooks/use-services";
import type { ServiceFormValues } from "@/schemas/service.schema";

export default function NewServicePage() {
  const router = useRouter();
  const createServiceMutation = useCreateService();

  const [errorMessage, setErrorMessage] = useState("");

  async function handleCreateService(values: ServiceFormValues) {
    setErrorMessage("");

    try {
      await createServiceMutation.mutateAsync(values);
      router.push("/admin/services");
    } catch {
      setErrorMessage(
        "Unable to create the service. Please check the entered details and try again.",
      );
    }
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
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
            Add New Service
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Enter the service information customers need before making a
            booking.
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
              Service creation failed
            </p>

            <p className="mt-1 text-sm text-red-700">{errorMessage}</p>
          </div>
        </div>
      )}

      <ServiceForm
        submitLabel="Create Service"
        isSubmitting={createServiceMutation.isPending}
        onSubmit={handleCreateService}
      />
    </main>
  );
}
