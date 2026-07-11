'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLogin } from '@/features/auth/hooks/useLogin';
import { saveAuthSession } from '@/features/auth/lib/auth-storage';
import { loginSchema, type LoginFormValues } from '@/schemas/login.schema';
import type { AuthRole } from '@/types/auth.types';

type ApiErrorResponse = {
  message?: string | string[];
  error?: string;
};

type LoginFormProps = Readonly<{
  requiredRole?: AuthRole;
  redirectPath?: string;
}>;

function getLoginErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.code === 'ECONNABORTED') {
      return 'The login request took too long. Please try again.';
    }

    if (!error.response) {
      return 'Unable to connect to the server. Please make sure the backend is running.';
    }

    const responseData = error.response.data as ApiErrorResponse | undefined;
    const message = responseData?.message;

    if (Array.isArray(message)) {
      return message.join(' ');
    }

    if (typeof message === 'string') {
      return message;
    }

    if (responseData?.error) {
      return responseData.error;
    }
  }

  return 'Login failed. Please check your email and password.';
}

export function LoginForm({
  requiredRole,
  redirectPath = '/admin',
}: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [roleError, setRoleError] = useState('');

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    setRoleError('');

    loginMutation.mutate(values, {
      onSuccess: (response) => {
        if (
          requiredRole &&
          response.data.user.role !== requiredRole
        ) {
          setRoleError(
            requiredRole === 'ADMIN'
              ? 'This account is not an admin account.'
              : 'Please use a customer account to sign in here.',
          );
          return;
        }

        saveAuthSession(response.data.access_token, response.data.user);

        router.replace(redirectPath);
        router.refresh();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email address
          <span className="text-destructive" aria-hidden="true"> *</span>
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="rashmi@gmail.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          {...register('email')}
        />

        {errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
          <span className="text-destructive" aria-hidden="true"> *</span>
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="h-11 w-full rounded-md border bg-background px-3 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register('password')}
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="size-5" aria-hidden="true" />
            ) : (
              <Eye className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {errors.password && (
          <p id="password-error" className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {(loginMutation.isError || roleError) && (
        <div
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {roleError || getLoginErrorMessage(loginMutation.error)}
        </div>
      )}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loginMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Signing in...
          </>
        ) : (
          <>
            <LogIn className="size-4" aria-hidden="true" />
            Sign In
          </>
        )}
      </button>
    </form>
  );
}
