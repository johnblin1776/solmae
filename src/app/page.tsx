import Link from "next/link";
import { PublicNav } from "@/components/nav/public-nav";
import { SiteFooter } from "@/components/nav/site-footer";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { MarkHalved } from "@/lib/marks";
import { site } from "@/lib/site";

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cream">
      <PublicNav />

      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-8 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[8%] inset-y-[6%] rounded-[48px] bg-periwinkle/90 sm:inset-x-[14%]"
        />

        <div className="relative mx-auto w-full max-w-[560px] rounded-[36px] bg-white px-8 py-14 text-center shadow-[0_30px_80px_rgba(26,26,26,0.08)] sm:px-14 sm:py-16">
          <p className="font-display italic text-[28px] tracking-[0.04em] text-periwinkle lowercase sm:text-[32px]">
            solmae
          </p>
          <MarkHalved className="mx-auto mt-5 size-10 text-ink" />
          <h1 className="mx-auto mt-8 max-w-[14ch] font-serif text-[clamp(34px,5vw,52px)] leading-[1.12] font-normal tracking-[-0.03em] text-ink">
            {site.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-[28ch] text-[15px] leading-7 text-coral">
            {site.dek}
          </p>
          <div id="join" className="mx-auto mt-10 max-w-[340px] scroll-mt-28">
            <WaitlistForm source="landing" />
          </div>
          <p className="mt-6 text-[13px] text-ink/40">
            <Link
              href="/founding-50"
              className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
            >
              Be part of the founding circle.
            </Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
