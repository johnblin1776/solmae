import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/nav/public-nav";
import { SiteFooter } from "@/components/nav/site-footer";
import { FoundingFiftyForm } from "@/components/founding-fifty/application-form";
import { MarkVesica } from "@/lib/marks";

export const metadata: Metadata = {
  title: "Founding 50 — Solmae",
  description: "Fifty women with taste, knowledge, and community. Two questions to begin.",
};

export default function FoundingFiftyPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cream">
      <PublicNav />

      <main className="mx-auto w-full max-w-[720px] flex-1 px-6 pb-24 pt-10 sm:px-10">
        <MarkVesica className="size-14 text-ink" />
        <p className="mt-8 text-[11px] font-semibold tracking-[0.2em] text-coral uppercase">Founding 50</p>
        <h1 className="mt-4 font-serif text-[clamp(36px,6vw,54px)] leading-[1.1] tracking-[-0.03em] text-ink">
          Fifty women. Two questions.
        </h1>
        <p className="mt-6 max-w-[48ch] text-[16px] leading-8 text-ink/60">
          The Founding 50 is Solmae&apos;s first circle — interesting women with strong taste, knowledge,
          careers, hobbies, businesses, and communities. Not a follower count. Not an algorithm.
          A room we can actually build with.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <article className="rounded-[24px] bg-periwinkle px-6 py-8">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-ink/45 uppercase">What you know</p>
            <p className="mt-3 font-serif text-[24px] leading-snug text-ink">
              What do you know that other women should know?
            </p>
          </article>
          <article className="rounded-[24px] bg-blush px-6 py-8">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-ink/45 uppercase">What you want</p>
            <p className="mt-3 font-serif text-[24px] leading-snug text-ink">
              What do you want to know?
            </p>
          </article>
        </div>

        <p className="mt-10 text-[15px] leading-7 text-ink/55">
          If those two answers feel alive, apply. We&apos;re gathering the circle first — then the
          events, then the product. Prefer to stay close without applying?{" "}
          <Link href="/#join" className="text-ink underline underline-offset-4">
            Join the waitlist
          </Link>
          .
        </p>

        <div className="mt-12 rounded-[28px] bg-white px-6 py-10 shadow-[0_20px_60px_rgba(26,26,26,0.05)] sm:px-10">
          <h2 className="font-serif text-[28px] text-ink">Apply</h2>
          <p className="mt-2 mb-8 text-sm text-ink/50">We read every answer. No follower counts required.</p>
          <FoundingFiftyForm />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
