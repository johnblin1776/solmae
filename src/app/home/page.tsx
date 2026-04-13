import Link from "next/link";
import { AppNav } from "@/components/nav/app-nav";
import { CONTENT_ITEMS } from "@/lib/seed-data";
import { EditionClient } from "./edition-client";

export default function EditionPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  const [hero, ...rest] = CONTENT_ITEMS;

  return (
    <>
      <AppNav />

      {/* Edition header */}
      <div className="px-14 pt-11 pb-9 border-b border-lightgray flex items-end justify-between bg-white">
        <div>
          <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-salmon mb-1.5">
            Your Daily Edition
          </p>
          <h1 className="font-serif text-[56px] font-normal text-nearblack leading-none tracking-[-2px]">
            The Edition
          </h1>
        </div>
        <div className="text-right">
          <p className="text-[13px] text-gray mb-1">{today}</p>
          <p className="text-[12px] text-gray">{CONTENT_ITEMS.length} stories from your Bench</p>
        </div>
      </div>

      {/* Bench filter tabs */}
      <EditionClient items={CONTENT_ITEMS} hero={hero} rest={rest} />
    </>
  );
}
