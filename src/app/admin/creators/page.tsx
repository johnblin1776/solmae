"use client";

import { useState } from "react";
import { CREATORS } from "@/lib/seed-data";

type AppStatus = "pending" | "approved" | "rejected";

const APPLICATIONS = [
  {
    id: "app-1",
    name: "Morgan Fitch",
    handle: "@morganfitch",
    email: "morgan@example.com",
    topics: ["Wellness", "Fitness"],
    bio: "Certified holistic health coach helping women over 35 reclaim their energy. 6 years coaching, 18K newsletter subscribers.",
    followers: "18K",
    submitted: "Apr 11, 2026",
    status: "pending" as AppStatus,
  },
  {
    id: "app-2",
    name: "Dana Bellows",
    handle: "@danabellows",
    email: "dana@example.com",
    topics: ["Interior", "Design"],
    bio: "NYC interior designer with a focus on renovating pre-war apartments. Featured in Architectural Digest.",
    followers: "42K",
    submitted: "Apr 10, 2026",
    status: "pending" as AppStatus,
  },
];

export default function AdminCreatorsPage() {
  const [apps, setApps] = useState(APPLICATIONS);
  const [tab, setTab] = useState<"applications" | "active">("applications");

  function updateApp(id: string, status: AppStatus) {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }

  const pending = apps.filter(a => a.status === "pending");
  const decided = apps.filter(a => a.status !== "pending");

  return (
    <div className="px-10 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#888] mb-1">Admin</p>
        <h1 className="font-serif text-[36px] font-normal text-nearblack tracking-[-0.3px]">Creators</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        {(["applications", "active"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-[20px] text-[12px] font-medium transition-colors cursor-pointer capitalize ${
              tab === t
                ? "bg-nearblack text-white"
                : "bg-white border border-[#E5E3DE] text-[#888] hover:border-[#bbb] hover:text-nearblack"
            }`}
          >
            {t === "applications" ? "Applications" : "Active Creators"}
            <span className={`ml-1.5 text-[10px] font-bold ${tab === t ? "text-white/70" : "text-[#bbb]"}`}>
              {t === "applications" ? apps.length : CREATORS.length}
            </span>
          </button>
        ))}
      </div>

      {/* Applications tab */}
      {tab === "applications" && (
        <div className="space-y-4">
          {pending.length > 0 && (
            <div>
              <p className="text-[11px] font-bold tracking-[1px] uppercase text-[#888] mb-3">Pending Review</p>
              {pending.map(app => (
                <ApplicationCard key={app.id} app={app} onUpdate={updateApp} />
              ))}
            </div>
          )}
          {decided.length > 0 && (
            <div>
              <p className="text-[11px] font-bold tracking-[1px] uppercase text-[#888] mb-3 mt-6">Decided</p>
              {decided.map(app => (
                <ApplicationCard key={app.id} app={app} onUpdate={updateApp} />
              ))}
            </div>
          )}
          {apps.length === 0 && (
            <div className="bg-white border border-[#E5E3DE] rounded-[3px] px-6 py-10 text-center text-[13px] text-[#888]">
              No applications yet.
            </div>
          )}
        </div>
      )}

      {/* Active creators tab */}
      {tab === "active" && (
        <div className="bg-white border border-[#E5E3DE] rounded-[3px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E3DE]">
                {["Creator", "Handle", "Topics", "Posts", "Followers", "Actions"].map(h => (
                  <th key={h} className="text-left text-[10px] font-bold tracking-[1px] uppercase text-[#888] px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CREATORS.map(c => (
                <tr key={c.id} className="border-b border-[#E5E3DE] last:border-0 hover:bg-[#fafaf8] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
                        style={{ background: c.avatarColor ?? "linear-gradient(135deg,#CCCEEF,#9095d0)" }}
                      >
                        {c.avatarUrl ? (
                          <img src={c.avatarUrl} alt={c.name} className="w-9 h-9 rounded-full object-cover object-top" />
                        ) : c.initials}
                      </div>
                      <p className="text-[13px] font-medium text-nearblack">{c.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#888]">{c.handle}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {c.topics.slice(0, 2).map(t => (
                        <span key={t} className="px-2 py-0.5 bg-[#CCCEEF]/30 text-[#5558a0] text-[11px] rounded-[2px] font-medium">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[#555]">{c.postCount}</td>
                  <td className="px-6 py-4 text-[13px] text-[#555]">{c.followers}</td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1.5 border border-[#E5E3DE] text-[#888] text-[11px] font-medium rounded-[2px] hover:border-red-300 hover:text-red-600 transition-colors cursor-pointer">
                      Suspend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ApplicationCard({
  app,
  onUpdate,
}: {
  app: (typeof APPLICATIONS)[number] & { status: AppStatus };
  onUpdate: (id: string, s: AppStatus) => void;
}) {
  return (
    <div className="bg-white border border-[#E5E3DE] rounded-[3px] p-6 mb-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[15px] font-semibold text-nearblack">{app.name}</p>
            <span className="text-[12px] text-[#888]">{app.handle}</span>
            {app.status !== "pending" && (
              <span className={`px-2 py-0.5 rounded-[20px] text-[11px] font-semibold capitalize ${
                app.status === "approved" ? "bg-[#e8f5ee] text-[#2d7a4a]" : "bg-[#fde8e8] text-[#c04040]"
              }`}>
                {app.status}
              </span>
            )}
          </div>
          <p className="text-[13px] text-[#555] leading-[1.6] mb-3">{app.bio}</p>
          <div className="flex items-center gap-4 text-[12px] text-[#888]">
            <span>{app.followers} followers</span>
            <span>·</span>
            <span>{app.email}</span>
            <span>·</span>
            <span>Submitted {app.submitted}</span>
            <span>·</span>
            <div className="flex gap-1.5">
              {app.topics.map(t => (
                <span key={t} className="px-1.5 py-0.5 bg-[#CCCEEF]/30 text-[#5558a0] text-[11px] rounded-[2px] font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {app.status === "pending" && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onUpdate(app.id, "approved")}
              className="px-4 py-2 bg-nearblack text-white text-[11px] font-bold rounded-[2px] hover:bg-[#333] transition-colors cursor-pointer"
            >
              Approve
            </button>
            <button
              onClick={() => onUpdate(app.id, "rejected")}
              className="px-4 py-2 border border-[#E5E3DE] text-[#888] text-[11px] font-medium rounded-[2px] hover:border-red-300 hover:text-red-600 transition-colors cursor-pointer"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
