import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  UserCheck,
  LayoutDashboard,
  KeyRound,
  RefreshCw,
  Search,
  CalendarDays,
  FileCheck,
  BarChart2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About BookEase',
  description:
    'Learn how BookEase supports public bookings, customer accounts, and admin booking management.',
};

const commitments = [
  {
    title: 'Customer-first booking',
    description:
      'A frictionless public booking journey helps customers select a service, choose a date, and submit accurate contact details — no account required.',
    icon: UserCheck,
    gradient: 'from-teal-500 to-cyan-500',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
  },
  {
    title: 'Organized admin work',
    description:
      'Admins can monitor booking status, manage services, and keep daily operations easier to review from a unified dashboard.',
    icon: LayoutDashboard,
    gradient: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50',
    text: 'text-violet-700',
  },
  {
    title: 'Protected management',
    description:
      'Role-based access keeps service and booking management separate from normal customer accounts with enterprise-grade security.',
    icon: KeyRound,
    gradient: 'from-rose-500 to-pink-500',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
  },
  {
    title: 'Real-time updates',
    description:
      'Booking status changes are reflected instantly for both customers and admins, eliminating miscommunication and reducing no-shows.',
    icon: RefreshCw,
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
  },
];

const steps = [
  {
    step: '01',
    title: 'Browse services',
    description: 'Explore available services and pick the one that fits your needs.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Choose a time slot',
    description: 'Select a convenient date and time from available slots in real time.',
    icon: CalendarDays,
  },
  {
    step: '03',
    title: 'Submit your booking',
    description: "Enter your details and confirm — you'll receive a booking reference instantly.",
    icon: FileCheck,
  },
  {
    step: '04',
    title: 'Track & manage',
    description: 'Log in any time to view, modify, or cancel your bookings with ease.',
    icon: BarChart2,
  },
];

const faqs = [
  {
    q: 'Do I need an account to make a booking?',
    a: 'No. Guests can submit bookings without creating an account. However, registering lets you track booking history, modify appointments, and receive updates.',
  },
  {
    q: 'How do I cancel or reschedule a booking?',
    a: 'Log in to your account, navigate to your bookings, and select the appointment you want to change. Cancellations and reschedules are available up until the appointment time.',
  },
  {
    q: 'Can I book multiple services at once?',
    a: 'Each booking is for one service at a time. You can submit multiple separate bookings from your account dashboard.',
  },
  {
    q: 'How are admins different from regular users?',
    a: 'Admins have access to a management panel where they can add or edit services, view all bookings, update booking statuses, and manage customer records.',
  },
  {
    q: 'What happens if a booking is cancelled?',
    a: 'Once a booking is cancelled, it cannot be marked as completed. The status is locked to prevent accidental data changes.',
  },
  {
    q: 'Is my personal information safe?',
    a: 'Yes. All management routes are protected by role-based authentication. Customer data is only accessible to the booking owner and authorized admins.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="border-b bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
              About BookEase
            </p>

            <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              A smarter way to schedule, manage, and grow your service business.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              BookEase is a full-featured appointment and booking management
              platform designed for both customers and service providers.
              Customers can discover services, reserve time slots, and track
              their appointments — with or without an account. Service teams
              and administrators get a dedicated dashboard to oversee bookings,
              configure services, update statuses, and maintain a clear view of
              daily operations. Built on structured business rules, BookEase
              ensures every booking is valid, every role stays in its lane, and
              every interaction is consistent and reliable.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Explore Services
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>

              <Link
                href="/book"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50"
              >
                Make a Booking
              </Link>
            </div>
          </div>

          {/* Hero image — modern collaborative workspace */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div
              role="img"
              aria-label="Modern collaborative workspace with professionals planning a schedule"
              className="aspect-[4/3] bg-cover bg-center lg:min-h-[32rem]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Our Commitments ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              Our Commitments
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Everything you need, nothing you don&apos;t.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Every feature was designed around real workflows — from the first
              booking click to the final admin report.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.gradient}`} />

                  <div className={`mb-5 flex size-12 items-center justify-center rounded-xl ${item.bg} ${item.text}`}>
                    <Icon className="size-6" aria-hidden="true" />
                  </div>

                  <h3 className="text-base font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            {/* How it works image — professional woman focused on work */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
              <div
                role="img"
                aria-label="A focused professional managing appointments on a laptop"
                className="aspect-square bg-cover bg-center sm:aspect-[4/3] lg:aspect-auto lg:min-h-[520px]"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80')",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 px-5 py-4 backdrop-blur-sm shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                  Live platform
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  Serving real bookings in real-time — right now.
                </p>
              </div>
            </div>

            {/* Steps */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
                How It Works
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                From browse to booked in four simple steps.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-500">
                Our platform removes friction at every stage — no unnecessary
                forms, no confusing flows.
              </p>

              <ol className="mt-10 space-y-6">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.step} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-xs font-extrabold text-white shadow-md shadow-teal-500/30">
                          {s.step}
                        </div>
                        {i < steps.length - 1 && (
                          <div className="mt-2 h-10 w-px bg-gradient-to-b from-teal-300 to-transparent" />
                        )}
                      </div>
                      <div className="pb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="size-4 text-teal-600" aria-hidden="true" />
                          <h3 className="text-base font-bold text-slate-950">{s.title}</h3>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{s.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
              Quick answers to the most common questions about BookEase.
            </p>
          </div>

          <dl className="divide-y divide-slate-100">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-7">
                <dt className="text-base font-semibold text-slate-900">{faq.q}</dt>
                <dd className="mt-2 text-sm leading-7 text-slate-500">{faq.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 rounded-xl border border-slate-100 bg-slate-50 px-6 py-5 text-center">
            <p className="text-sm text-slate-500">
              Still have questions?{' '}
              <Link
                href="/book"
                className="font-semibold text-teal-600 underline-offset-2 hover:underline"
              >
                Make a booking
              </Link>{' '}
              or{' '}
              <Link
                href="/services"
                className="font-semibold text-teal-600 underline-offset-2 hover:underline"
              >
                explore our services
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
