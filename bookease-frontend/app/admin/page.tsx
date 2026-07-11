import type { Metadata } from "next";
import {
  CalendarCheck,
  LayoutDashboard,
  LockKeyhole,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "BookEase administrator dashboard.",
};

const upcomingModules = [
  {
    title: "Service Management",
    description:
      "Create, view, update, and remove BookEase services.",
    icon: Wrench,
  },
  {
    title: "Booking Management",
    description:
      "Review bookings and manage their current status.",
    icon: CalendarCheck,
  },
];

export default function AdminDashboardPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <LayoutDashboard
                className="size-6 text-primary"
                aria-hidden="true"
              />
            </div>

            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Admin Area
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              BookEase Admin Dashboard
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              This protected area will be used to manage BookEase services and
              customer bookings.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground">
            <LockKeyhole
              className="size-4 text-primary"
              aria-hidden="true"
            />
            Protected administrator route
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Upcoming management modules</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          These modules will be implemented step-by-step in the next stages.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {upcomingModules.map((module) => {
            const Icon = module.icon;

            return (
              <article
                key={module.title}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                  <Icon
                    className="size-5 text-primary"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold">{module.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {module.description}
                </p>

                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Not implemented yet
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
