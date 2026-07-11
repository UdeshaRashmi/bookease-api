'use client';

import Link from 'next/link';
import { CalendarCheck2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

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

  function isActiveLink(href: string) {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
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

        <Link
          href="/login"
          className="inline-flex h-10 items-center justify-center rounded-xl border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Admin Login
        </Link>
      </div>
    </header>
  );
}
