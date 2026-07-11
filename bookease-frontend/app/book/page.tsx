import type { Metadata } from 'next';
import { CalendarDays, CheckCircle2, ShieldCheck } from 'lucide-react';

import { BookingForm } from '@/features/bookings/components/booking-form';

export const metadata: Metadata = {
  title: 'Book an Appointment | BookEase',
  description: 'Choose a service, date, and time to create your booking.',
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Book an appointment
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Reserve your service in a few simple steps.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Select your preferred service, choose a suitable date and time, and
            provide your contact information.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1fr_1.5fr] lg:px-8">
        <aside className="h-fit rounded-3xl border bg-muted/30 p-6 sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <CalendarDays className="h-6 w-6" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
            Simple and convenient booking
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            You do not need to create an account to submit a booking. Your
            booking will initially be created with the pending status.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="font-medium text-foreground">
                  Select an active service
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Choose from the currently available BookEase services.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="font-medium text-foreground">
                  Choose your date and time
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Past dates and duplicate time slots are not allowed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="font-medium text-foreground">
                  Validated and protected
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Your details are checked before the booking is submitted.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <BookingForm />
      </section>
    </main>
  );
}
