import { notFound } from "next/navigation";
import Link from "next/link";
import { AppNav } from "@/components/nav/app-nav";
import { MEMBERS, CREATORS, CONTENT_ITEMS } from "@/lib/seed-data";

export default async function MemberProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = MEMBERS.find(m => m.id === id);
  if (!member) notFound();

  // Simulate benches: each member "follows" some creators based on their topics
  const followedCreators = CREATORS.filter(c =>
    c.topics.some(t => (member.topics as readonly string[]).includes(t))
  );

  // Simulate a personal bench matching member topics
  const BENCH_NAMES = ["Morning Read", "Design + Home", "Wellness", "Bookmarked"];
  const memberBenches = BENCH_NAMES.slice(0, Math.min(member.benchCount, 4)).map((name, i) => ({
    name,
    count: Math.floor(Math.random() * 8) + 2,
    public: i < 2,
  }));

  // Content they'd see
  const relevantContent = CONTENT_ITEMS.filter(item =>
    item.topics.some(t => (member.topics as readonly string[]).includes(t))
  );

  return (
    <>
      <AppNav />
      <main className="max-w-[860px] mx-auto px-6 py-12">
        {/* Profile header */}
        <div className="flex items-start gap-8 mb-10">
          {/* Avatar */}
          <div
            className="w-[88px] h-[88px] rounded-full flex-shrink-0 flex items-center justify-center text-[28px] font-bold text-white"
            style={{ background: member.avatarColor }}
          >
            {member.initials}
          </div>

          {/* Info */}
          <div className="flex-1 pt-1">
            <h1 className="font-serif text-[32px] font-normal text-nearblack tracking-[-0.3px] mb-1">{member.name}</h1>
            <p className="text-[14px] text-gray mb-3">{member.location}</p>
            <div className="flex flex-wrap gap-1.5">
              {member.topics.map(t => (
                <span key={t} className="px-3 py-[5px] bg-lavender/40 border border-[#a8abdc]/40 text-[#5558a0] text-[12px] font-medium rounded-[20px]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 pt-2 flex-shrink-0">
            <div className="text-center">
              <p className="font-serif text-[28px] font-normal text-nearblack leading-none">{member.benchCount}</p>
              <p className="text-[11px] text-gray mt-1 uppercase tracking-[0.8px] font-medium">Benches</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-[28px] font-normal text-nearblack leading-none">{followedCreators.length}</p>
              <p className="text-[11px] text-gray mt-1 uppercase tracking-[0.8px] font-medium">Creators</p>
            </div>
          </div>
        </div>

        <div className="grid gap-10" style={{ gridTemplateColumns: "1fr 280px" }}>
          {/* Left: Benches */}
          <div>
            <h2 className="text-[11px] font-bold tracking-[1.5px] uppercase text-gray mb-4">Benches</h2>
            <div className="space-y-2 mb-8">
              {memberBenches.map(bench => (
                <div key={bench.name} className="flex items-center justify-between py-3 border-b border-lightgray last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[2px] bg-lavender/30 flex items-center justify-center text-[14px]">📚</div>
                    <div>
                      <p className="text-[14px] font-medium text-nearblack">{bench.name}</p>
                      <p className="text-[12px] text-gray">{bench.count} creators</p>
                    </div>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-[20px] font-medium ${
                    bench.public
                      ? "bg-[#e8f5ee] text-[#2d7a4a]"
                      : "bg-[#F5F3EF] text-[#888]"
                  }`}>
                    {bench.public ? "Members can see" : "Private"}
                  </span>
                </div>
              ))}
            </div>

            {/* Followed creators */}
            <h2 className="text-[11px] font-bold tracking-[1.5px] uppercase text-gray mb-4">Creators She Follows</h2>
            <div className="grid grid-cols-3 gap-3">
              {followedCreators.map(c => (
                <Link key={c.id} href={`/creators/${c.id}`}
                  className="flex items-center gap-2.5 p-3 bg-white border border-lightgray rounded-[3px] hover:border-[#bbb] transition-colors">
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-[11px] font-bold text-white"
                    style={{ background: c.avatarColor ?? "linear-gradient(135deg,#CCCEEF,#9095d0)" }}
                  >
                    {c.avatarUrl ? (
                      <img src={c.avatarUrl} alt={c.name} className="w-8 h-8 object-cover object-top" />
                    ) : c.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-nearblack truncate">{c.name.split(" ")[0]}</p>
                    <p className="text-[11px] text-gray truncate">{c.handle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Recent Edition picks */}
          <div>
            <h2 className="text-[11px] font-bold tracking-[1.5px] uppercase text-gray mb-4">From Her Edition</h2>
            <div className="space-y-3">
              {relevantContent.slice(0, 4).map(item => (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 bg-white border border-lightgray rounded-[3px] hover:border-[#bbb] transition-colors group">
                  <div
                    className="w-10 h-10 rounded-[2px] flex-shrink-0 flex items-center justify-center text-[16px]"
                    style={{ background: ("imageColor" in item && item.imageColor) ? item.imageColor as string : "#E5E3DE" }}
                  >
                    {"imageEmoji" in item && item.imageEmoji ? item.imageEmoji : ""}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-nearblack leading-snug group-hover:underline">{item.title}</p>
                    <p className="text-[11px] text-gray mt-0.5">{item.creatorName}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
