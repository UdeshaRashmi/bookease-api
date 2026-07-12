import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AppShell } from '@/components/layout/AppShell';
import { QueryProvider } from '@/providers/QueryProvider';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BookEase',
    template: '%s | BookEase',
  },
  description:
    'Discover healthcare services and request appointments easily with BookEase.',
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AppShell>{children}</AppShell>
        </QueryProvider>
      </body>
    </html>
  );
}
