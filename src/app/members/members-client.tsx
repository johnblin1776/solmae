"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { FilterBar } from "@/components/filter-bar";
import { MEMBERS } from "@/lib/seed-data";

type Member = (typeof MEMBERS)[number];

const TOPICS = ["Nutrition", "Design", "Fitness", "Perimenopause", "Entrepreneurship"] as const;

function MemberCard({ member }: { member: Member }) {
  return (
    <Link
      href={`/members/${member.id}`}
      className="bg-white border border-lightgray px-[18px] py-6 text-center cursor-pointer hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all block"
    >
      <div
        className="w-[60px] h-[60px] rounded-full mx-auto mb-3 flex items-center justify-center font-serif italic text-[22px] text-white"
        style={{ background: member.avatarColor }}
      >
        {member.initials}
      </div>
      <p className="text-[14px] font-semibold text-nearblack mb-0.5">{member.name}</p>
      <p className="text-[11px] text-gray mb-2.5">{member.location}</p>
      <div className="flex flex-wrap gap-1 justify-center mb-3 min-h-[22px]">
        {member.topics.map(t => <Tag key={t} size="sm">{t}</Tag>)}
      </div>
      <div className="text-[11px] text-gray border-t border-lightgray pt-2.5">
        Bench: <strong className="text-nearblack">{member.benchCount} creators</strong>
      </div>
    </Link>
  );
}

interface Props { members: typeof MEMBERS }

export function MembersClient({ members }: Props) {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState<string | null>(null);

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchTopic = !topic || m.topics.some(t => t === topic);
    return matchSearch && matchTopic;
  });

  return (
    <>
      <FilterBar topics={TOPICS} onSearch={setSearch} onTopicChange={setTopic} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {filtered.map(m => <MemberCard key={m.id} member={m} />)}
      </div>
    </>
  );
}
