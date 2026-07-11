import { CalendarCheck2, Sparkles } from 'lucide-react';

type BrandLogoProps = Readonly<{
  compact?: boolean;
}>;

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <span className="inline-flex min-w-0 items-center gap-3">
      <span className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm ring-1 ring-slate-900/10">
        <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-teal-500 text-white ring-2 ring-white">
          <Sparkles className="size-2.5" aria-hidden="true" />
        </span>

        <CalendarCheck2 className="size-5" aria-hidden="true" />
      </span>

      {!compact && (
        <span className="min-w-0">
          <span className="block text-xl font-bold tracking-tight text-slate-950">
            BookEase
          </span>
          <span className="hidden text-xs font-medium text-slate-500 sm:block">
            Booking made simple
          </span>
        </span>
      )}
    </span>
  );
}
