import type { Metadata } from "next";

import { AdminAuthPanel } from "@/features/auth/components/AdminAuthPanel";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to the BookEase administration area.",
};

export default function LoginPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <AdminAuthPanel initialMode="signin" />
    </section>
  );
}
