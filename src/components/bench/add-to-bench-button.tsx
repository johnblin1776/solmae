"use client";

import { useState } from "react";
import { AddToBenchModal } from "./add-to-bench-modal";

interface Props {
  creatorId: string;
  creatorName: string;
}

export function AddToBenchButton({ creatorId, creatorName }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={e => { e.preventDefault(); setOpen(true); }}
        title={`Add ${creatorName} to a Bench`}
        className="w-7 h-7 flex items-center justify-center text-gray hover:text-salmon transition-colors cursor-pointer rounded-[2px] hover:bg-offwhite"
        aria-label="Add to Bench"
      >
        {/* Pinterest-style save icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
