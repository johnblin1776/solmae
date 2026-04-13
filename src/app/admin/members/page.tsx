import { MEMBERS } from "@/lib/seed-data";

export default function AdminMembersPage() {
  return (
    <div className="px-10 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#888] mb-1">Admin</p>
        <h1 className="font-serif text-[36px] font-normal text-nearblack tracking-[-0.3px]">Members</h1>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Members",    value: MEMBERS.length },
          { label: "Active This Week", value: 8 },
          { label: "Invite Codes Used", value: 10 },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-[#E5E3DE] rounded-[3px] px-6 py-4">
            <p className="font-serif text-[32px] font-normal text-nearblack leading-none mb-1">{value}</p>
            <p className="text-[12px] text-[#888]">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E3DE] rounded-[3px]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E3DE]">
              {["Member", "Location", "Topics", "Benches", "Joined Via", "Actions"].map(h => (
                <th key={h} className="text-left text-[10px] font-bold tracking-[1px] uppercase text-[#888] px-6 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MEMBERS.map((m, i) => (
              <tr key={m.id} className="border-b border-[#E5E3DE] last:border-0 hover:bg-[#fafaf8] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                      style={{ background: m.avatarColor }}
                    >
                      {m.initials}
                    </div>
                    <p className="text-[13px] font-medium text-nearblack">{m.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-[13px] text-[#888]">{m.location}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {m.topics.slice(0, 2).map(t => (
                      <span key={t} className="px-2 py-0.5 bg-[#CCCEEF]/30 text-[#5558a0] text-[11px] rounded-[2px] font-medium">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-[13px] text-[#555]">{m.benchCount}</td>
                <td className="px-6 py-4 text-[12px] text-[#888]">
                  {["JEN2026", "LAUREN2026", "SOLMAE"][i % 3]}
                </td>
                <td className="px-6 py-4">
                  <button className="px-3 py-1.5 border border-[#E5E3DE] text-[#888] text-[11px] font-medium rounded-[2px] hover:border-red-300 hover:text-red-600 transition-colors cursor-pointer">
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
