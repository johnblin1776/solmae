import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/nav/public-nav";
import { SiteFooter } from "@/components/nav/site-footer";
import { BrandMark } from "@/lib/marks";
import { pillars } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Solmae",
  description: "A women-centered discovery and community platform. Lead with the problems women actually face.",
};

const problems = [
  "Where should I go?",
  "What should I try?",
  "Who can I trust?",
  "Who knows how to do this?",
  "I want to meet people.",
  "I need a trusted recommendation.",
];

const principles = [
  {
    title: "Trust over reach",
    body: "Recommendations matter because someone real stands behind them.",
  },
  {
    title: "People over algorithms",
    body: "Solmae should not decide what is valuable simply because it generates engagement.",
  },
  {
    title: "Taste + knowledge are social currency",
    body: "You don't have to be an influencer to be valuable.",
  },
  {
    title: "Online → IRL",
    body: "Solmae should help women actually do things, meet people, and build community.",
  },
  {
    title: "Women first",
    body: "Founders, creators, experts, and brands are elevated naturally through the ecosystem — not as a slogan.",
  },
];

const ecosystem = [
  { name: "Discover", body: "Explore hobbies, places, products, travel, food, beauty, home, careers, wellness, books." },
  { name: "Ask", body: "Ask real questions and get useful, experience-based answers from women who've been there." },
  { name: "Recommend", body: "Turn conversations into trusted, structured recommendations others can act on." },
  { name: "People", body: "Profiles built around interests, taste, expertise, and want-to-try lists — not follower counts." },
  { name: "Find", body: "Connect with trusted women-owned businesses, creators, experts, classes, and services." },
  { name: "Gather", body: "Events, clubs, and local communities that bring the network to life." },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cream">
      <PublicNav />

      <main className="mx-auto w-full max-w-[880px] flex-1 px-6 pb-24 pt-10 sm:px-10">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-coral uppercase">About / Mission</p>
        <h1 className="mt-4 max-w-[16ch] font-serif text-[clamp(36px,6vw,58px)] leading-[1.1] tracking-[-0.03em] text-ink">
          The place women come to give and get.
        </h1>
        <p className="mt-6 max-w-[52ch] text-[16px] leading-8 text-ink/60">
          Solmae is a women-centered discovery and community platform. Ask questions, share trusted
          recommendations, meet people, find creators and businesses, and turn online connections into
          real life — built for women, by women.
        </p>

        <section className="mt-16 rounded-[28px] bg-blush px-8 py-10 sm:px-12">
          <h2 className="font-serif text-[28px] tracking-[-0.02em] text-ink">Start with the real questions.</h2>
          <p className="mt-3 max-w-[48ch] text-sm leading-7 text-ink/60">
            We don&apos;t lead with &ldquo;a platform for female founders.&rdquo; We lead with the problems
            women face every week.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {problems.map((item) => (
              <li key={item} className="font-serif text-[20px] text-ink">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-ink/40 uppercase">The Mission</p>
          <h2 className="mt-3 font-serif text-[36px] tracking-[-0.03em] text-ink">
            Solmae is where women show up for other women.
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Give a recommendation, get a recommendation",
              "Teach something, learn something",
              "Give insight, get insight",
              "Start something, join something",
            ].map((item) => (
              <li key={item} className="rounded-[20px] bg-white px-5 py-5 text-[15px] leading-7 text-ink/70">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-ink/40 uppercase">Inspiration. Education. Connection.</p>
          <div className="mt-8 grid gap-4">
            {pillars.map((pillar) => (
              <article
                key={pillar.id}
                id={pillar.id}
                className="scroll-mt-24 rounded-[24px] bg-white px-6 py-8 sm:flex sm:items-start sm:gap-6"
              >
                <BrandMark name={pillar.mark} className="size-12 text-ink" />
                <div>
                  <h3 className="font-serif text-[28px] text-ink">{pillar.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-7 text-ink/60">{pillar.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-ink/40 uppercase">Core Principles</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {principles.map((item) => (
              <article key={item.title} className="rounded-[24px] border border-blush bg-white px-6 py-7">
                <h3 className="font-serif text-[22px] text-ink">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-7 text-ink/60">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-ink/40 uppercase">The Ecosystem</p>
          <h2 className="mt-3 font-serif text-[32px] tracking-[-0.03em] text-ink">
            Six connected pillars of experience.
          </h2>
          <ol className="mt-8 space-y-5">
            {ecosystem.map((item, index) => (
              <li key={item.name} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="font-serif text-[20px] text-coral">0{index + 1}</span>
                <div>
                  <p className="font-serif text-[22px] text-ink">{item.name}</p>
                  <p className="mt-1 text-[14px] leading-7 text-ink/60">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-16 flex flex-wrap gap-4">
          <Link
            href="/#join"
            className="inline-flex items-center rounded-full bg-coral px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] text-white uppercase"
          >
            Join Us
          </Link>
          <Link
            href="/founding-50"
            className="inline-flex items-center rounded-full border border-ink/15 px-5 py-2.5 text-[11px] font-semibold tracking-[0.14em] text-ink uppercase"
          >
            Founding 50
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
