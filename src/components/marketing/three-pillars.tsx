import Link from "next/link";
import { BrandMark } from "@/lib/marks";
import { pillars } from "@/lib/site";

const toneClass = {
  periwinkle: "bg-periwinkle",
  blush: "bg-blush",
  peach: "bg-peach",
} as const;

/**
 * Full-bleed Inspiration / Education / Connection band.
 * Kept off `/` for the waitlist-only landing; reused on `/about`
 * and available for a future main/home page.
 */
export function ThreePillarsSection({
  showReadMore = false,
}: {
  showReadMore?: boolean;
}) {
  return (
    <>
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
            className={`${toneClass[pillar.tone]} flex min-h-[360px] scroll-mt-24 flex-col px-8 py-12 sm:px-10`}
          >
            <p className="text-[11px] font-semibold tracking-[0.18em] text-ink/40">{pillar.number}</p>
            <BrandMark name={pillar.mark} className="mt-8 size-12 text-ink" />
            <h3 className="mt-auto pt-16 font-serif text-[36px] tracking-[-0.03em] text-ink">
              {pillar.title}
            </h3>
            <p className="mt-3 max-w-[28ch] text-[14px] leading-7 text-ink/65">{pillar.summary}</p>
            {showReadMore ? (
              <Link
                href={`/about#${pillar.id}`}
                className="mt-8 inline-flex min-h-11 w-fit items-center rounded-full border border-ink/15 bg-white/70 px-4 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-ink uppercase sm:min-h-0"
              >
                Read more
              </Link>
            ) : null}
          </article>
        ))}
      </section>
    </>
  );
}
