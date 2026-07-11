import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { QueryProvider } from '@/providers/QueryProvider';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BookEase',
    template: '%s | BookEase',
  },
  description:
    'Discover available services and make bookings easily with BookEase.',
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1">{children}</main>

            <SiteFooter />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
