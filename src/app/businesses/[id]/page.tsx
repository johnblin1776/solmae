import { notFound } from "next/navigation";
import Link from "next/link";
import { AppNav } from "@/components/nav/app-nav";
import { BUSINESSES } from "@/lib/seed-data";

export default async function BusinessProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const biz = BUSINESSES.find(b => b.id === id);
  if (!biz) notFound();

  return (
    <>
      <AppNav />

      {/* Hero */}
      <div className="w-full h-[380px] overflow-hidden relative">
        {biz.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={biz.heroImage} alt={biz.name} className="w-full h-full object-cover object-top" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-[80px]"
            style={{ background: biz.heroColor ?? "#E5E3DE" }}
          >
            {biz.heroEmoji ?? ""}
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,26,0.7) 0%, transparent 60%)" }} />
      </div>

      <div className="max-w-[860px] mx-auto px-6 py-12">
        <div className="grid gap-12" style={{ gridTemplateColumns: "1fr 280px" }}>
          {/* Left: main info */}
          <div>
            {/* Category badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {biz.categories.map(cat => (
                <Link
                  key={cat}
                  href={`/businesses?cat=${encodeURIComponent(cat)}`}
                  className="px-3 py-[5px] bg-lavender/40 border border-[#a8abdc]/40 text-[#5558a0] text-[11px] font-semibold rounded-[20px] hover:bg-lavender/60 transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>

            <h1 className="font-serif text-[42px] font-normal text-nearblack tracking-[-0.5px] leading-[1.1] mb-2">
              {biz.name}
            </h1>

            <p className="text-[13px] text-gray mb-6 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {biz.location}
              {biz.founded && (
                <><span className="text-lightgray">·</span> Est. {biz.founded}</>
              )}
            </p>

            <p className="text-[15px] text-nearblack leading-[1.8] mb-8 font-medium">{biz.tagline}</p>

            <p className="text-[14px] text-gray leading-[1.85]">{biz.description}</p>
          </div>

          {/* Right: sidebar */}
          <div>
            {/* Visit */}
            {biz.website && biz.website !== "#" && (
              <div className="bg-white border border-lightgray rounded-[3px] p-5 mb-4">
                <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray mb-3">Website</p>
                <a
                  href={biz.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] font-semibold text-nearblack hover:text-[#5558a0] transition-colors group"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  {biz.website.replace("https://", "").replace(/\/$/, "")}
                  <span className="text-gray group-hover:text-[#5558a0] transition-colors ml-auto">→</span>
                </a>
              </div>
            )}

            {/* Socials */}
            {biz.socials.length > 0 && (
              <div className="bg-white border border-lightgray rounded-[3px] p-5 mb-4">
                <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray mb-3">Follow</p>
                <div className="flex flex-col gap-2.5">
                  {biz.socials.map(s => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="text-[13px] text-nearblack font-medium hover:text-[#5558a0] transition-colors flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-lavender/40 flex items-center justify-center text-[9px] text-[#5558a0] font-bold flex-shrink-0">
                        {s.label.charAt(0)}
                      </span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Owner */}
            <div className="bg-white border border-lightgray rounded-[3px] p-5">
              <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray mb-3">Owner</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-lavender/50 flex items-center justify-center text-[12px] font-bold text-[#5558a0] flex-shrink-0">
                  {biz.ownerName.charAt(0)}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-nearblack">{biz.ownerName}</p>
                  <p className="text-[11px] text-gray capitalize">{biz.ownerType}</p>
                </div>
              </div>
              {biz.ownerId && (
                <Link
                  href={`/${biz.ownerType === "creator" ? "creators" : "members"}/${biz.ownerId}`}
                  className="mt-3 block text-[11px] font-semibold text-nearblack underline underline-offset-2 hover:text-[#5558a0] transition-colors"
                >
                  View {biz.ownerType === "creator" ? "Creator" : "Member"} profile →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
