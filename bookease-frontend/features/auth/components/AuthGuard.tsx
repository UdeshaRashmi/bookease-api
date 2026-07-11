"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { hasAuthSession } from "@/features/auth/lib/auth-storage";

type AuthGuardProps = Readonly<{
  children: ReactNode;
}>;

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const sessionExists = hasAuthSession();

    if (!sessionExists) {
      router.replace("/login");
      return;
    }

    setIsAuthenticated(true);
    setIsCheckingSession(false);
  }, [router]);

  if (isCheckingSession || !isAuthenticated) {
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
