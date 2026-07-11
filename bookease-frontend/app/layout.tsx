import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { SiteHeader } from '@/components/layout/site-header';
import { QueryProvider } from '@/providers/query-provider';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'BookEase',
    template: '%s | BookEase',
  },
  description: 'A modern booking management system',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <SiteHeader />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
