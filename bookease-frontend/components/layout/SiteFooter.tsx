import Link from 'next/link';
import { CalendarCheck } from 'lucide-react';

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
    <footer className="border-t bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg font-semibold"
          >
            <CalendarCheck className="size-6" aria-hidden="true" />
            <span>BookEase</span>
          </Link>

          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Discover available services and make your booking quickly and
            conveniently with BookEase.
          </p>
        </div>

        <div className="md:justify-self-end">
          <h2 className="mb-4 text-sm font-semibold">Quick Links</h2>

          <nav aria-label="Footer navigation">
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-center text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <p>Copyright {currentYear} BookEase. All rights reserved.</p>
          <p>Simple and reliable booking management.</p>
        </div>
      </div>
    </footer>
  );
}
