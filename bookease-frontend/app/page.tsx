import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Find Care Services',
    description:
      'Browse available health services with prices, duration, and helpful details before choosing.',
  },
  {
    title: 'Request an Appointment',
    description:
      'Select a care service, pick a preferred date, and send your appointment request quickly.',
  },
  {
    title: 'Clear & Reassuring',
    description:
      'Your appointment details are handled through a simple, structured, and customer-friendly process.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Browse Care Services',
    description:
      'Explore available healthcare services and choose the right option for your visit.',
  },
  {
    number: '02',
    title: 'Enter Patient Details',
    description:
      'Provide your contact information and choose a preferred appointment date.',
  },
  {
    number: '03',
    title: 'Submit Request',
    description:
      'Review the details and submit your healthcare appointment request.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-white">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <div className="min-w-0 space-y-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">
                Healthcare Appointment Booking
              </p>
              <h1 className="max-w-xl break-words text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Healthcare appointments{' '}
                <span className="text-teal-600">made simple</span>.
              </h1>
              <p className="max-w-lg break-words text-base leading-relaxed text-slate-500 sm:text-lg">
                BookEase helps patients discover health services, review care
                details, and request appointments through one clean, simple
                platform.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800"
              >
                Explore Care Services
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>

              <Link
                href="/book"
                className="inline-flex h-11 items-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50"
              >
                Book Now
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-lg">
              <Image
                src="/Home%20hero.jpg"
                alt="Healthcare appointment booking illustration"
                width={640}
                height={480}
                className="aspect-[4/3] h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-600">
              Why BookEase
            </p>
            <h2 className="break-words text-2xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Easy healthcare appointments
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              Everything you need to explore care options and send an
              appointment request in one place.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
              >
                <div className="mb-4 h-px w-8 bg-teal-500" />
                <h3 className="text-base font-semibold text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-slate-50/60 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal-600">
              How It Works
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Three simple steps
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="mb-4 text-3xl font-extrabold text-teal-500">
                  {step.number}
                </p>
                <h3 className="text-base font-semibold text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
