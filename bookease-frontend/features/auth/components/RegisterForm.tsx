'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Eye, EyeOff, Loader2, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLogin } from '@/features/auth/hooks/useLogin';
import { useRegister } from '@/features/auth/hooks/useRegister';
import { saveAuthSession } from '@/features/auth/lib/auth-storage';
import {
  registerSchema,
  type RegisterFormValues,
} from '@/schemas/register.schema';
import type { AuthRole } from '@/types/auth.types';
import { capitalizeWords } from '@/lib/validation';

type ApiErrorResponse = {
  message?: string | string[];
  error?: string;
};

type RegisterFormProps = Readonly<{
  accountType?: 'admin' | 'user';
  requiredRole?: AuthRole;
  redirectPath?: string;
}>;

function getAuthErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
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

  return 'Sign up failed. Please check your details and try again.';
}

export function RegisterForm({
  accountType = 'user',
  requiredRole = accountType === 'admin' ? 'ADMIN' : 'USER',
  redirectPath = accountType === 'admin' ? '/admin' : '/account',
}: RegisterFormProps) {
  const router = useRouter();
  const registerMutation = useRegister(accountType);
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const isSubmitting = registerMutation.isPending || loginMutation.isPending;
  const authError = registerMutation.error ?? loginMutation.error;

  const onSubmit = async (values: RegisterFormValues) => {
    const accountDetails = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    registerMutation.reset();
    loginMutation.reset();
    setFormError('');

    try {
      await registerMutation.mutateAsync(accountDetails);

      const loginResponse = await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });

      if (loginResponse.data.user.role !== requiredRole) {
        setFormError(
          'Created account role did not match the requested sign up flow.',
        );
        return;
      }

      saveAuthSession(
        loginResponse.data.access_token,
        loginResponse.data.user,
      );

      router.replace(redirectPath);
      router.refresh();
    } catch {
      // React Query stores the error; the form renders it below.
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Full name
          <span className="text-destructive" aria-hidden="true"> *</span>
        </label>

        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Rashmi Paranamana"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          {...register('name', {
            onChange: (event) => {
              setValue('name', capitalizeWords(event.target.value), {
                shouldDirty: true,
                shouldValidate: true,
              });
            },
            onBlur: (event) => {
              setValue('name', capitalizeWords(event.target.value), {
                shouldValidate: true,
              });
            },
          })}
        />

        {errors.name && (
          <p id="name-error" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

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
            autoComplete="new-password"
            placeholder="Create a password"
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

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm password
          <span className="text-destructive" aria-hidden="true"> *</span>
        </label>

        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Confirm your password"
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={
              errors.confirmPassword ? 'confirm-password-error' : undefined
            }
            className="h-11 w-full rounded-md border bg-background px-3 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...register('confirmPassword')}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((current) => !current)}
            className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label={
              showConfirmPassword ? 'Hide password' : 'Show password'
            }
          >
            {showConfirmPassword ? (
              <EyeOff className="size-5" aria-hidden="true" />
            ) : (
              <Eye className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p
            id="confirm-password-error"
            className="text-sm text-destructive"
          >
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {(authError || formError) && (
        <div
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {formError || getAuthErrorMessage(authError)}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Creating account...
          </>
        ) : (
          <>
            <UserPlus className="size-4" aria-hidden="true" />
            Create Account
          </>
        )}
      </button>
    </form>
  );
}
