import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AuthGuard } from "@/features/auth/components/AuthGuard";

export const metadata: Metadata = {
  title: "Admin",
  description: "BookEase administration area.",
};

type AdminLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}
