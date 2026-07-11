import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, UserPlus } from 'lucide-react';

import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a BookEase account to sign in to the admin area.',
};

export default function SignupPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-sm lg:grid-cols-2">
        <div className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary-foreground/10">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </div>

            <h1 className="mt-8 text-3xl font-bold tracking-tight">
              BookEase Accounts
            </h1>

            <p className="mt-4 max-w-md leading-7 text-primary-foreground/80">
              Create an account to sign in and manage protected BookEase
              administration features.
            </p>
          </div>

          <div className="mt-12 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-5">
            <p className="text-sm leading-6 text-primary-foreground/80">
              Customers can still create bookings without signing in.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mx-auto w-full max-w-md">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 lg:hidden">
              <UserPlus className="size-6 text-primary" aria-hidden="true" />
            </div>

            <div className="mt-6 lg:mt-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Sign Up
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Use this account to sign in. Booking creation remains available
                without authentication.
              </p>
            </div>

            <div className="mt-8">
              <RegisterForm />
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
