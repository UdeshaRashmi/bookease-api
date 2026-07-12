import type { Metadata } from 'next';

import { BookingForm } from '@/features/bookings/components/booking-form';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Choose a service, date, and time to create your booking.',
};

interface BookingPageProps {
  searchParams: Promise<{
    serviceId?: string | string[];
  }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { serviceId } = await searchParams;

  const selectedServiceId = Array.isArray(serviceId)
    ? (serviceId[0] ?? '')
    : (serviceId ?? '');

  return (
    <main className="min-h-screen bg-white">
      {/* ── Page Header ── */}
      <section className="border-b bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">
            Book an Appointment
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Reserve your service in a few steps.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Select your preferred service, choose a suitable date, and provide
            your contact information to complete the booking.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_1.6fr] lg:px-8">

        {/* Left — Info sidebar */}
        <aside className="h-fit rounded-2xl border border-slate-100 bg-slate-50/60 p-6 sm:p-8">
          <div className="mb-1 h-px w-8 bg-teal-500" />
          <h2 className="mt-5 text-xl font-bold tracking-tight text-slate-950">
            Simple & convenient
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            No account needed. Your booking will be created with a{' '}
            <span className="font-medium text-slate-700">pending</span> status
            and reviewed by our team.
          </p>

          <div className="mt-8 space-y-5">
            {[
              {
                step: '01',
                title: 'Select an active service',
                desc: 'Choose from the currently available BookEase services.',
              },
              {
                step: '02',
                title: 'Choose your date',
                desc: 'Past dates and duplicate time slots are not allowed.',
              },
              {
                step: '03',
                title: 'Submit securely',
                desc: 'Your details are validated before the booking is submitted.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <span className="mt-0.5 text-sm font-extrabold text-teal-500">
                  {step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">{title}</p>
                  <p className="mt-0.5 text-sm leading-5 text-slate-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right — Form */}
        <BookingForm defaultServiceId={selectedServiceId} />
      </section>
    </main>
  );
}
