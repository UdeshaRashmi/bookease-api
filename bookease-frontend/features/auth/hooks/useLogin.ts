"use client";

import { useMutation } from "@tanstack/react-query";

import { login } from "@/lib/api/auth";
import type { LoginRequest } from "@/types/auth.types";

export function useLogin() {
  return useMutation({
    mutationFn: (loginData: LoginRequest) => login(loginData),
  });
}
