"use client";

import { useState } from "react";
import { useBenches } from "@/lib/bench-context";
import { AddToBenchModal } from "./add-to-bench-modal";

interface Props {
  creatorId: string;
  creatorName: string;
}

export function AddToBenchButton({ creatorId, creatorName }: Props) {
  const [open, setOpen] = useState(false);
  const { isOnAnyBench } = useBenches();
  const benched = isOnAnyBench(creatorId);

  return (
    <>
      <button
        onClick={e => { e.preventDefault(); setOpen(true); }}
        title={benched ? `${creatorName} is on your bench` : `Add ${creatorName} to a bench`}
        className={`w-7 h-7 flex items-center justify-center transition-colors cursor-pointer rounded-[2px] hover:bg-offwhite ${
          benched ? "text-salmon" : "text-gray hover:text-salmon"
        }`}
        aria-label="Add to Bench"
      >
        <svg width="16" height="16" viewBox="0 0 24 24"
          fill={benched ? "currentColor" : "none"}
          stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {open && (
        <AddToBenchModal
          creatorId={creatorId}
          creatorName={creatorName}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
