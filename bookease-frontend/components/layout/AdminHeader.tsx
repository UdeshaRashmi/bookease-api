"use client";

import { ClipboardList, LayoutDashboard, Stethoscope } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AdminDateTime } from "@/components/layout/AdminDateTime";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Stethoscope,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: ClipboardList,
  },
];

export function AdminHeader() {
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-100 bg-white/95 shadow-[0_1px_0_rgba(8,145,178,0.10)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/admin"
            className="inline-flex min-w-0 items-center gap-3"
            aria-label="Go to BookEase admin dashboard"
          >
            <BrandLogo variant="admin" />
          </Link>

          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
            <span className="w-fit rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700 ring-1 ring-cyan-100">
              Admin Panel
            </span>

            <nav aria-label="Admin navigation" className="min-w-0">
              <ul className="flex max-w-full gap-1 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const isActive = isActiveLink(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-cyan-700 text-white shadow-sm"
                          : "text-slate-600 hover:bg-cyan-50 hover:text-cyan-800"
                      }`}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              </ul>
            </nav>
          </div>
        </div>

        <div className="grid gap-2 min-[460px]:grid-cols-2 lg:flex lg:shrink-0 lg:flex-wrap lg:items-center lg:justify-end">
          <AdminDateTime />

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
