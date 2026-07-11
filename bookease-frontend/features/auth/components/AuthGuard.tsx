"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  type ReactNode,
  useEffect,
  useSyncExternalStore,
} from "react";

import {
  clearAuthSession,
  getAuthUser,
  hasAuthSession,
} from "@/features/auth/lib/auth-storage";
import type { AuthRole } from "@/types/auth.types";

type AuthGuardProps = Readonly<{
  children: ReactNode;
  allowedRoles?: AuthRole[];
  redirectTo?: string;
}>;

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

function getAuthStatus(): AuthStatus {
  if (typeof window === "undefined") {
    return "checking";
  }

  return hasAuthSession() ? "authenticated" : "unauthenticated";
}

export function AuthGuard({
  children,
  allowedRoles,
  redirectTo = "/login",
}: AuthGuardProps) {
  const router = useRouter();
  const authStatus = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);

      return () => {
        window.removeEventListener("storage", onStoreChange);
      };
    },
    getAuthStatus,
    () => "checking",
  );

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.replace(redirectTo);
    }
  }, [authStatus, redirectTo, router]);

  const user = getAuthUser();
  const isAllowed =
    authStatus === "authenticated" &&
    (!allowedRoles?.length ||
      (user?.role ? allowedRoles.includes(user.role) : false));

  useEffect(() => {
    if (authStatus !== "authenticated" || isAllowed) {
      return;
    }

    if (!user?.role) {
      clearAuthSession();
      router.replace(redirectTo);
      return;
    }

    router.replace(user.role === "ADMIN" ? "/admin" : "/account");
  }, [authStatus, isAllowed, redirectTo, router, user?.role]);

  if (authStatus !== "authenticated") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2
            className="size-5 animate-spin"
            aria-hidden="true"
          />
          Checking your session...
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2
            className="size-5 animate-spin"
            aria-hidden="true"
          />
          Redirecting to your dashboard...
        </div>
      </div>
    );
  }

  return children;
}
