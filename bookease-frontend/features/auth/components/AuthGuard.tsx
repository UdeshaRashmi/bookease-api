"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  type ReactNode,
  useEffect,
  useSyncExternalStore,
} from "react";

import { hasAuthSession } from "@/features/auth/lib/auth-storage";

type AuthGuardProps = Readonly<{
  children: ReactNode;
}>;

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

function getAuthStatus(): AuthStatus {
  if (typeof window === "undefined") {
    return "checking";
  }

  return hasAuthSession() ? "authenticated" : "unauthenticated";
}

export function AuthGuard({ children }: AuthGuardProps) {
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
      router.replace("/login");
    }
  }, [authStatus, router]);

  if (authStatus !== "authenticated") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2
            className="size-5 animate-spin"
            aria-hidden="true"
          />
          Checking administrator session...
        </div>
      </div>
    );
  }

  return children;
}
