"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getServiceById,
  getServices,
} from "@/lib/api/services";

export const serviceQueryKeys = {
  all: ["services"] as const,
  detail: (id: string) => ["services", id] as const,
};

export function useServices() {
  return useQuery({
    queryKey: serviceQueryKeys.all,
    queryFn: getServices,
  });
}

export function useService(id: string) {
  return useQuery({
    queryKey: serviceQueryKeys.detail(id),
    queryFn: () => getServiceById(id),
    enabled: Boolean(id),
  });
}