export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <section className="max-w-2xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          BookEase
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Booking management made simple.
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          The frontend foundation is ready. We will build the complete booking
          experience step by step.
        </p>
      </section>
    </main>
  );
}
