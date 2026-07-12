'use client';

import {
  ArrowRight,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { useSyncExternalStore } from 'react';

import { BrandLogo } from '@/components/layout/BrandLogo';
import { getAuthUser } from '@/features/auth/lib/auth-storage';

function getAuthRoleSnapshot() {
  return getAuthUser()?.role ?? null;
}

const footerLinks = [
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
];

const supportItems = [
  {
    icon: Phone,
    label: 'Call us',
    text: '074 276 5035',
    href: 'tel:0742765035',
  },
  {
    icon: Mail,
    label: 'Email support',
    text: 'bookease@gmail.com',
    href: 'mailto:bookease@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    text: 'Malabe, Sri Lanka',
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
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
  const accountHref = userRole === 'USER' ? '/account' : '/user';
  const accountLabel = userRole === 'USER' ? 'My Account' : 'Customer Login';
  const adminHref = userRole === 'ADMIN' ? '/admin' : '/login';
  const adminLabel = userRole === 'ADMIN' ? 'Staff Dashboard' : 'Staff Access';

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.25fr_0.75fr_0.9fr_1.1fr] lg:px-8">
        <div className="space-y-5">
          <Link
            href="/"
            className="inline-flex"
            aria-label="Go to BookEase home page"
          >
            <BrandLogo variant="footer" />
          </Link>

          <p className="max-w-md text-sm leading-6 text-slate-300">
            Discover services, choose a preferred date and time, and send your
            booking request through a clear customer-friendly flow.
          </p>

          <Link
            href="/book"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-teal-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-400"
          >
            Book Now
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-white">Explore</h2>

          <nav aria-label="Footer navigation">
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-white">Customer</h2>

          <div className="space-y-3">
            <Link
              href={accountHref}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition-colors hover:border-teal-400/50 hover:bg-white/10 hover:text-white"
            >
              <UserRound className="size-4 text-teal-400" aria-hidden="true" />
              {accountLabel}
            </Link>

            <Link
              href={adminHref}
              className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-400 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-slate-200"
            >
              <LockKeyhole
                className="size-4 text-slate-500"
                aria-hidden="true"
              />
              {adminLabel}
            </Link>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-white">Support</h2>

          <div className="space-y-4">
            {supportItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-teal-400 ring-1 ring-white/10">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-slate-200">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block break-all text-sm text-slate-400">
                      {item.text}
                    </span>
                  </span>
                </>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex gap-3 rounded-xl transition-colors hover:text-white"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className="flex gap-3">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-center text-sm text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <p>Copyright {currentYear} BookEase. All rights reserved.</p>
          <p>Simple and reliable booking management.</p>
        </div>
      </div>
    </footer>
  );
}
