"use client";

import { useState } from "react";
import { useBenches } from "@/lib/bench-context";

interface Props {
  creatorId: string;
  creatorName: string;
  onClose: () => void;
}

export function AddToBenchModal({ creatorId, creatorName, onClose }: Props) {
  const { benches, addBench, addCreatorToBench, removeCreatorFromBench, getBenchesForCreator } = useBenches();

  // Pre-select benches that already contain this creator
  const initialSelected = getBenchesForCreator(creatorId).map(b => b.id);
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [newName, setNewName] = useState("");
  const [saved, setSaved] = useState(false);

  function toggle(benchId: string) {
    setSelected(s => s.includes(benchId) ? s.filter(b => b !== benchId) : [...s, benchId]);
  }

  function createBench() {
    const n = newName.trim();
    if (!n) return;
    if (benches.some(b => b.name.toLowerCase() === n.toLowerCase())) return;
    const bench = addBench(n);
    setSelected(s => [...s, bench.id]);
    setNewName("");
  }

  function save() {
    // Apply diff: add to newly selected, remove from deselected
    benches.forEach(bench => {
      const wasIn = initialSelected.includes(bench.id);
      const isIn  = selected.includes(bench.id);
      if (isIn  && !wasIn) addCreatorToBench(bench.id, creatorId);
      if (!isIn && wasIn)  removeCreatorFromBench(bench.id, creatorId);
    });
    setSaved(true);
    setTimeout(onClose, 700);
  }

  const changed = JSON.stringify([...selected].sort()) !== JSON.stringify([...initialSelected].sort());

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      style={{ background: "rgba(26,26,26,0.6)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-[400px] mx-4 rounded-[2px]">
        <div className="px-7 pt-7 pb-5 border-b border-lightgray">
          <h2 className="font-serif text-[22px] font-normal text-nearblack mb-0.5">Add to Bench</h2>
          <p className="text-[13px] text-gray">Adding <strong className="text-nearblack">{creatorName}</strong></p>
        </div>

        <div className="px-7 py-5">
          <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray mb-3">Your Benches</p>
          <div className="flex flex-col gap-2 mb-5 max-h-[240px] overflow-y-auto">
            {benches.map(bench => {
              const isChecked = selected.includes(bench.id);
              return (
                <label key={bench.id} className="flex items-center gap-3 cursor-pointer group py-0.5">
                  <span
                    onClick={() => toggle(bench.id)}
                    className={`w-4 h-4 rounded-[3px] border-[1.5px] flex items-center justify-center transition-colors flex-shrink-0 ${
                      isChecked
                        ? "bg-nearblack border-nearblack"
                        : "border-lightgray group-hover:border-nearblack"
                    }`}
                  >
                    {isChecked && (
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="text-[14px] text-nearblack flex-1">{bench.name}</span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    bench.visibility === "members"
                      ? "bg-[#e8f5ee] text-[#2d7a4a]"
                      : "bg-[#F5F3EF] text-[#888]"
                  }`}>
                    {bench.visibility === "members" ? "Members" : "Private"}
                  </span>
                </label>
              );
            })}
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
            disabled={!changed || saved}
            className="flex-1 py-2.5 bg-nearblack text-white text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#333] transition-colors disabled:opacity-40 cursor-pointer"
          >
            {saved ? "Saved ✓" : "Save"}
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
