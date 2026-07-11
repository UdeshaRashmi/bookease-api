"use client";

import { CalendarCheck, ExternalLink, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <header className="border-b bg-card">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-lg font-semibold"
          >
            <CalendarCheck className="size-6 text-primary" aria-hidden="true" />
            <span>BookEase Admin</span>
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
                      className={`inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
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

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            View Website
          </Link>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
