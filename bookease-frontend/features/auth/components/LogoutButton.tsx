"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { clearAuthSession } from "@/features/auth/lib/auth-storage";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthSession();

    router.replace("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
    >
      <LogOut className="size-4" aria-hidden="true" />
      Logout
    </button>
  );
}
