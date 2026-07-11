"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { clearAuthSession } from "@/features/auth/lib/auth-storage";

type LogoutButtonProps = Readonly<{
  redirectTo?: string;
}>;

export function LogoutButton({ redirectTo = "/login" }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthSession();

    router.replace(redirectTo);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-background px-4 text-sm font-medium transition-colors hover:bg-muted sm:w-auto"
    >
      <LogOut className="size-4" aria-hidden="true" />
      Logout
    </button>
  );
}
