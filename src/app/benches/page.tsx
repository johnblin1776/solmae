"use client";

import { useState } from "react";
import Link from "next/link";
import { AppNav } from "@/components/nav/app-nav";
import { useBenches } from "@/lib/bench-context";
import { CREATORS } from "@/lib/seed-data";

export default function BenchesPage() {
  const { benches, addBench, toggleVisibility, deleteBench } = useBenches();
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  function handleCreate() {
    const n = newName.trim();
    if (!n) return;
    addBench(n);
    setNewName("");
    setCreating(false);
  }

  return (
    <>
      <AppNav />
      <div className="max-w-[860px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] font-bold tracking-[2px] uppercase text-salmon mb-1.5">Your collection</p>
            <h1 className="font-serif text-[40px] font-normal text-nearblack tracking-[-0.5px]">My Benches</h1>
            <p className="text-[14px] text-gray mt-2 leading-[1.7]">
              Group the creators you follow into benches — then filter your Edition to see only what matters today.
            </p>
          </div>
          <button
            onClick={() => setCreating(true)}
            className="px-5 py-2.5 bg-nearblack text-white text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#333] transition-colors cursor-pointer flex-shrink-0"
          >
            + New Bench
          </button>
        </div>

        {/* New bench input */}
        {creating && (
          <div className="bg-white border-[1.5px] border-nearblack rounded-[3px] p-5 mb-5 flex items-center gap-3">
            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleCreate(); if (e.key === "Escape") setCreating(false); }}
              placeholder="Bench name…"
              className="flex-1 text-[15px] outline-none text-nearblack placeholder:text-[#bbb]"
            />
            <button onClick={handleCreate} disabled={!newName.trim()}
              className="px-4 py-2 bg-nearblack text-white text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#333] disabled:opacity-40 cursor-pointer transition-colors">
              Create
            </button>
            <button onClick={() => setCreating(false)}
              className="px-4 py-2 border border-lightgray text-gray text-[11px] font-bold uppercase rounded-[2px] hover:border-nearblack transition-colors cursor-pointer">
              Cancel
            </button>
          </div>
        )}

        {/* Bench grid */}
        {benches.length === 0 && !creating && (
          <div className="text-center py-20">
            <p className="text-[48px] mb-4">📚</p>
            <p className="font-serif text-[24px] text-nearblack mb-2">No benches yet.</p>
            <p className="text-[14px] text-gray max-w-[320px] mx-auto">
              Create a bench, then add creators to it from their profile or the Creators directory.
            </p>
          </div>
        )}

        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {benches.map(bench => {
            const creatorsOnBench = CREATORS.filter(c => bench.creatorIds.includes(c.id));
            return (
              <div key={bench.id} className="group bg-white border border-lightgray rounded-[3px] overflow-hidden hover:border-[#bbb] transition-colors">
                {/* Creator avatar strip */}
                <Link href={`/benches/${bench.id}`} className="block">
                  <div className="h-[88px] bg-[#F5F3EF] flex items-center px-5 gap-2">
                    {creatorsOnBench.length === 0 ? (
                      <div className="w-full flex items-center justify-center">
                        <span className="text-[11px] text-gray uppercase tracking-[1px] font-medium">Empty bench</span>
                      </div>
                    ) : (
                      <>
                        {creatorsOnBench.slice(0, 5).map((c, i) => (
                          <div
                            key={c.id}
                            className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 overflow-hidden flex items-center justify-center text-[12px] font-bold text-white"
                            style={{
                              background: c.avatarColor ?? "linear-gradient(135deg,#CCCEEF,#9095d0)",
                              marginLeft: i > 0 ? "-8px" : "0",
                              zIndex: 10 - i,
                              position: "relative",
                            }}
                          >
                            {c.avatarUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={c.avatarUrl} alt={c.name} className="w-10 h-10 object-cover object-top" />
                            ) : c.initials}
                          </div>
                        ))}
                        {creatorsOnBench.length > 5 && (
                          <span className="text-[11px] text-gray ml-1">+{creatorsOnBench.length - 5}</span>
                        )}
                      </>
                    )}
                  </div>

                  <div className="px-5 pt-4 pb-3">
                    <h2 className="font-serif text-[20px] font-normal text-nearblack mb-0.5">{bench.name}</h2>
                    <p className="text-[12px] text-gray">
                      {bench.creatorIds.length} creator{bench.creatorIds.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </Link>

                {/* Actions */}
                <div className="px-5 pb-4 flex items-center gap-3 border-t border-lightgray pt-3">
                  <button
                    onClick={() => toggleVisibility(bench.id)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                      bench.visibility === "members"
                        ? "bg-[#e8f5ee] text-[#2d7a4a] hover:bg-[#d0eeda]"
                        : "bg-[#F5F3EF] text-[#888] hover:bg-[#eeece8]"
                    }`}
                  >
                    {bench.visibility === "members" ? "✓ Members can see" : "Private"}
                  </button>
                  <button
                    onClick={() => deleteBench(bench.id)}
                    className="ml-auto text-[11px] text-[#ccc] hover:text-red-500 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
