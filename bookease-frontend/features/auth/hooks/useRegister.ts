"use client";

import { useMutation } from "@tanstack/react-query";

import { register } from "@/lib/api/auth";
import type { RegisterRequest } from "@/types/auth.types";

export function useRegister() {
  return useMutation({
    mutationFn: (registerData: RegisterRequest) => register(registerData),
  });
}
