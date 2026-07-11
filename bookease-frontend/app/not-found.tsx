import Link from "next/link";
import { ArrowLeft, CalendarX2, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary/10">
          <CalendarX2
            className="size-10 text-primary"
            aria-hidden="true"
          />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-primary">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          The page you are looking for may have been moved, deleted, or the
          address may be incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Return Home
          </Link>

          <Link
            href="/services"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
          >
            <Search className="size-4" aria-hidden="true" />
            Browse Services
          </Link>
        </div>
      </div>
    </section>
  );
}