const INGEST_LOG = [
  { id: 1, receivedAt: "Apr 12, 2026 · 9:14am",  from: "nicole@kalejunkie.com",   subject: "New Recipe Post",          url: "https://kalejunkie.com/viral-cadbury-egg-protein-balls/", creator: "Nicole Keshishian", status: "matched",   itemId: "cadbury-protein-balls" },
  { id: 2, receivedAt: "Apr 11, 2026 · 3:22pm",  from: "shira@shiragill.com",     subject: "Skincare Essentials Post", url: "https://shiragill.com/my-favorite-minimalist-makeup-and-skincare-essentials/", creator: "Shira Gill",  status: "matched",   itemId: "minimalist-makeup" },
  { id: 3, receivedAt: "Apr 11, 2026 · 11:05am", from: "amy@geniusmomhacks.com",  subject: "Sunday Reset",             url: "https://geniusmomhacks.com/sunday-reset-routine/", creator: "Amy Motroni", status: "matched",   itemId: "sunday-reset" },
  { id: 4, receivedAt: "Apr 10, 2026 · 2:48pm",  from: "kate@katieogata.com",     subject: "IG Caption Drop",          url: "#", creator: "Kate Ogata",  status: "pending",   itemId: null },
  { id: 5, receivedAt: "Apr 10, 2026 · 8:30am",  from: "unknown@example.com",     subject: "Partnership Pitch",        url: "#", creator: null,          status: "unmatched", itemId: null },
  { id: 6, receivedAt: "Apr 9, 2026 · 5:15pm",   from: "brit@brit.co",            subject: "Podcast Episode 88",       url: "#", creator: "Brit Morin",  status: "matched",   itemId: "10m-business" },
];

const STATUS_COLORS: Record<string, string> = {
  matched:   "bg-[#e8f5ee] text-[#2d7a4a]",
  pending:   "bg-[#FFF8E6] text-[#a06020]",
  unmatched: "bg-[#fde8e8] text-[#c04040]",
};

export default function AdminIngestPage() {
  return (
    <div className="px-10 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#888] mb-1">Admin</p>
        <h1 className="font-serif text-[36px] font-normal text-nearblack tracking-[-0.3px]">Ingest Log</h1>
        <p className="text-[14px] text-[#888] mt-1">Emails parsed and matched to creators via forwarding inbox.</p>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E3DE] rounded-[3px]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E3DE]">
              {["Received", "From", "Subject", "URL parsed", "Creator", "Status"].map(h => (
                <th key={h} className="text-left text-[10px] font-bold tracking-[1px] uppercase text-[#888] px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INGEST_LOG.map(entry => (
              <tr key={entry.id} className="border-b border-[#E5E3DE] last:border-0 hover:bg-[#fafaf8] transition-colors">
                <td className="px-5 py-3.5 text-[12px] text-[#888] whitespace-nowrap">{entry.receivedAt}</td>
                <td className="px-5 py-3.5 text-[12px] text-[#555]">{entry.from}</td>
                <td className="px-5 py-3.5 text-[13px] text-nearblack">{entry.subject}</td>
                <td className="px-5 py-3.5 text-[12px]">
                  {entry.url !== "#" ? (
                    <a href={entry.url} target="_blank" rel="noopener noreferrer"
                      className="text-[#5558a0] underline underline-offset-2 hover:text-nearblack transition-colors truncate max-w-[200px] block">
                      {entry.url.replace("https://", "").substring(0, 40)}…
                    </a>
                  ) : (
                    <span className="text-[#ccc]">—</span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-[13px] text-[#555]">
                  {entry.creator ?? <span className="text-[#ccc]">Unknown</span>}
                </td>
                <td className="px-5 py-3.5">
                  <span className={`px-2 py-0.5 rounded-[20px] text-[11px] font-semibold capitalize ${STATUS_COLORS[entry.status]}`}>
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
