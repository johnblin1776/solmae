"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type State = "idle" | "loading" | "full" | "invalid";

// Seed valid codes — will be replaced by Supabase lookup
const VALID_CODES = ["JEN2026", "LAUREN2026", "SOLMAE"];
const FULL_CODES: string[] = []; // simulate slots-full scenario with e.g. "FULL2026"

export function InviteClient() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [state, setState] = useState<State>("idle");
  const [apologyEmail, setApologyEmail] = useState("");
  const [apologySubmitted, setApologySubmitted] = useState(false);

  async function submit() {
    const clean = code.trim().toUpperCase();
    if (!clean) return;
    setState("loading");
    await new Promise(r => setTimeout(r, 600)); // simulate network

    if (FULL_CODES.includes(clean)) {
      setState("full");
    } else if (VALID_CODES.includes(clean)) {
      router.push("/onboard");
    } else {
      setState("invalid");
    }
  }

  return (
    <>
      {/* Apology modal */}
      {state === "full" && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center" style={{ background: "rgba(26,26,26,0.75)" }}>
          <div className="bg-white px-12 py-13 max-w-[460px] w-[90%] text-center">
            <div className="font-serif italic text-[52px] text-lavender leading-none mb-6">S</div>
            <h2 className="font-serif text-[28px] font-normal text-nearblack tracking-[-0.3px] mb-3.5">
              This month&apos;s spots are full.
            </h2>
            <p className="text-[14px] text-gray leading-[1.8] mb-8">
              Your invite is valid — but a new batch opens next month. Leave your email and we&apos;ll send you a personal reminder the moment a spot opens.
            </p>
            {!apologySubmitted ? (
              <>
                <input
                  value={apologyEmail}
                  onChange={e => setApologyEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 border-[1.5px] border-lightgray rounded-[2px] font-sans text-[15px] outline-none focus:border-nearblack transition-colors mb-3"
                />
                <button
                  onClick={() => setApologySubmitted(true)}
                  className="w-full py-3 bg-nearblack text-white text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#333] transition-colors cursor-pointer"
                >
                  Remind Me Next Month
                </button>
                <p className="text-[12px] text-gray mt-4">You&apos;ll only hear from us when your spot opens. No newsletters, no noise.</p>
              </>
            ) : (
              <p className="text-[15px] text-nearblack font-medium">You&apos;re on the list. We&apos;ll be in touch.</p>
            )}
          </div>
        </div>
      )}

      {/* Invite form */}
      <div className="min-h-[calc(100vh-101px)] flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-[460px] text-center">
          <div className="font-serif italic text-[88px] text-salmon leading-none mb-9">S</div>
          <h1 className="font-serif text-[36px] font-normal text-nearblack tracking-[-0.5px] mb-2.5">
            You&apos;ve been invited.
          </h1>
          <p className="text-[14px] text-gray max-w-[340px] mx-auto mb-11 leading-[1.7]">
            Enter the invite code shared with you to join Solmae&apos;s community of creators, founders, and leaders.
          </p>

          <input
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setState("idle"); }}
            onKeyDown={e => e.key === "Enter" && submit()}
            placeholder="ENTER CODE"
            maxLength={12}
            className={`w-full px-5 py-4 border-2 rounded-[3px] font-sans text-[20px] text-center tracking-[6px] uppercase bg-white outline-none transition-colors mb-3 placeholder:tracking-[2px] placeholder:text-[14px] placeholder:text-[#ccc] ${
              state === "invalid" ? "border-red" : "border-lightgray focus:border-nearblack"
            }`}
          />

          {state === "invalid" && (
            <p className="text-[13px] text-red font-semibold mb-3">That code doesn&apos;t look right. Check for typos and try again.</p>
          )}

          <button
            onClick={submit}
            disabled={!code.trim() || state === "loading"}
            className="w-full py-3.5 bg-nearblack text-white text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#333] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {state === "loading" ? "Checking…" : "Continue"}
          </button>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-lightgray" />
            <span className="text-[11px] text-gray tracking-[1px] uppercase">or</span>
            <div className="flex-1 h-px bg-lightgray" />
          </div>

          <p className="text-[13px] text-gray">
            Are you a creator?{" "}
            <Link href="/apply" className="text-nearblack font-semibold underline">
              Apply to join Solmae →
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
