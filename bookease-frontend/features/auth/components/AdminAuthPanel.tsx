'use client';

import { ShieldCheck, UserPlus } from 'lucide-react';
import { useState } from 'react';

import { LoginForm } from '@/features/auth/components/LoginForm';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

type AuthMode = 'signin' | 'signup';

type AdminAuthPanelProps = Readonly<{
  initialMode?: AuthMode;
}>;

export function AdminAuthPanel({
  initialMode = 'signin',
}: AdminAuthPanelProps) {
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode);
  const isSignIn = authMode === 'signin';

  return (
    <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border bg-card shadow-sm lg:grid-cols-2">
      <div className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary-foreground/10">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </div>

          <h1 className="mt-8 text-3xl font-bold tracking-tight">
            BookEase Admin
          </h1>

          <p className="mt-4 max-w-md leading-7 text-primary-foreground/80">
            Sign in to manage services and bookings, or create a new admin
            account when access is needed.
          </p>
        </div>

        <div className="mt-12 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-5">
          <p className="text-sm leading-6 text-primary-foreground/80">
            Customers can still create bookings without authentication.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        <div className="mx-auto w-full max-w-md">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 lg:hidden">
            {isSignIn ? (
              <ShieldCheck className="size-6 text-primary" aria-hidden="true" />
            ) : (
              <UserPlus className="size-6 text-primary" aria-hidden="true" />
            )}
          </div>

          <div className="mt-6 lg:mt-0">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Admin Portal
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              {isSignIn ? 'Welcome back' : 'Create admin account'}
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {isSignIn
                ? 'Enter your admin email and password to continue.'
                : 'Create credentials for a new BookEase admin account.'}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 rounded-xl border bg-muted/40 p-1">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`h-10 rounded-lg text-sm font-medium transition-colors ${
                isSignIn
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`h-10 rounded-lg text-sm font-medium transition-colors ${
                !isSignIn
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mt-8">
            {isSignIn ? (
              <LoginForm requiredRole="ADMIN" redirectPath="/admin" />
            ) : (
              <RegisterForm
                accountType="admin"
                requiredRole="ADMIN"
                redirectPath="/admin"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
