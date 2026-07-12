import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";

export function AdminFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 text-center text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
        <Link
          href="/admin"
          className="mx-auto inline-flex rounded-xl md:mx-0"
          aria-label="Go to BookEase admin dashboard"
        >
          <BrandLogo variant="footer" />
        </Link>
        <p>Manage services, bookings, and customer requests.</p>
      </div>
    </footer>
  );
}
