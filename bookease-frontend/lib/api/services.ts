import { apiClient } from '@/lib/api/axios';
import type { ApiResponse } from '@/types/api';
import type { Service } from '@/types/service';

export async function getServices(): Promise<Service[]> {
  const response = await apiClient.get<ApiResponse<Service[]>>('/services');

  return response.data.data;
}

export async function getServiceById(id: string): Promise<Service> {
  const response = await apiClient.get<ApiResponse<Service>>(`/services/${id}`);

  return response.data.data;
}
