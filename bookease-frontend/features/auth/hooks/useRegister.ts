"use client";

import { useMutation } from "@tanstack/react-query";

import { register, registerAdmin } from "@/lib/api/auth";
import type { RegisterRequest } from "@/types/auth.types";

export function useRegister(accountType: "admin" | "user" = "user") {
  return useMutation({
    mutationFn: (registerData: RegisterRequest) =>
      accountType === "admin"
        ? registerAdmin(registerData)
        : register(registerData),
  });
}
