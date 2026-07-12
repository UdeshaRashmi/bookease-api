import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AuthGuard } from '@/features/auth/components/AuthGuard';

export const metadata: Metadata = {
  title: {
    default: 'My Account',
    template: '%s | BookEase Account',
  },
  description: 'BookEase customer account area.',
};

type AccountLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <AuthGuard allowedRoles={['USER']} redirectTo="/user">
      <div className="min-h-screen bg-emerald-50/40">{children}</div>
    </AuthGuard>
  );
}
