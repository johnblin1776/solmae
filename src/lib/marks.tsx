import { cn } from "@/lib/utils";

type MarkProps = {
  className?: string;
  title?: string;
};

export function MarkHalved({ className, title = "Halved" }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("shrink-0", className)} role="img" aria-label={title}>
      <title>{title}</title>
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path d="M24 2a22 22 0 0 0 0 44Z" fill="currentColor" />
    </svg>
  );
}

export function MarkEclipse({ className, title = "Eclipse" }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("shrink-0", className)} role="img" aria-label={title}>
      <title>{title}</title>
      <path
        d="M26 4.2A22 22 0 1 0 26 43.8 17 17 0 1 1 26 4.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MarkVesica({ className, title = "Vesica" }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("shrink-0", className)} role="img" aria-label={title}>
      <title>{title}</title>
      <circle cx="18" cy="24" r="13.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="30" cy="24" r="13.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function MarkWobble({ className, title = "Wobble" }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("shrink-0", className)} role="img" aria-label={title}>
      <title>{title}</title>
      <path
        d="M38.2 14.5a18.5 18.5 0 1 0 2.4 10.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MarkInked({ className, title = "Inked" }: MarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("shrink-0", className)} role="img" aria-label={title}>
      <title>{title}</title>
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="16" fill="currentColor" />
    </svg>
  );
}

const MARKS = {
  halved: MarkHalved,
  eclipse: MarkEclipse,
  vesica: MarkVesica,
  wobble: MarkWobble,
  inked: MarkInked,
} as const;

export type MarkName = keyof typeof MARKS;

export function BrandMark({ name, className }: { name: MarkName; className?: string }) {
  const Mark = MARKS[name];
  return <Mark className={className} />;
}
