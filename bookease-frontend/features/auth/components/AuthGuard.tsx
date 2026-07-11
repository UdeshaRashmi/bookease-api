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

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const isAuthenticated = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);

      return () => {
        window.removeEventListener("storage", onStoreChange);
      };
    },
    hasAuthSession,
    () => false,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
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
