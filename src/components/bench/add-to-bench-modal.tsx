"use client";

import { useState } from "react";

// Seed benches — in production these come from the DB per logged-in member
const DEFAULT_BENCHES = ["Morning Read", "Design + Home", "Wellness"];

interface Props {
  creatorId: string;
  creatorName: string;
  onClose: () => void;
}

export function AddToBenchModal({ creatorName, onClose }: Props) {
  const [benches, setBenches] = useState(DEFAULT_BENCHES);
  const [selected, setSelected] = useState<string[]>([]);
  const [newName, setNewName] = useState("");
  const [saved, setSaved] = useState(false);

  function toggle(name: string) {
    setSelected(s => s.includes(name) ? s.filter(b => b !== name) : [...s, name]);
  }

  function createBench() {
    const n = newName.trim();
    if (!n || benches.includes(n)) return;
    setBenches(b => [...b, n]);
    setSelected(s => [...s, n]);
    setNewName("");
  }

  function save() {
    // TODO: persist to Supabase
    setSaved(true);
    setTimeout(onClose, 800);
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      style={{ background: "rgba(26,26,26,0.6)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-[400px] mx-4">
        <div className="px-7 pt-7 pb-5 border-b border-lightgray">
          <h2 className="font-serif text-[22px] font-normal text-nearblack mb-0.5">Add to Bench</h2>
          <p className="text-[13px] text-gray">Adding <strong className="text-nearblack">{creatorName}</strong></p>
        </div>

        <div className="px-7 py-5">
          <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray mb-3">Your Benches</p>
          <div className="flex flex-col gap-2 mb-5">
            {benches.map(bench => (
              <label key={bench} className="flex items-center gap-3 cursor-pointer group">
                <span
                  className={`w-4 h-4 rounded-[3px] border-[1.5px] flex items-center justify-center transition-colors flex-shrink-0 ${
                    selected.includes(bench)
                      ? "bg-nearblack border-nearblack"
                      : "border-lightgray group-hover:border-nearblack"
                  }`}
                >
                  {selected.includes(bench) && (
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input type="checkbox" className="sr-only" checked={selected.includes(bench)} onChange={() => toggle(bench)} />
                <span className="text-[14px] text-nearblack">{bench}</span>
              </label>
            ))}
          </div>

          {/* Create new bench */}
          <div className="flex gap-2">
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && createBench()}
              placeholder="New bench name…"
              className="flex-1 px-3 py-2 border-[1.5px] border-lightgray rounded-[2px] text-[13px] outline-none focus:border-nearblack transition-colors"
            />
            <button
              onClick={createBench}
              disabled={!newName.trim()}
              className="px-3 py-2 bg-offwhite border border-lightgray rounded-[2px] text-[11px] font-bold tracking-widest uppercase text-nearblack hover:border-nearblack transition-colors disabled:opacity-40 cursor-pointer"
            >
              + New
            </button>
          </div>
        </div>

        <div className="px-7 pb-7 flex gap-3">
          <button
            onClick={save}
            disabled={selected.length === 0 || saved}
            className="flex-1 py-2.5 bg-nearblack text-white text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#333] transition-colors disabled:opacity-40 cursor-pointer"
          >
            {saved ? "Saved ✓" : `Save to ${selected.length > 0 ? selected.length : ""} Bench${selected.length !== 1 ? "es" : ""}`}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-lightgray text-[11px] font-bold tracking-widest uppercase rounded-[2px] text-gray hover:border-nearblack hover:text-nearblack transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
