import Image from 'next/image';

type BrandLogoProps = Readonly<{
  compact?: boolean;
  variant?: 'default' | 'footer' | 'admin';
}>;

export function BrandLogo({
  compact = false,
  variant = 'default',
}: BrandLogoProps) {
  if (variant === 'footer' || variant === 'admin') {
    const imageClass =
      variant === 'admin'
        ? 'h-12 w-auto max-w-[10.5rem] rounded-xl object-contain shadow-sm ring-1 ring-cyan-100 sm:h-14 sm:max-w-[12rem]'
        : 'h-16 w-auto max-w-[15rem] object-contain sm:h-18 sm:max-w-[17rem]';

    return (
      <span className="inline-flex min-w-0 items-center">
        <Image
          src="/logo.png"
          alt="BookEase Healthcare booking"
          width={1368}
          height={768}
          className={imageClass}
          priority
        />
      </span>
    );
  }

  const imageClass =
    compact
      ? 'h-11 w-11 object-cover object-left'
      : 'h-14 w-auto max-w-[12rem] rounded-xl object-contain shadow-sm ring-1 ring-slate-200 sm:h-16 sm:max-w-[15rem]';

  const wrapperClass = 'inline-flex min-w-0 items-center';

  return (
    <span className={wrapperClass}>
      <span
        className={
          compact
            ? 'flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'
            : 'inline-flex min-w-0 items-center'
        }
      >
        <Image
          src="/logo.png"
          alt="BookEase Healthcare booking"
          width={1368}
          height={768}
          className={imageClass}
          priority
        />
      </span>
    </span>
  );
}
