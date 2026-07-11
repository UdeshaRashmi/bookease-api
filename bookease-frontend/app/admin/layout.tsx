import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AdminFooter } from '@/components/layout/AdminFooter';
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
    <AuthGuard allowedRoles={["ADMIN"]}>
      <div className="flex min-h-screen flex-col bg-muted/20">
        <AdminHeader />

        <div className="flex-1">{children}</div>

        <AdminFooter />
      </div>
    </AuthGuard>
  );
}
