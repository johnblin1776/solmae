"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { FilterBar } from "@/components/filter-bar";
import { CREATORS } from "@/lib/seed-data";
import { AddToBenchButton } from "@/components/bench/add-to-bench-button";

type Creator = (typeof CREATORS)[number];

const TOPICS = ["Nutrition", "Fitness", "Design", "Entrepreneurship", "Lifestyle", "Fashion", "Wellness"] as const;

function CreatorCard({ creator }: { creator: Creator }) {
  const [following, setFollowing] = useState(
    creator.id === "nicole-keshishian" || creator.id === "shira-gill" || creator.id === "kate-ogata"
  );

  return (
    <div className="bg-white border border-lightgray overflow-hidden transition-all hover:-translate-y-[3px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
      <Link href={`/creators/${creator.id}`} className="block">
        <div
          className="w-full aspect-square flex items-center justify-center font-serif italic text-[52px] text-white overflow-hidden"
          style={creator.avatarColor ? { background: creator.avatarColor } : {}}
        >
          {creator.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={creator.avatarUrl} alt={creator.name} className="w-full h-full object-cover object-top" />
          ) : (
            creator.initials
          )}
        </div>
        <div className="px-[18px] pt-[18px] pb-3.5">
          <p className="font-serif text-[17px] font-medium text-nearblack mb-1.5">{creator.name}</p>
          <p className="text-[12px] text-gray mb-2.5">{creator.handle} · {creator.followers}</p>
          <div className="flex flex-wrap gap-1 min-h-[22px]">
            {creator.topics.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
      </Link>
      <div className="px-[18px] py-3 border-t border-lightgray flex items-center justify-between gap-2">
        <span className="text-[11px] text-gray">{creator.postCount} posts</span>
        <div className="flex items-center gap-2">
          <AddToBenchButton creatorId={creator.id} creatorName={creator.name} />
          <button
            onClick={() => setFollowing(f => !f)}
            className={`text-[10px] font-bold tracking-[0.8px] uppercase px-4 py-1.5 border-[1.5px] rounded-[2px] transition-all cursor-pointer ${
              following
                ? "bg-nearblack border-nearblack text-white"
                : "bg-transparent border-nearblack text-nearblack hover:bg-nearblack hover:text-white"
            }`}
          >
            {following ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface Props { creators: typeof CREATORS }

export function CreatorsClient({ creators }: Props) {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState<string | null>(null);

  const filtered = creators.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchTopic = !topic || c.topics.some(t => t === topic);
    return matchSearch && matchTopic;
  });

  return (
    <>
      <FilterBar topics={TOPICS} onSearch={setSearch} onTopicChange={setTopic} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map(c => <CreatorCard key={c.id} creator={c} />)}
      </div>
    </>
  );
}
