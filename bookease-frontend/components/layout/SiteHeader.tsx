'use client';

import { LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useSyncExternalStore } from 'react';

import { BrandLogo } from '@/components/layout/BrandLogo';
import {
  clearAuthSession,
  getAuthUser,
} from '@/features/auth/lib/auth-storage';

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
    label: 'About',
    href: '/about',
  },
  {
    label: 'Book Now',
    href: '/book',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  function isActiveLink(href: string) {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(href);
  }

  function handleLogout() {
    clearAuthSession();
    setIsMobileMenuOpen(false);

    router.replace(userRole === 'ADMIN' ? '/login' : '/user');
    router.refresh();
  }

  const accountAction =
    userRole === 'USER'
      ? {
          label: 'My Account',
          href: '/account',
          variant: 'primary' as const,
        }
      : {
          label: 'Customer Login',
          href: '/user',
          variant: 'secondary' as const,
        };

  const linkBase =
    'rounded-lg px-4 py-2 text-sm font-medium transition-colors';
  const actionBase =
    'inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium shadow-sm transition-colors';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_1px_0_rgba(15,23,42,0.03)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="min-w-0"
          onClick={() => setIsMobileMenuOpen(false)}
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
                className={`${linkBase} ${
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

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <Link
            href={accountAction.href}
            className={`${actionBase} ${
              accountAction.variant === 'primary'
                ? 'bg-slate-950 text-white hover:bg-slate-800'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950'
            }`}
          >
            {accountAction.label}
          </Link>

          {userRole && (
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-950"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Logout
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden"
        >
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {navigationLinks.map((link) => {
              const isActive = isActiveLink(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 grid gap-2 border-t border-slate-100 pt-4">
            <Link
              href={accountAction.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${actionBase} w-full ${
                accountAction.variant === 'primary'
                  ? 'bg-slate-950 text-white hover:bg-slate-800'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              {accountAction.label}
            </Link>

            {userRole && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-950"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
