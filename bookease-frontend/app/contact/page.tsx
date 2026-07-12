import type { Metadata } from 'next';
import {
  CalendarCheck,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
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
    tone: 'bg-teal-50 text-teal-700 ring-teal-100',
  },
  {
    label: 'Email support',
    value: 'bookease@gmail.com',
    href: 'mailto:bookease@gmail.com',
    icon: Mail,
    tone: 'bg-sky-50 text-sky-700 ring-sky-100',
  },
  {
    label: 'Visit area',
    value: 'Malabe, Sri Lanka',
    icon: MapPin,
    tone: 'bg-rose-50 text-rose-700 ring-rose-100',
  },
];

const supportNotes = [
  {
    title: 'Choose the right service',
    description:
      'Ask for guidance before selecting a healthcare service or preferred doctor.',
    icon: CalendarCheck,
  },
  {
    title: 'Follow your request',
    description:
      'Get help understanding appointment details, contact information, and status updates.',
    icon: MessageCircle,
  },
  {
    title: 'Plan your visit',
    description:
      'Check service area details before sending your appointment request.',
    icon: Clock3,
  },
];

const contactVideos = [
  {
    src: '/Contact%20us%20page%20v2.mp4',
    label: 'BookEase contact support preview',
    className: 'lg:translate-y-10',
  },
  {
    src: '/Contact%20us%20page%20%20v1.mp4',
    label: 'BookEase healthcare booking support preview',
    className: 'lg:-translate-y-4',
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="overflow-hidden border-b border-slate-100 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 lg:py-20">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
              Contact BookEase
            </p>

            <h1 className="mt-4 max-w-3xl break-words text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Friendly support before your healthcare booking.
            </h1>

            <p className="mt-5 max-w-2xl break-words text-base leading-7 text-slate-600 sm:text-lg">
              Need help choosing a service, checking appointment details, or
              understanding what to do next? Reach BookEase support and keep
              your care request simple from the start.
            </p>

            <div className="mt-8 min-w-0 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
              <p className="break-words text-sm leading-6 text-slate-500">
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

          <div className="relative min-w-0 overflow-hidden">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {contactVideos.map((video) => (
                <div
                  key={video.src}
                  className={`overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-2xl shadow-slate-200/80 ring-1 ring-slate-100 ${video.className}`}
                >
                  <video
                    aria-label={video.label}
                    className="aspect-[4/5] h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const content = (
                <>
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1 ${method.tone}`}
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
                  className="flex min-h-24 items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 transition-all hover:-translate-y-0.5 hover:border-teal-100 hover:bg-white hover:shadow-lg hover:shadow-slate-100"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={method.label}
                  className="flex min-h-24 items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-5"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                How we can help
              </p>
              <h2 className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Clear answers for the next step in your booking.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                Contact support is focused on helping patients move from care
                discovery to appointment request with less confusion.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {supportNotes.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
                  >
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-base font-bold text-slate-950">
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
        </div>
      </section>
    </main>
  );
}
