"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { SEED_BENCHES } from "@/lib/seed-data";

export type Visibility = "private" | "members";

export interface Bench {
  id: string;
  name: string;
  visibility: Visibility;
  creatorIds: string[];
  description: string | null;
}

interface BenchContextType {
  benches: Bench[];
  addBench: (name: string) => Bench;
  addCreatorToBench: (benchId: string, creatorId: string) => void;
  removeCreatorFromBench: (benchId: string, creatorId: string) => void;
  toggleVisibility: (benchId: string) => void;
  deleteBench: (benchId: string) => void;
  isOnAnyBench: (creatorId: string) => boolean;
  getBenchesForCreator: (creatorId: string) => Bench[];
}

const BenchContext = createContext<BenchContextType | null>(null);

export function BenchProvider({ children }: { children: ReactNode }) {
  const [benches, setBenches] = useState<Bench[]>(
    SEED_BENCHES.map(b => ({
      ...b,
      visibility: b.visibility as Visibility,
      creatorIds: [...b.creatorIds],
    }))
  );

  function addBench(name: string): Bench {
    const id = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const bench: Bench = { id, name: name.trim(), visibility: "private", creatorIds: [], description: null };
    setBenches(prev => [...prev, bench]);
    return bench;
  }

  function addCreatorToBench(benchId: string, creatorId: string) {
    setBenches(prev =>
      prev.map(b =>
        b.id === benchId && !b.creatorIds.includes(creatorId)
          ? { ...b, creatorIds: [...b.creatorIds, creatorId] }
          : b
      )
    );
  }

  function removeCreatorFromBench(benchId: string, creatorId: string) {
    setBenches(prev =>
      prev.map(b =>
        b.id === benchId
          ? { ...b, creatorIds: b.creatorIds.filter(id => id !== creatorId) }
          : b
      )
    );
  }

  function toggleVisibility(benchId: string) {
    setBenches(prev =>
      prev.map(b =>
        b.id === benchId
          ? { ...b, visibility: b.visibility === "private" ? "members" : "private" }
          : b
      )
    );
  }

  function deleteBench(benchId: string) {
    setBenches(prev => prev.filter(b => b.id !== benchId));
  }

  function isOnAnyBench(creatorId: string) {
    return benches.some(b => b.creatorIds.includes(creatorId));
  }

  function getBenchesForCreator(creatorId: string) {
    return benches.filter(b => b.creatorIds.includes(creatorId));
  }

  return (
    <BenchContext.Provider
      value={{ benches, addBench, addCreatorToBench, removeCreatorFromBench, toggleVisibility, deleteBench, isOnAnyBench, getBenchesForCreator }}
    >
      {children}
    </BenchContext.Provider>
  );
}

export function useBenches() {
  const ctx = useContext(BenchContext);
  if (!ctx) throw new Error("useBenches must be used inside <BenchProvider>");
  return ctx;
}
