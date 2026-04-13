"use client";

import { useState } from "react";

interface FilterBarProps {
  topics: readonly string[];
  onSearch?: (q: string) => void;
  onTopicChange?: (topic: string | null) => void;
}

export function FilterBar({ topics, onSearch, onTopicChange }: FilterBarProps) {
  const [active, setActive] = useState<string | null>(null);

  function selectTopic(t: string | null) {
    setActive(t);
    onTopicChange?.(t);
  }

  return (
    <div className="flex items-center gap-4 mb-10 pb-6 border-b border-lightgray flex-wrap">
      <input
        className="flex-1 max-w-[280px] px-3.5 py-[9px] border-[1.5px] border-lightgray rounded-[2px] font-sans text-[13px] bg-white outline-none transition-colors focus:border-nearblack"
        placeholder="Search by name…"
        onChange={e => onSearch?.(e.target.value)}
      />
      <button
        onClick={() => selectTopic(null)}
        className={`px-3.5 py-[5px] border-[1.5px] rounded-[20px] text-[11px] font-semibold tracking-[0.3px] transition-all cursor-pointer ${
          active === null
            ? "border-nearblack bg-nearblack text-white"
            : "border-lightgray bg-white text-gray hover:border-nearblack hover:text-nearblack"
        }`}
      >
        All
      </button>
      {topics.map(t => (
        <button
          key={t}
          onClick={() => selectTopic(t)}
          className={`px-3.5 py-[5px] border-[1.5px] rounded-[20px] text-[11px] font-semibold tracking-[0.3px] transition-all cursor-pointer ${
            active === t
              ? "border-nearblack bg-nearblack text-white"
              : "border-lightgray bg-white text-gray hover:border-nearblack hover:text-nearblack"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
