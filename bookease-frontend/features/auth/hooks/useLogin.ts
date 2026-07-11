"use client";

import { useMutation } from "@tanstack/react-query";

import type { LoginRequest } from "@/features/auth/types/auth.types";
import { login } from "@/lib/api/auth";

export function useLogin() {
  return useMutation({
    mutationFn: (loginData: LoginRequest) => login(loginData),
  });
}