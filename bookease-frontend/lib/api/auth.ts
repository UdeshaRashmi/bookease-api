import type {
  LoginApiResponse,
  LoginRequest,
} from '@/types/auth.types';

import { apiClient } from './axios';

export async function login(
  loginData: LoginRequest,
): Promise<LoginApiResponse> {
  const response = await apiClient.post<LoginApiResponse>(
    '/auth/login',
    loginData,
  );

  return response.data;
}
