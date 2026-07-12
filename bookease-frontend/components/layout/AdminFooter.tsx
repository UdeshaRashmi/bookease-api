import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";

const adminFooterLinks = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Services",
    href: "/admin/services",
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
  },
];

export function AdminFooter() {
  return (
    <footer className="border-t border-cyan-100 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-6 text-sm sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
        <div className="flex min-w-0 flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
          <Link
            href="/admin"
            className="inline-flex rounded-xl"
            aria-label="Go to BookEase admin dashboard"
          >
            <BrandLogo variant="admin" />
          </Link>

          <div className="min-w-0">
            <p className="font-semibold text-slate-950">
              BookEase Admin Workspace
            </p>
            <p className="mt-1 max-w-lg text-slate-500">
              Manage healthcare services, appointment requests, and customer
              booking records.
            </p>
          </div>
        </div>

        <nav aria-label="Admin footer navigation">
          <ul className="flex flex-wrap justify-center gap-2 md:justify-end">
            {adminFooterLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex h-9 items-center rounded-xl border border-cyan-100 bg-cyan-50/60 px-3 text-sm font-medium text-cyan-700 transition-colors hover:bg-cyan-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
