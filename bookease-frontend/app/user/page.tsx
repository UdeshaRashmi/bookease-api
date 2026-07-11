import type { Metadata } from 'next';

import { UserAuthPanel } from '@/features/auth/components/UserAuthPanel';

export const metadata: Metadata = {
  title: 'Customer Account',
  description: 'Sign in or create a BookEase customer account.',
};

export default function UserAuthPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <UserAuthPanel />
    </section>
  );
}
