import Link from 'next/link';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Search,
  ShieldCheck,
} from 'lucide-react';

const features = [
  {
    title: 'Discover Services',
    description:
      'Browse all available services and view their prices, duration, and details.',
    icon: Search,
  },
  {
    title: 'Book in Minutes',
    description:
      'Select a service, choose a preferred date, and submit your booking easily.',
    icon: CalendarCheck,
  },
  {
    title: 'Reliable Experience',
    description:
      'BookEase provides a simple and structured booking process for every customer.',
    icon: ShieldCheck,
  },
];

const steps = [
  {
    number: '01',
    title: 'Browse services',
    description: 'Explore the available services and choose the best option.',
  },
  {
    number: '02',
    title: 'Enter booking details',
    description: 'Provide your contact information and preferred booking date.',
  },
  {
    number: '03',
    title: 'Submit your booking',
    description:
      'Review your information and send the booking request securely.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-24 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <CheckCircle2
                className="size-4 text-primary"
                aria-hidden="true"
              />
              Simple and reliable booking management
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Book the service you need with ease.
              </h1>

              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                BookEase helps you discover available services, review their
                details, and submit a booking request through one simple
                platform.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 sm:w-auto"
              >
                Explore Services
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>

              <Link
                href="/book"
                className="inline-flex h-11 w-full items-center justify-center rounded-md border bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-muted sm:w-auto"
              >
                Book Now
              </Link>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4 shadow-sm sm:p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <CalendarCheck
                    className="size-6 text-primary"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="font-semibold">Easy Booking Process</p>
                  <p className="text-sm text-muted-foreground">
                    Complete your booking in a few simple steps.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border bg-background p-4">
                  <div className="flex items-center gap-3">
                    <Search
                      className="size-5 text-muted-foreground"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-sm font-medium">Choose a service</p>
                      <p className="text-sm text-muted-foreground">
                        Browse and select an available service.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <div className="flex items-center gap-3">
                    <Clock3
                      className="size-5 text-muted-foreground"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-sm font-medium">
                        Select your preferred date
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Choose a suitable future date for your booking.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border bg-background p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      className="size-5 text-muted-foreground"
                      aria-hidden="true"
                    />

                    <div>
                      <p className="text-sm font-medium">Submit your booking</p>
                      <p className="text-sm text-muted-foreground">
                        Send your details through the secure booking form.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/book"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start Booking
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Why BookEase
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A simpler way to manage your booking
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Everything you need to discover services and make a booking
              request is available in one place.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-xl border bg-card p-6 shadow-sm"
                >
                  <div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/40 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              How It Works
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three simple steps
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-xl border bg-background p-6"
              >
                <p className="text-sm font-bold text-primary">{step.number}</p>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 rounded-xl bg-primary px-5 py-8 text-primary-foreground sm:px-10 sm:py-10 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to make your booking?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-primary-foreground/80 sm:text-base">
                Explore the available services and submit your booking request
                today.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-background/90 sm:w-auto"
            >
              View Services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
