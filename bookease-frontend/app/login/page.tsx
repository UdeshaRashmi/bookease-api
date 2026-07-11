import type { Metadata } from "next";
import { LockKeyhole, ShieldCheck } from "lucide-react";

import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to the BookEase administration area.",
};

export default function LoginPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-sm lg:grid-cols-2">
        <div className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary-foreground/10">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </div>

            <h1 className="mt-8 text-3xl font-bold tracking-tight">
              BookEase Administration
            </h1>

            <p className="mt-4 max-w-md leading-7 text-primary-foreground/80">
              Sign in securely to manage services, bookings, and administrative
              operations.
            </p>
          </div>

          <div className="mt-12 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-5">
            <p className="text-sm leading-6 text-primary-foreground/80">
              This area is protected. Only authorized BookEase administrators
              should sign in.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mx-auto w-full max-w-md">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 lg:hidden">
              <LockKeyhole
                className="size-6 text-primary"
                aria-hidden="true"
              />
            </div>

            <div className="mt-6 lg:mt-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Admin Portal
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Enter your administrator email address and password to continue.
              </p>
            </div>

            <div className="mt-8">
              <LoginForm />
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
              Your login details are used only to authenticate your BookEase
              administrator account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
