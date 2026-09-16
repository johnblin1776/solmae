import Link from "next/link";
import { PublicNav } from "@/components/nav/public-nav";
import { SiteFooter } from "@/components/nav/site-footer";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { BrandMark, MarkHalved } from "@/lib/marks";
import { pillars, site } from "@/lib/site";

const toneClass = {
  periwinkle: "bg-periwinkle",
  blush: "bg-blush",
  peach: "bg-peach",
} as const;

export default function LandingPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cream">
      <PublicNav />

      <section className="relative overflow-hidden px-4 pb-20 pt-6 sm:px-8 sm:pb-28 sm:pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[8%] top-10 h-[78%] rounded-[48px] bg-periwinkle/90 sm:inset-x-[14%]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-[18%] right-[18%] h-16 rounded-[32px] bg-cream"
        />

        <div className="relative mx-auto max-w-[560px] rounded-[36px] bg-white px-8 py-14 text-center shadow-[0_30px_80px_rgba(26,26,26,0.08)] sm:px-14 sm:py-16">
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
          <p className="mx-auto mt-4 max-w-[36ch] text-[14px] leading-7 text-ink/45">
            {site.description}
          </p>
          <div id="join" className="mx-auto mt-10 max-w-[340px] scroll-mt-28">
            <WaitlistForm source="landing" />
          </div>
          <p className="mt-6 text-[13px] text-ink/40">
            <Link href="/founding-50" className="underline decoration-ink/20 underline-offset-4 hover:text-ink">
              Be part of the founding circle.
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 pb-8 pt-4 text-center sm:px-10">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-ink/40 uppercase">
          03 · The Three Pillars
        </p>
        <h2 className="mt-4 font-serif text-[clamp(32px,5vw,48px)] tracking-[-0.03em] text-ink">
          Inspiration. Education. Connection.
        </h2>
        <p className="mt-3 text-sm text-ink/45">Each pillar carries a different hand-drawn mark.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3">
        {pillars.map((pillar) => (
          <article
            key={pillar.id}
            id={pillar.id}
            className={`${toneClass[pillar.tone]} flex min-h-[360px] flex-col px-8 py-12 sm:px-10`}
          >
            <p className="text-[11px] font-semibold tracking-[0.18em] text-ink/40">{pillar.number}</p>
            <BrandMark name={pillar.mark} className="mt-8 size-12 text-ink" />
            <h3 className="mt-auto pt-16 font-serif text-[36px] tracking-[-0.03em] text-ink">
              {pillar.title}
            </h3>
            <p className="mt-3 max-w-[28ch] text-[14px] leading-7 text-ink/65">{pillar.summary}</p>
            <Link
              href={`/about#${pillar.id}`}
              className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border border-ink/15 bg-white/70 px-4 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-ink uppercase sm:min-h-0"
            >
              Read more
            </Link>
          </article>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
