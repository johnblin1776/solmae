import Link from "next/link";
import { PublicNav } from "@/components/nav/public-nav";

const SEED_CREATORS = [
  { name: "Nicole Keshishian", topics: ["Nutrition", "Recipes"], avatarUrl: "https://kalejunkie.com/wp-content/uploads/2025/09/main-image.webp" },
  { name: "Shira Gill", topics: ["Lifestyle", "Wellness"], avatarUrl: "https://shiragill.com/wp-content/uploads/BeccaMeyerMillValley_7036-Edita-scaled.jpg" },
  { name: "Brit Morin", topics: ["Entrepreneurship"], avatarUrl: "https://images.squarespace-cdn.com/content/v1/6303fb9404a0cf0cd130ef3c/f7b9ac1c-b3cb-42e6-aa9d-982f34d5507a/Brit+Morin+Headshot.jpg" },
  { name: "Holly Blakey", topics: ["Design", "Home"], avatarUrl: "https://static1.squarespace.com/static/5b0b65b8f407b4a4414db2ee/5ea6de0a41e9232ab0a8b58d/639fd7597ca60c5b989498a5/1713378056113/Holly+June+20220467.jpg?format=1500w" },
  { name: "Kate Ogata", topics: ["Fitness"], initials: "KO", avatarColor: "linear-gradient(135deg,#B5D5F7,#78aadf)" },
  { name: "Amy Motroni", topics: ["Parenthood", "Wellness"], avatarUrl: "https://geniusmomhacks.com/wp-content/uploads/2023/11/Amy-Motroni.jpg" },
  { name: "Caitlin Flemming", topics: ["Design", "Interior"], initials: "CF", avatarColor: "linear-gradient(135deg,#C4B5E0,#9080c0)" },
  { name: "Anh Sundstrom", topics: ["Fashion", "Lifestyle"], avatarUrl: "https://9to5chic.com/wp-content/uploads/2016/10/DSC_0332-copy-3.jpg" },
] as const;

function CreatorAvatar({ creator }: { creator: (typeof SEED_CREATORS)[number] }) {
  if ("avatarUrl" in creator) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={creator.avatarUrl} alt={creator.name} className="w-full h-full object-cover" />;
  }
  return <span className="font-serif italic text-2xl text-white">{creator.initials}</span>;
}

export default function LandingPage() {
  return (
    <>
      <PublicNav />

      {/* ── HERO ── */}
      <section className="bg-nearblack relative overflow-hidden px-14 py-24 text-center">
        <div
          aria-hidden
          className="font-serif italic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[600px] leading-none pointer-events-none select-none"
          style={{ color: "rgba(254,157,148,0.05)" }}
        >
          S
        </div>

        <p className="relative text-[10px] font-bold tracking-[3px] uppercase text-salmon mb-7">
          Invite Only · Women in Leadership
        </p>

        <h1 className="relative font-serif text-[clamp(40px,6vw,64px)] font-normal text-white leading-[1.1] tracking-[-1.5px] max-w-[700px] mx-auto mb-5">
          Where women who <em className="text-salmon">lead</em> come to be inspired.
        </h1>

        <p className="relative text-base text-white/55 max-w-[420px] mx-auto mb-11 font-light leading-[1.8]">
          A curated community of creators, founders, experts, and makers — sharing what they know, discover, and love.
        </p>

        <div className="relative flex gap-3 justify-center flex-wrap">
          <Link
            href="/invite"
            className="inline-flex items-center px-6 py-3 bg-salmon text-nearblack text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#fd8a7f] transition-colors"
          >
            Enter Your Invite Code
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center px-6 py-3 text-white/80 text-[11px] font-bold tracking-widest uppercase rounded-[2px] border border-white/40 hover:border-white hover:text-white transition-colors"
          >
            Apply as a Creator
          </Link>
        </div>
      </section>

      {/* ── CREATORS GRID ── */}
      <section className="max-w-[1248px] mx-auto w-full px-14 py-[72px]">
        <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-gray mb-1.5">Our Creators</p>
        <h2 className="font-serif text-4xl font-normal text-nearblack tracking-[-0.5px] mb-2">
          The voices behind Solmae
        </h2>
        <p className="text-sm text-gray max-w-[480px] mb-11 leading-[1.7]">
          Writers, founders, doctors, designers, and makers — hand-selected by Jen and Lauren.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {SEED_CREATORS.map((creator) => (
            <div
              key={creator.name}
              className="bg-white border border-lightgray px-5 py-7 text-center relative overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-offwhite/60 to-transparent pointer-events-none"
              />
              <div
                className="w-[76px] h-[76px] rounded-full mx-auto mb-3.5 flex items-center justify-center overflow-hidden"
                style={"avatarColor" in creator ? { background: creator.avatarColor } : { background: "#CCCEEF" }}
              >
                <CreatorAvatar creator={creator} />
              </div>
              <p className="relative font-serif text-base font-medium text-nearblack mb-2">
                {creator.name}
              </p>
              <div className="relative flex flex-wrap gap-1 justify-center">
                {creator.topics.map((t) => (
                  <span
                    key={t}
                    className="inline-block px-1.5 py-0.5 bg-lavender text-[#5558a0] text-[9px] font-bold tracking-[0.8px] uppercase rounded-[2px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-lightgray mx-14" />

      {/* ── ABOUT / STATS ── */}
      <section className="bg-nearblack px-14 py-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="font-serif text-[40px] font-normal text-white leading-[1.2] tracking-[-0.5px] mb-5">
            Built for women who{" "}
            <em className="text-salmon">do the work.</em>
          </h2>
          <p className="text-[15px] text-white/60 leading-[1.9] mb-8 font-light">
            Solmae is an invite-only space where the content finds you — curated daily from the creators you trust, in the topics that matter to you. No algorithm. No noise. Just signal.
          </p>
          <Link
            href="/invite"
            className="inline-flex items-center px-6 py-3 bg-salmon text-nearblack text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#fd8a7f] transition-colors"
          >
            Enter Your Invite Code
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {[
            { num: "50+", label: "Founding Creators across nutrition, design, fitness & more" },
            { num: "3",   label: "Curated stories in every daily Edition, chosen from your Bench" },
            { num: "5",   label: "Invite slots available per Member each month" },
          ].map(({ num, label }) => (
            <div key={num} className="border-l-2 border-salmon pl-5">
              <div className="font-serif text-[40px] text-white leading-none mb-1">{num}</div>
              <div className="text-[13px] text-white/50">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
