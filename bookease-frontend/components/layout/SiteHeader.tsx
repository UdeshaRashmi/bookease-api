'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BrandLogo } from '@/components/layout/BrandLogo';
import { getAuthUser } from '@/features/auth/lib/auth-storage';

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
  const user = getAuthUser();
  const userHref = user?.role === 'USER' ? '/account' : '/user';
  const adminHref = user?.role === 'ADMIN' ? '/admin' : '/login';

  function isActiveLink(href: string) {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Go to BookEase home page"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <CalendarCheck2 className="h-5 w-5" />
          </span>

          <span className="text-xl font-bold tracking-tight text-foreground">
            BookEase
          </span>
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
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
            className="inline-flex h-10 items-center justify-center rounded-xl border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:px-4"
          >
            User
          </Link>

          <Link
            href={adminHref}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:px-4"
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
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href={userHref}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            User
          </Link>

          <Link
            href={adminHref}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
