import type { Metadata } from 'next';

import { AdminAuthPanel } from '@/features/auth/components/AdminAuthPanel';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a BookEase account to sign in to the admin area.',
};

export default function SignupPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <AdminAuthPanel initialMode="signup" />
    </section>
  );
}
