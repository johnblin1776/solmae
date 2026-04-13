"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { AppNav } from "@/components/nav/app-nav";
import { useBenches } from "@/lib/bench-context";
import { CREATORS, CONTENT_ITEMS } from "@/lib/seed-data";
import { AddToBenchButton } from "@/components/bench/add-to-bench-button";

export default function BenchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { benches, removeCreatorFromBench, toggleVisibility } = useBenches();
  const bench = benches.find(b => b.id === id);

  if (!bench) notFound();

  const creatorsOnBench = CREATORS.filter(c => bench.creatorIds.includes(c.id));

  // Get latest content from bench creators
  const benchContent = CONTENT_ITEMS.filter(item =>
    bench.creatorIds.includes(item.creatorId)
  );

  return (
    <>
      <AppNav />
      <div className="max-w-[900px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <Link href="/benches" className="text-[11px] text-gray hover:text-nearblack transition-colors mb-3 block">
              ← All Benches
            </Link>
            <h1 className="font-serif text-[40px] font-normal text-nearblack tracking-[-0.5px]">{bench.name}</h1>
            <p className="text-[13px] text-gray mt-1">
              {bench.creatorIds.length} creator{bench.creatorIds.length !== 1 ? "s" : ""} · {benchContent.length} stories
            </p>
          </div>
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={() => toggleVisibility(bench.id)}
              className={`text-[11px] font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-colors ${
                bench.visibility === "members"
                  ? "bg-[#e8f5ee] text-[#2d7a4a] hover:bg-[#d0eeda]"
                  : "bg-[#F5F3EF] text-[#888] hover:bg-[#eeece8]"
              }`}
            >
              {bench.visibility === "members" ? "✓ Members can see" : "Private"}
            </button>
            <Link
              href="/creators"
              className="px-4 py-2 bg-nearblack text-white text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#333] transition-colors"
            >
              + Add Creators
            </Link>
          </div>
        </div>

        {/* Bench description */}
        {bench.description && (
          <p className="text-[14px] text-gray mb-10 leading-[1.7]">{bench.description}</p>
        )}

        {/* Creators on bench */}
        <div className="mb-12">
          <h2 className="text-[11px] font-bold tracking-[1.5px] uppercase text-gray mb-4">Creators</h2>

          {creatorsOnBench.length === 0 ? (
            <div className="bg-[#F5F3EF] rounded-[3px] px-6 py-10 text-center">
              <p className="text-[14px] text-gray mb-3">This bench is empty.</p>
              <Link href="/creators" className="text-[13px] font-semibold text-nearblack underline underline-offset-2">
                Browse Creators →
              </Link>
            </div>
          ) : (
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
              {creatorsOnBench.map(c => (
                <div key={c.id} className="bg-white border border-lightgray rounded-[3px] p-4 flex items-center gap-3 hover:border-[#bbb] transition-colors">
                  <Link href={`/creators/${c.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-[12px] font-bold text-white"
                      style={{ background: c.avatarColor ?? "linear-gradient(135deg,#CCCEEF,#9095d0)" }}
                    >
                      {c.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.avatarUrl} alt={c.name} className="w-10 h-10 object-cover object-top" />
                      ) : c.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-nearblack truncate">{c.name}</p>
                      <p className="text-[11px] text-gray">{c.handle}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => removeCreatorFromBench(bench.id, c.id)}
                    title="Remove from bench"
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#ccc] hover:text-red-500 transition-colors cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content from bench creators */}
        {benchContent.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold tracking-[1.5px] uppercase text-gray mb-4">Recent from this Bench</h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
              {benchContent.map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-lightgray rounded-[3px] overflow-hidden hover:border-[#bbb] transition-colors group"
                >
                  {/* Thumb */}
                  {"imageUrl" in item && item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.imageUrl} alt={item.title} className="w-full aspect-video object-cover" />
                  ) : (
                    <div
                      className="w-full aspect-video flex items-center justify-center text-3xl"
                      style={{ background: ("imageColor" in item ? item.imageColor : "#E5E3DE") as string }}
                    >
                      {"imageEmoji" in item ? item.imageEmoji : ""}
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-[10px] font-bold tracking-[1.2px] uppercase text-gray mb-1.5">{item.creatorName}</p>
                    <p className="text-[14px] font-medium text-nearblack leading-snug group-hover:underline">{item.title}</p>
                    <p className="text-[12px] text-gray mt-2">{item.date}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
