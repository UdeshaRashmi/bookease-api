import { apiClient } from '@/lib/api/axios';
import type { ApiResponse } from '@/types/api';
import type { Service } from '@/types/service';

export type CreateServiceData = Pick<
  Service,
  'title' | 'description' | 'doctorName' | 'duration' | 'price' | 'isActive'
>;

export type UpdateServiceData = Partial<CreateServiceData>;

export async function getServices(): Promise<Service[]> {
  const response = await apiClient.get<ApiResponse<Service[]>>('/services');

  return response.data.data;
}

export async function getServiceById(id: string): Promise<Service> {
  const response = await apiClient.get<ApiResponse<Service>>(`/services/${id}`);

  return response.data.data;
}

export async function createService(
  serviceData: CreateServiceData,
): Promise<Service> {
  const response = await apiClient.post<ApiResponse<Service>>(
    '/services',
    serviceData,
  );

  return response.data.data;
}

export async function updateService(
  id: string,
  serviceData: UpdateServiceData,
): Promise<Service> {
  const response = await apiClient.patch<ApiResponse<Service>>(
    `/services/${id}`,
    serviceData,
  );

  return response.data.data;
}

export async function deleteService(id: string): Promise<Service> {
  const response = await apiClient.delete<ApiResponse<Service>>(
    `/services/${id}`,
  );

  return response.data.data;
}
