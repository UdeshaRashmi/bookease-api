'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';

import { BrandLogo } from '@/components/layout/BrandLogo';
import { getAuthUser } from '@/features/auth/lib/auth-storage';

function getAuthRoleSnapshot() {
  return getAuthUser()?.role ?? null;
}

const navigationLinks = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Book Now',
    href: '/book',
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const userRole = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('storage', onStoreChange);

      return () => {
        window.removeEventListener('storage', onStoreChange);
      };
    },
    getAuthRoleSnapshot,
    () => null,
  );
  const userHref = userRole === 'USER' ? '/account' : '/user';
  const adminHref = userRole === 'ADMIN' ? '/admin' : '/login';

  function isActiveLink(href: string) {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_1px_0_rgba(15,23,42,0.03)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="min-w-0"
          aria-label="Go to BookEase home page"
        >
          <BrandLogo />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navigationLinks.map((link) => {
            const isActive = isActiveLink(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={userHref}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-950 sm:px-4"
          >
            User
          </Link>

          <Link
            href={adminHref}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-950 px-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 sm:px-4"
          >
            Admin
          </Link>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex w-full items-center gap-1 overflow-x-auto pb-1 md:hidden"
        >
          {navigationLinks.map((link) => {
            const isActive = isActiveLink(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href={userHref}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            User
          </Link>

          <Link
            href={adminHref}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
