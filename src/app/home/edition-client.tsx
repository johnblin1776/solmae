"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTENT_ITEMS } from "@/lib/seed-data";
import { useBenches } from "@/lib/bench-context";

type Item = (typeof CONTENT_ITEMS)[number];

function ItemThumb({ item, hero = false }: { item: Item; hero?: boolean }) {
  if ("imageUrl" in item && item.imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.imageUrl}
        alt={item.title}
        className={`w-full object-cover rounded-[2px] ${hero ? "aspect-[4/3]" : "aspect-video"}`}
      />
    );
  }
  return (
    <div
      className={`w-full rounded-[2px] flex items-center justify-center text-4xl ${hero ? "aspect-[4/3]" : "aspect-video"}`}
      style={{ background: "imageColor" in item ? (item.imageColor as string) : "#E5E3DE" }}
    >
      {"imageEmoji" in item ? item.imageEmoji : ""}
    </div>
  );
}

function ActionRow({ item, hero = false }: { item: Item; hero?: boolean }) {
  return (
    <div className="flex items-center gap-5 pt-4 border-t border-lightgray mt-auto">
      <button className={`flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.3px] ${hero ? "text-red" : "text-gray hover:text-nearblack"}`}>
        <span className="text-[15px]">♥</span> {item.likes}
      </button>
      <button className="flex items-center gap-1.5 text-[12px] text-gray font-semibold tracking-[0.3px] hover:text-nearblack">
        <span className="text-[15px]">💬</span> {item.comments}
      </button>
      {hero && (
        <button className="flex items-center gap-1.5 text-[12px] text-gray font-semibold tracking-[0.3px] hover:text-nearblack">
          <span className="text-[15px]">↗</span> Share
        </button>
      )}
      <Link
        href={item.url}
        target="_blank"
        className="ml-auto text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack border-b-[1.5px] border-nearblack pb-px hover:opacity-60 transition-opacity"
      >
        {hero ? `Read on ${item.creatorName.split(" ")[0]}'s site →` : "Read →"}
      </Link>
    </div>
  );
}

interface Props {
  allItems: typeof CONTENT_ITEMS;
}

export function EditionClient({ allItems }: Props) {
  const { benches } = useBenches();
  const [activeBenchId, setActiveBenchId] = useState<"all" | string>("all");

  // Filter items by active bench
  const activeBench = benches.find(b => b.id === activeBenchId);
  const filtered = activeBench
    ? allItems.filter(item => activeBench.creatorIds.includes(item.creatorId))
    : allItems;

  const [hero, ...rest] = filtered;

  return (
    <>
      {/* Bench filter nav */}
      <div className="px-14 py-4 border-b border-lightgray bg-white flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setActiveBenchId("all")}
          className={`text-[11px] font-bold tracking-[0.8px] uppercase px-3.5 py-1.5 rounded-[20px] border transition-all cursor-pointer ${
            activeBenchId === "all"
              ? "bg-nearblack border-nearblack text-white"
              : "bg-white border-lightgray text-gray hover:border-nearblack hover:text-nearblack"
          }`}
        >
          All Benches
        </button>
        {benches.map(b => (
          <button
            key={b.id}
            onClick={() => setActiveBenchId(b.id)}
            className={`text-[11px] font-bold tracking-[0.8px] uppercase px-3.5 py-1.5 rounded-[20px] border transition-all cursor-pointer ${
              activeBenchId === b.id
                ? "bg-nearblack border-nearblack text-white"
                : "bg-white border-lightgray text-gray hover:border-nearblack hover:text-nearblack"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center px-6">
          <p className="text-[32px] mb-4">📚</p>
          <p className="font-serif text-[22px] text-nearblack mb-2">Nothing here yet.</p>
          <p className="text-[14px] text-gray max-w-[320px]">
            Add creators to your <strong className="text-nearblack">{activeBench?.name}</strong> bench and their content will appear here.
          </p>
        </div>
      )}

      {/* Edition grid: hero (left, 7fr) + 2 stacked right (5fr) */}
      {filtered.length > 0 && (
        <>
          <div
            className="grid gap-px bg-lightgray"
            style={{ gridTemplateColumns: "7fr 5fr", gridTemplateRows: "auto auto" }}
          >
            {/* Hero card */}
            <div className="bg-white p-9 flex flex-col" style={{ gridRow: "1 / 3" }}>
              <ItemThumb item={hero} hero />
              <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray mb-2.5 flex items-center gap-2">
                {hero.creatorName}
                <span className="w-[3px] h-[3px] rounded-full bg-salmon inline-block" />
                {hero.topics[0]}
              </p>
              <h2 className="font-serif text-[28px] font-normal text-nearblack leading-[1.25] tracking-[-0.3px] mb-3.5 flex-1">
                {hero.title}
              </h2>
              <p className="text-[14px] text-gray leading-[1.8] mb-5">{hero.description}</p>
              <ActionRow item={hero} hero />
            </div>

            {/* Smaller right cards */}
            {rest.slice(0, 2).map(item => (
              <div key={item.id} className="bg-white p-9 flex flex-col">
                <ItemThumb item={item} />
                <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray mb-2 mt-5 flex items-center gap-2">
                  {item.creatorName}
                  <span className="w-[3px] h-[3px] rounded-full bg-salmon inline-block" />
                  {item.topics[0]}
                </p>
                <h3 className="font-serif text-[20px] font-normal text-nearblack leading-[1.3] tracking-[-0.2px] mb-2.5 flex-1">
                  {item.title}
                </h3>
                <ActionRow item={item} />
              </div>
            ))}
          </div>

          {/* Remaining items: 3-col grid */}
          {rest.length > 2 && (
            <div className="grid gap-px bg-lightgray" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {rest.slice(2).map(item => (
                <div key={item.id} className="bg-white p-9 flex flex-col">
                  <ItemThumb item={item} />
                  <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray mb-2 mt-5 flex items-center gap-2">
                    {item.creatorName}
                    <span className="w-[3px] h-[3px] rounded-full bg-salmon inline-block" />
                    {item.topics[0]}
                  </p>
                  <h3 className="font-serif text-[20px] font-normal text-nearblack leading-[1.3] mb-2.5 flex-1">
                    {item.title}
                  </h3>
                  <ActionRow item={item} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
