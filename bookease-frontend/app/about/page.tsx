import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart2,
  CalendarDays,
  FileCheck,
  KeyRound,
  LayoutDashboard,
  RefreshCw,
  Search,
  UserCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About BookEase',
  description:
    'Learn how BookEase supports simple healthcare appointment requests.',
};

const commitments = [
  {
    title: 'Simple care discovery',
    description:
      'Browse available healthcare services, compare the details that matter, and choose with confidence.',
    icon: UserCheck,
    gradient: 'from-teal-500 to-cyan-500',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
  },
  {
    title: 'Easy appointment updates',
    description:
      'Keep track of upcoming appointment requests and stay clear on what happens next.',
    icon: LayoutDashboard,
    gradient: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50',
    text: 'text-violet-700',
  },
  {
    title: 'Secure personal details',
    description:
      'Your contact information and appointment history stay connected to your account with protected access.',
    icon: KeyRound,
    gradient: 'from-rose-500 to-pink-500',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
  },
  {
    title: 'Clear status tracking',
    description:
      'Check each appointment status at a glance, so every request feels easier to follow.',
    icon: RefreshCw,
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
  },
];

const steps = [
  {
    step: '01',
    title: 'Browse care services',
    description: 'Explore available healthcare services and pick the one that fits your needs.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Choose a preferred time',
    description: 'Select a convenient date and time for your appointment request.',
    icon: CalendarDays,
  },
  {
    step: '03',
    title: 'Submit your request',
    description: 'Enter your details and send the appointment request for review.',
    icon: FileCheck,
  },
  {
    step: '04',
    title: 'Track and manage',
    description: 'Sign in to view your appointments and manage upcoming requests.',
    icon: BarChart2,
  },
];

const faqs = [
  {
    q: 'Do I need an account to make a booking?',
    a: 'No. Guests can submit bookings without creating an account. Registering lets you track booking history and manage signed-in bookings.',
  },
  {
    q: 'How do I cancel or update a booking?',
    a: 'Sign in to your account, open your bookings, and choose the request you want to manage. Some status changes may be restricted after completion or cancellation.',
  },
  {
    q: 'Can I book multiple services at once?',
    a: 'Each booking is for one service at a time. You can submit multiple separate bookings when needed.',
  },
  {
    q: 'How are admins different from regular users?',
    a: 'Admins can access the management panel to add or edit services, view all bookings, update statuses, and manage records.',
  },
  {
    q: 'What happens if a booking is cancelled?',
    a: 'Once a booking is cancelled, it cannot be marked as completed. The status is locked to prevent accidental data changes.',
  },
  {
    q: 'Is my personal information protected?',
    a: 'Management routes are protected by role-based authentication. Customer booking data is available to the booking owner and authorized admins.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
              About BookEase
            </p>

            <h1 className="mt-4 max-w-3xl break-words text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Healthcare booking made simple.
            </h1>

            <p className="mt-5 max-w-2xl break-words text-base leading-7 text-slate-600 sm:text-lg">
              BookEase helps patients discover healthcare services, choose a
              preferred date and time, and submit appointment requests through a
              clean, simple flow. Every step is designed to make booking feel
              clearer from the first visit.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Explore Care Services
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

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/hero.png"
              alt="BookEase booking platform preview"
              width={1200}
              height={900}
              className="aspect-[4/3] h-full w-full object-cover lg:min-h-[32rem]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
              Our Commitments
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              A clear healthcare booking flow.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
              The experience is designed around patients who need a simple way
              to choose care, send details, and follow appointment progress.
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
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.gradient}`}
                  />

                  <div
                    className={`mb-5 flex size-12 items-center justify-center rounded-xl ${item.bg} ${item.text}`}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </div>

                  <h3 className="text-base font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#0b65b1] shadow-xl">
              <Image
                src="/appoinment_about.png"
                alt="Patient booking a healthcare appointment online"
                width={925}
                height={586}
                className="aspect-[925/586] h-auto w-full object-contain"
              />
              <div className="absolute right-4 bottom-4 left-4 rounded-xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:left-auto sm:max-w-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                  Booking workflow
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  Browse care services, submit requests, and track appointment status.
                </p>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-600">
                How It Works
              </span>
              <h2 className="mt-3 break-words text-2xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                From care search to request in four steps.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-500">
                The flow keeps the patient experience short while collecting
                the details needed to review each appointment request.
              </p>

              <ol className="mt-10 space-y-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <li key={step.step} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-xs font-extrabold text-white shadow-md shadow-teal-500/30">
                          {step.step}
                        </div>
                        {index < steps.length - 1 && (
                          <div className="mt-2 h-10 w-px bg-gradient-to-b from-teal-300 to-transparent" />
                        )}
                      </div>

                      <div className="pb-2">
                        <div className="flex items-center gap-2">
                          <Icon
                            className="size-4 text-teal-600"
                            aria-hidden="true"
                          />
                          <h3 className="text-base font-bold text-slate-950">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              FAQ
            </span>
              <h2 className="mt-3 break-words text-2xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
              Quick answers to common healthcare booking questions.
            </p>
          </div>

          <dl className="divide-y divide-slate-100">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-7">
                <dt className="text-base font-semibold text-slate-900">
                  {faq.q}
                </dt>
                <dd className="mt-2 text-sm leading-7 text-slate-500">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 rounded-xl border border-slate-100 bg-slate-50 px-6 py-5 text-center">
            <p className="text-sm text-slate-500">
              Need help before booking?{' '}
              <Link
                href="/contact"
                className="font-semibold text-teal-600 underline-offset-2 hover:underline"
              >
                Contact us
              </Link>{' '}
              or{' '}
              <Link
                href="/services"
                className="font-semibold text-teal-600 underline-offset-2 hover:underline"
              >
                explore care services
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
