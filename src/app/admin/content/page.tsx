"use client";

import { useState } from "react";
import { CONTENT_ITEMS } from "@/lib/seed-data";

type Status = "pending" | "published" | "rejected";

type QueueItem = {
  id: string;
  title: string;
  creatorName: string;
  format: string;
  date: string;
  imageEmoji?: string;
  imageColor?: string;
  status: Status;
  frontPage: boolean;
};

// Build a mutable queue from seed data
const INITIAL_QUEUE: QueueItem[] = CONTENT_ITEMS.map((item, i) => ({
  id: item.id,
  title: item.title,
  creatorName: item.creatorName,
  format: item.format,
  date: item.date,
  imageEmoji: "imageEmoji" in item ? (item.imageEmoji as string) : undefined,
  imageColor: "imageColor" in item ? (item.imageColor as string) : undefined,
  status: i < 5 ? "published" : "pending",
  frontPage: i === 0,
}));

const STATUS_TABS: { key: Status | "all"; label: string }[] = [
  { key: "all",       label: "All"       },
  { key: "pending",   label: "Pending"   },
  { key: "published", label: "Published" },
  { key: "rejected",  label: "Rejected"  },
];

export default function AdminContentPage() {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [tab, setTab] = useState<Status | "all">("pending");

  function setStatus(id: string, status: Status) {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  }

  function toggleFrontPage(id: string) {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, frontPage: !item.frontPage } : item));
  }

  const filtered = tab === "all" ? queue : queue.filter(i => i.status === tab);
  const counts = {
    all:       queue.length,
    pending:   queue.filter(i => i.status === "pending").length,
    published: queue.filter(i => i.status === "published").length,
    rejected:  queue.filter(i => i.status === "rejected").length,
  };

  return (
    <div className="px-10 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#888] mb-1">Admin</p>
        <h1 className="font-serif text-[36px] font-normal text-nearblack tracking-[-0.3px]">Content Queue</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        {STATUS_TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-1.5 rounded-[20px] text-[12px] font-medium transition-colors cursor-pointer ${
              tab === key
                ? "bg-nearblack text-white"
                : "bg-white border border-[#E5E3DE] text-[#888] hover:border-[#bbb] hover:text-nearblack"
            }`}
          >
            {label}
            <span className={`ml-1.5 text-[10px] font-bold ${tab === key ? "text-white/70" : "text-[#bbb]"}`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E3DE] rounded-[3px]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E3DE]">
              {["", "Story", "Creator", "Format", "Date", "Front Page", "Status", "Actions"].map((h, i) => (
                <th key={i} className="text-left text-[10px] font-bold tracking-[1px] uppercase text-[#888] px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-6 py-10 text-center text-[13px] text-[#888]">No items in this queue.</td></tr>
            )}
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-[#E5E3DE] last:border-0 hover:bg-[#fafaf8] transition-colors">
                {/* Thumbnail */}
                <td className="px-4 py-3 w-14">
                  <div
                    className="w-10 h-10 rounded-[2px] flex items-center justify-center text-[18px] flex-shrink-0"
                    style={{ background: item.imageColor ?? "#E5E3DE" }}
                  >
                    {item.imageEmoji ?? ""}
                  </div>
                </td>

                {/* Title */}
                <td className="px-4 py-3 max-w-[220px]">
                  <p className="text-[13px] font-medium text-nearblack leading-snug">{item.title}</p>
                </td>

                {/* Creator */}
                <td className="px-4 py-3 text-[13px] text-[#555] whitespace-nowrap">{item.creatorName}</td>

                {/* Format badge */}
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-[#F5F3EF] border border-[#E5E3DE] rounded-[2px] text-[11px] font-medium text-[#555] whitespace-nowrap">
                    {item.format}
                  </span>
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-[12px] text-[#888] whitespace-nowrap">{item.date}</td>

                {/* Front Page toggle */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleFrontPage(item.id)}
                    title={item.frontPage ? "Remove from front page" : "Feature on front page"}
                    className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer ${
                      item.frontPage ? "bg-[#FE9D94]" : "bg-[#E5E3DE]"
                    }`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                      item.frontPage ? "left-[18px]" : "left-0.5"
                    }`} />
                  </button>
                </td>

                {/* Status badge */}
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-[20px] text-[11px] font-semibold capitalize ${
                    item.status === "published" ? "bg-[#e8f5ee] text-[#2d7a4a]" :
                    item.status === "rejected"  ? "bg-[#fde8e8] text-[#c04040]" :
                    "bg-[#FFF8E6] text-[#a06020]"
                  }`}>
                    {item.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  {item.status === "pending" && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setStatus(item.id, "published")}
                        className="px-3 py-1.5 bg-nearblack text-white text-[11px] font-bold rounded-[2px] hover:bg-[#333] transition-colors cursor-pointer"
                      >
                        Publish
                      </button>
                      <button
                        onClick={() => setStatus(item.id, "rejected")}
                        className="px-3 py-1.5 border border-[#E5E3DE] text-[#888] text-[11px] font-medium rounded-[2px] hover:border-[#ccc] hover:text-nearblack transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {item.status === "published" && (
                    <button
                      onClick={() => setStatus(item.id, "rejected")}
                      className="px-3 py-1.5 border border-[#E5E3DE] text-[#888] text-[11px] font-medium rounded-[2px] hover:border-red-300 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      Unpublish
                    </button>
                  )}
                  {item.status === "rejected" && (
                    <button
                      onClick={() => setStatus(item.id, "pending")}
                      className="px-3 py-1.5 border border-[#E5E3DE] text-[#888] text-[11px] font-medium rounded-[2px] hover:border-[#ccc] hover:text-nearblack transition-colors cursor-pointer"
                    >
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
