import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

import type { Service } from '@/types/service';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group flex h-full min-w-0 flex-col rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Clock className="h-5 w-5" />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            service.isActive
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {service.isActive ? 'Available' : 'Unavailable'}
        </span>
      </div>

      <h2 className="text-xl font-semibold tracking-tight text-card-foreground">
        {service.title}
      </h2>
      <p className="mt-2 text-sm font-medium text-teal-700">
        {service.doctorName ?? 'Doctor A'}
      </p>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
        {service.description}
      </p>

      <div className="mt-6 grid gap-4 border-t pt-5 min-[420px]:grid-cols-2 min-[420px]:items-center">
        <div>
          <p className="text-xs text-muted-foreground">Starting from</p>

          <p className="mt-1 text-lg font-semibold text-foreground">
            LKR {service.price.toLocaleString('en-LK')}
          </p>
        </div>

        <div className="min-[420px]:text-right">
          <p className="text-xs text-muted-foreground">Duration</p>

          <p className="mt-1 text-sm font-medium text-foreground">
            {service.duration} minutes
          </p>
        </div>
      </div>

      <Link
        href={`/services/${service.id}`}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        View details
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
