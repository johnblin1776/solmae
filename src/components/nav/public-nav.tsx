import Link from "next/link";
import { MarkHalved } from "@/lib/marks";

export function PublicNav({ joinHref = "/#join" }: { joinHref?: string }) {
  return (
    <header className="relative z-20 bg-cream/80 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] w-full max-w-[1120px] items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <MarkHalved className="size-7" />
          <span className="font-display italic text-[22px] tracking-[0.04em] lowercase">solmae</span>
        </Link>
        <Link
          href={joinHref}
          className="inline-flex min-h-11 items-center rounded-full bg-coral px-5 py-2 text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-[#d94d40] sm:min-h-0"
        >
          Join Us
        </Link>
      </div>
    </header>
  );
}
