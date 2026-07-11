import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AdminHeader } from '@/components/layout/AdminHeader';
import { AuthGuard } from '@/features/auth/components/AuthGuard';

export const metadata: Metadata = {
  title: {
    default: 'Admin',
    template: '%s | BookEase Admin',
  },
  description: 'BookEase administration area.',
};

type AdminLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/20">
        <AdminHeader />

        {children}
      </div>
    </AuthGuard>
  );
}
