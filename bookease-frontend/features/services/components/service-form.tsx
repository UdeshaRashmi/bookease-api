"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  defaultServiceFormValues,
  serviceSchema,
  type ServiceFormValues,
} from "@/schemas/service.schema";
import { capitalizeWords } from "@/lib/validation";

type ServiceFormProps = {
  initialValues?: ServiceFormValues;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: (values: ServiceFormValues) => void | Promise<void>;
};

export function ServiceForm({
  initialValues = defaultServiceFormValues,
  submitLabel,
  isSubmitting = false,
  onSubmit,
}: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleFormSubmit = handleSubmit(async (values) => {
    const validationResult = serviceSchema.safeParse(values);

    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (
          fieldName === "title" ||
          fieldName === "description" ||
          fieldName === "duration" ||
          fieldName === "price" ||
          fieldName === "isActive"
        ) {
          setError(fieldName, {
            type: "manual",
            message: issue.message,
          });
        }
      });

      return;
    }

    await onSubmit(validationResult.data);
  });

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
      noValidate
    >
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-slate-800"
        >
          Service title
          <span className="text-red-600" aria-hidden="true"> *</span>
        </label>

        <input
          id="title"
          type="text"
          placeholder="Example: Hair Consultation"
          disabled={isSubmitting}
          {...register("title", {
            onChange: (event) => {
              setValue("title", capitalizeWords(event.target.value), {
                shouldDirty: true,
                shouldValidate: true,
              });
            },
            onBlur: (event) => {
              setValue("title", capitalizeWords(event.target.value), {
                shouldValidate: true,
              });
            },
          })}
          className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
        />

        {errors.title?.message && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-800"
        >
          Description
          <span className="text-red-600" aria-hidden="true"> *</span>
        </label>

        <textarea
          id="description"
          rows={5}
          placeholder="Describe what customers receive from this service."
          disabled={isSubmitting}
          {...register("description")}
          className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
        />

        {errors.description?.message && (
          <p className="text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-slate-800"
          >
            Duration in minutes
            <span className="text-red-600" aria-hidden="true"> *</span>
          </label>

          <input
            id="duration"
            type="number"
            min="1"
            step="1"
            disabled={isSubmitting}
            {...register("duration", {
              setValueAs: (value) =>
                value === "" ? Number.NaN : Number(value),
            })}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          {errors.duration?.message && (
            <p className="text-sm text-red-600">
              {errors.duration.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-slate-800"
          >
            Price in LKR
            <span className="text-red-600" aria-hidden="true"> *</span>
          </label>

          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            disabled={isSubmitting}
            {...register("price", {
              setValueAs: (value) =>
                value === "" ? Number.NaN : Number(value),
            })}
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100"
          />

          {errors.price?.message && (
            <p className="text-sm text-red-600">
              {errors.price.message}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <label
          htmlFor="isActive"
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            id="isActive"
            type="checkbox"
            disabled={isSubmitting}
            {...register("isActive")}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-slate-900 disabled:cursor-not-allowed"
          />

          <span>
            <span className="block text-sm font-medium text-slate-900">
              Active service
            </span>

            <span className="mt-1 block text-sm text-slate-600">
              Active services can be viewed and selected by customers.
            </span>
          </span>
        </label>

        {errors.isActive?.message && (
          <p className="mt-2 text-sm text-red-600">
            {errors.isActive.message}
          </p>
        )}
      </div>

      <div className="grid border-t border-slate-200 pt-6 sm:flex sm:justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 min-w-36 items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}

          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
