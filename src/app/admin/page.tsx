import Link from "next/link";
import { CREATORS, CONTENT_ITEMS, MEMBERS } from "@/lib/seed-data";

const STATS = [
  { label: "Pending Content",    value: "3",  sub: "awaiting review",   href: "/admin/content",  accent: "#FE9D94" },
  { label: "Creator Apps",       value: "2",  sub: "new applications",  href: "/admin/creators", accent: "#CCCEEF" },
  { label: "Active Creators",    value: String(CREATORS.length), sub: "on platform", href: "/admin/creators", accent: "#84B59F" },
  { label: "Total Members",      value: String(MEMBERS.length),  sub: "joined",       href: "/admin/members",  accent: "#F7D4A8" },
];

// Simulate a "pending" queue — last 3 content items
const PENDING = CONTENT_ITEMS.slice(5, 8);

export default function AdminDashboardPage() {
  return (
    <div className="px-10 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#888] mb-1">Overview</p>
        <h1 className="font-serif text-[36px] font-normal text-nearblack tracking-[-0.3px]">Dashboard</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {STATS.map(({ label, value, sub, href, accent }) => (
          <Link key={label} href={href} className="block bg-white border border-[#E5E3DE] rounded-[3px] px-6 py-5 hover:border-[#bbb] transition-colors group">
            <div className="w-2 h-2 rounded-full mb-4" style={{ background: accent }} />
            <p className="font-serif text-[40px] font-normal text-nearblack leading-none mb-1">{value}</p>
            <p className="text-[13px] font-semibold text-nearblack mb-0.5">{label}</p>
            <p className="text-[12px] text-[#888]">{sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick queue */}
      <div className="bg-white border border-[#E5E3DE] rounded-[3px]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E3DE]">
          <p className="text-[13px] font-bold text-nearblack tracking-[0.3px]">Content Pending Review</p>
          <Link href="/admin/content" className="text-[12px] text-[#888] hover:text-nearblack transition-colors">
            View all →
          </Link>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E3DE]">
              {["Story", "Creator", "Format", "Date", "Actions"].map(h => (
                <th key={h} className="text-left text-[10px] font-bold tracking-[1px] uppercase text-[#888] px-6 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PENDING.map((item) => (
              <tr key={item.id} className="border-b border-[#E5E3DE] last:border-0 hover:bg-[#fafaf8] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[2px] flex-shrink-0 flex items-center justify-center text-[18px]"
                      style={{ background: ("imageColor" in item && item.imageColor) ? item.imageColor as string : "#E5E3DE" }}>
                      {"imageEmoji" in item && item.imageEmoji ? item.imageEmoji : ""}
                    </div>
                    <p className="text-[13px] font-medium text-nearblack leading-snug max-w-[200px]">{item.title}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-[13px] text-[#555]">{item.creatorName}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-[#F5F3EF] border border-[#E5E3DE] rounded-[2px] text-[11px] font-medium text-[#555]">
                    {item.format}
                  </span>
                </td>
                <td className="px-6 py-4 text-[12px] text-[#888]">{item.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-nearblack text-white text-[11px] font-bold rounded-[2px] hover:bg-[#333] transition-colors cursor-pointer">Publish</button>
                    <button className="px-3 py-1.5 border border-[#E5E3DE] text-[#888] text-[11px] font-medium rounded-[2px] hover:border-[#ccc] hover:text-nearblack transition-colors cursor-pointer">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
