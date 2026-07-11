"use client";

import { LayoutDashboard } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_1px_0_rgba(15,23,42,0.03)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Link
            href="/admin"
            className="inline-flex min-w-0 items-center gap-3"
            aria-label="Go to BookEase admin dashboard"
          >
            <BrandLogo />
            <span className="hidden rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 lg:inline-flex">
              Admin
            </span>
          </Link>

          <nav aria-label="Admin navigation">
            <ul className="flex flex-wrap items-center gap-1">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const isActive = isActiveLink(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-slate-950 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
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

        <div className="grid gap-2 min-[480px]:grid-cols-2 sm:flex sm:flex-wrap sm:items-center">
          <AdminDateTime />

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
