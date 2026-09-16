import Link from "next/link";
import { MarkWobble } from "@/lib/marks";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-cream px-6 py-24 text-center">
      <MarkWobble className="size-16 text-ink" />
      <h1 className="mt-8 font-serif text-[36px] text-ink">This page isn&apos;t here.</h1>
      <p className="mt-3 max-w-sm text-sm leading-7 text-ink/50">
        Solmae&apos;s public site is the waitlist for now. If you were looking for the community, it
        will open when the circle is ready.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-coral px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase"
      >
        Join Us
      </Link>
    </div>
  );
}
