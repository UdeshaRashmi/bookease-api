import type { Metadata } from 'next';
import {
  CalendarCheck,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact BookEase',
  description:
    'Contact BookEase for healthcare appointment booking support and service information.',
};

const contactMethods = [
  {
    label: 'Call support',
    value: '074 276 5035',
    href: 'tel:0742765035',
    icon: Phone,
    tone: 'text-teal-700 bg-teal-50',
  },
  {
    label: 'Email support',
    value: 'bookease@gmail.com',
    href: 'mailto:bookease@gmail.com',
    icon: Mail,
    tone: 'text-sky-700 bg-sky-50',
  },
  {
    label: 'Service area',
    value: 'Malabe, Sri Lanka',
    icon: MapPin,
    tone: 'text-rose-700 bg-rose-50',
  },
];

const supportNotes = [
  {
    title: 'Appointment guidance',
    description:
      'Get help choosing the right healthcare service before sending a booking request.',
    icon: CalendarCheck,
  },
  {
    title: 'Booking follow-up',
    description:
      'Ask about submitted appointment requests, status updates, or contact details.',
    icon: MessageCircle,
  },
  {
    title: 'Support hours',
    description:
      'Support details are available for patients who need quick booking assistance.',
    icon: Clock3,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
              Contact BookEase
            </p>
            <h1 className="mt-4 max-w-3xl break-words text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Support for easier healthcare booking.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Reach out if you need help choosing a care service, checking
              appointment details, or understanding your next booking step.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
              <p className="text-sm leading-6 text-slate-500">
                Ready to request care?{' '}
                <Link
                  href="/book"
                  className="font-semibold text-teal-600 underline-offset-2 hover:underline"
                >
                  Book an appointment
                </Link>{' '}
                or{' '}
                <Link
                  href="/services"
                  className="font-semibold text-teal-600 underline-offset-2 hover:underline"
                >
                  view healthcare services
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl shadow-slate-200/70">
              <div className="relative">
                <Image
                  src="/Home%20hero.jpg"
                  alt="Healthcare booking support illustration"
                  width={1200}
                  height={850}
                  className="aspect-[16/11] w-full object-cover [clip-path:polygon(0_0,100%_0,100%_88%,0_100%)]"
                  priority
                />
                <div className="absolute right-4 bottom-5 left-4 rounded-2xl bg-white/95 p-4 shadow-lg ring-1 ring-slate-100 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                    Patient support
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-950">
                    Friendly guidance before you send an appointment request.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const content = (
                <>
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${method.tone}`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-950">
                      {method.label}
                    </span>
                    <span className="mt-1 block break-words text-sm text-slate-500">
                      {method.value}
                    </span>
                  </span>
                </>
              );

              return method.href ? (
                <a
                  key={method.label}
                  href={method.href}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={method.label}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                >
                  {content}
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {supportNotes.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-base font-bold text-slate-950">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
