import type {
  LoginApiResponse,
  LoginRequest,
  RegisterApiResponse,
  RegisterRequest,
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

export async function register(
  registerData: RegisterRequest,
): Promise<RegisterApiResponse> {
  const response = await apiClient.post<RegisterApiResponse>(
    '/auth/register',
    registerData,
  );

  return response.data;
}

export async function registerAdmin(
  registerData: RegisterRequest,
): Promise<RegisterApiResponse> {
  const response = await apiClient.post<RegisterApiResponse>(
    '/auth/register-admin',
    registerData,
  );

  return response.data;
}
