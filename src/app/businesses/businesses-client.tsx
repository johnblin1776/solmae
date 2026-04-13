"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BUSINESSES, BIZ_CATEGORIES } from "@/lib/seed-data";

type Business = (typeof BUSINESSES)[number];

interface Props {
  businesses: typeof BUSINESSES;
}

export function BusinessesClient({ businesses }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return businesses.filter(b => {
      const matchesQuery = !q || [
        b.name, b.ownerName, b.location, b.tagline, b.description,
        ...b.categories,
      ].some(s => s.toLowerCase().includes(q));

      const matchesCat = activeCategory === "All" ||
        b.categories.some(c => c === activeCategory);

      return matchesQuery && matchesCat;
    });
  }, [businesses, query, activeCategory]);

  return (
    <div className="px-14 py-10">
      {/* Search + filter */}
      <div className="flex items-start gap-6 mb-8">
        {/* Search */}
        <div className="relative flex-shrink-0 w-[300px]">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, location, keyword…"
            className="w-full pl-9 pr-3 py-2.5 border-[1.5px] border-lightgray rounded-[2px] text-[14px] outline-none focus:border-nearblack transition-colors"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5">
          {["All", ...BIZ_CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-[20px] border text-[12px] font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-nearblack border-nearblack text-white"
                  : "bg-white border-lightgray text-gray hover:border-nearblack hover:text-nearblack"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      {(query || activeCategory !== "All") && (
        <p className="text-[12px] text-gray mb-5">
          {filtered.length} {filtered.length === 1 ? "business" : "businesses"}
          {activeCategory !== "All" && <> in <strong className="text-nearblack">{activeCategory}</strong></>}
          {query && <> matching &ldquo;<strong className="text-nearblack">{query}</strong>&rdquo;</>}
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[32px] mb-3">🔍</p>
          <p className="font-serif text-[22px] text-nearblack mb-2">No results.</p>
          <p className="text-[13px] text-gray">Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {filtered.map(biz => (
            <BusinessCard key={biz.id} biz={biz} />
          ))}
        </div>
      )}
    </div>
  );
}

function BusinessCard({ biz }: { biz: Business }) {
  return (
    <Link
      href={`/businesses/${biz.id}`}
      className="group bg-white border border-lightgray rounded-[3px] overflow-hidden hover:border-[#bbb] hover:shadow-sm transition-all block"
    >
      {/* Key image */}
      <div className="aspect-[4/3] overflow-hidden">
        {biz.keyImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={biz.keyImage}
            alt={biz.name}
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-[48px]"
            style={{ background: biz.keyColor ?? "#E5E3DE" }}
          >
            {biz.keyEmoji ?? ""}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        {/* Category badges */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {biz.categories.slice(0, 2).map(cat => (
            <span key={cat} className="px-2 py-0.5 bg-lavender/30 text-[#5558a0] text-[10px] font-semibold rounded-[2px] tracking-[0.3px]">
              {cat}
            </span>
          ))}
        </div>

        <h2 className="font-serif text-[19px] font-normal text-nearblack leading-snug mb-0.5 group-hover:underline decoration-[1.5px] underline-offset-2">
          {biz.name}
        </h2>

        <p className="text-[12px] text-gray mb-2">{biz.location}</p>

        <p className="text-[13px] text-[#555] leading-[1.5] line-clamp-2">{biz.tagline}</p>

        {/* Owner chip */}
        <div className="mt-3.5 pt-3.5 border-t border-lightgray flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-lavender/50 flex items-center justify-center text-[9px] font-bold text-[#5558a0]">
            {biz.ownerName.charAt(0)}
          </div>
          <p className="text-[11px] text-gray">{biz.ownerName}</p>
        </div>
      </div>
    </Link>
  );
}
