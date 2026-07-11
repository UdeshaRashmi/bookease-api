import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
  type CreateServiceData,
  type UpdateServiceData,
} from '@/lib/api/services';

export const serviceQueryKeys = {
  all: ['services'] as const,
  lists: () => [...serviceQueryKeys.all, 'list'] as const,
  list: () => [...serviceQueryKeys.lists()] as const,
  details: () => [...serviceQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...serviceQueryKeys.details(), id] as const,
};

export function useServices() {
  return useQuery({
    queryKey: serviceQueryKeys.list(),
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

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceData: CreateServiceData) => createService(serviceData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: serviceQueryKeys.lists(),
      });
    },
  });
}

type UpdateServiceVariables = {
  id: string;
  serviceData: UpdateServiceData;
};

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, serviceData }: UpdateServiceVariables) =>
      updateService(id, serviceData),

    onSuccess: (updatedService) => {
      queryClient.invalidateQueries({
        queryKey: serviceQueryKeys.lists(),
      });

      queryClient.setQueryData(
        serviceQueryKeys.detail(updatedService.id),
        updatedService,
      );
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteService(id),

    onSuccess: (_, deletedServiceId) => {
      queryClient.invalidateQueries({
        queryKey: serviceQueryKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: serviceQueryKeys.detail(deletedServiceId),
      });
    },
  });
}
