"use client";

import { useState } from "react";
import Link from "next/link";
import { CONTENT_ITEMS } from "@/lib/seed-data";

type Item = (typeof CONTENT_ITEMS)[number];

const BENCHES = ["All Benches", "Morning Read", "Design + Home", "Wellness"];

interface Props {
  items: typeof CONTENT_ITEMS;
  hero: Item;
  rest: readonly Item[];
}

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
      style={{ background: "imageColor" in item ? item.imageColor : "#E5E3DE" }}
    >
      {"imageEmoji" in item ? item.imageEmoji : ""}
    </div>
  );
}

export function EditionClient({ items, hero, rest }: Props) {
  const [activeBench, setActiveBench] = useState("All Benches");

  return (
    <>
      {/* Bench filter nav */}
      <div className="px-14 py-4 border-b border-lightgray bg-white flex items-center gap-3">
        {BENCHES.map(b => (
          <button
            key={b}
            onClick={() => setActiveBench(b)}
            className={`text-[11px] font-bold tracking-[0.8px] uppercase px-3.5 py-1.5 rounded-[20px] border transition-all cursor-pointer ${
              activeBench === b
                ? "bg-nearblack border-nearblack text-white"
                : "bg-white border-lightgray text-gray hover:border-nearblack hover:text-nearblack"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Edition grid: hero (left, 7fr) + 2 stacked right (5fr) */}
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
          <div className="flex items-center gap-5 pt-4 border-t border-lightgray mt-auto">
            <button className="flex items-center gap-1.5 text-[12px] text-red font-semibold tracking-[0.3px]">
              <span className="text-[15px]">♥</span> {hero.likes}
            </button>
            <button className="flex items-center gap-1.5 text-[12px] text-gray font-semibold tracking-[0.3px] hover:text-nearblack">
              <span className="text-[15px]">💬</span> {hero.comments}
            </button>
            <button className="flex items-center gap-1.5 text-[12px] text-gray font-semibold tracking-[0.3px] hover:text-nearblack">
              <span className="text-[15px]">↗</span> Share
            </button>
            <Link
              href={hero.url}
              target="_blank"
              className="ml-auto text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack border-b-[1.5px] border-nearblack pb-px hover:opacity-60 transition-opacity"
            >
              Read on {hero.creatorName.split(" ")[0]}&apos;s site →
            </Link>
          </div>
        </div>

        {/* Smaller cards */}
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
            <div className="flex items-center gap-5 pt-4 border-t border-lightgray mt-auto">
              <button className="flex items-center gap-1.5 text-[12px] text-gray font-semibold tracking-[0.3px] hover:text-nearblack">
                <span className="text-[15px]">♥</span> {item.likes}
              </button>
              <button className="flex items-center gap-1.5 text-[12px] text-gray font-semibold tracking-[0.3px] hover:text-nearblack">
                <span className="text-[15px]">💬</span> {item.comments}
              </button>
              <Link
                href={item.url}
                target="_blank"
                className="ml-auto text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack border-b-[1.5px] border-nearblack pb-px hover:opacity-60 transition-opacity"
              >
                Read →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Remaining items */}
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
              <div className="flex items-center gap-5 pt-4 border-t border-lightgray mt-auto">
                <button className="flex items-center gap-1.5 text-[12px] text-gray font-semibold hover:text-nearblack">
                  <span>♥</span> {item.likes}
                </button>
                <button className="flex items-center gap-1.5 text-[12px] text-gray font-semibold hover:text-nearblack">
                  <span>💬</span> {item.comments}
                </button>
                <Link
                  href={item.url}
                  target="_blank"
                  className="ml-auto text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack border-b-[1.5px] border-nearblack pb-px hover:opacity-60 transition-opacity"
                >
                  Read →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
