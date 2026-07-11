import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

import { BrandLogo } from '@/components/layout/BrandLogo';

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
  {
    label: 'User Account',
    href: '/account',
  },
  {
    label: 'Admin',
    href: '/login',
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div className="space-y-5">
          <Link
            href="/"
            className="inline-flex rounded-2xl bg-white px-3 py-2"
            aria-label="Go to BookEase home page"
          >
            <BrandLogo />
          </Link>

          <p className="max-w-md text-sm leading-6 text-slate-300">
            Discover available services and make your booking quickly and
            conveniently with BookEase.
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
          <h2 className="mb-4 text-sm font-semibold text-white">
            Quick Links
          </h2>

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
          <h2 className="mb-4 text-sm font-semibold text-white">Contact</h2>

          <div className="space-y-3 text-sm text-slate-300">
            <p className="flex items-center gap-3">
              <Mail className="size-4 text-teal-400" aria-hidden="true" />
              hello@bookease.lk
            </p>

            <p className="flex items-center gap-3">
              <Phone className="size-4 text-teal-400" aria-hidden="true" />
              +94 77 123 4567
            </p>

            <p className="flex items-center gap-3">
              <MapPin className="size-4 text-teal-400" aria-hidden="true" />
              Colombo, Sri Lanka
            </p>
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
