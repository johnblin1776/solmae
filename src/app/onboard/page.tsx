"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StepSidebar } from "@/components/onboard/step-sidebar";

export default function OnboardRolePage() {
  const router = useRouter();
  const [role, setRole] = useState<"member" | "creator">("member");

  function next() {
    router.push(`/onboard/auth?role=${role}`);
  }

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <header className="bg-white border-b border-lightgray h-[60px] flex items-center px-14">
        <Link href="/" className="font-serif italic text-xl text-nearblack">Solmae</Link>
      </header>

      <div className="max-w-[920px] mx-auto px-14 py-16 grid gap-[72px]" style={{ gridTemplateColumns: "220px 1fr" }}>
        <StepSidebar current={1} />

        <div>
          <h2 className="font-serif text-[32px] font-normal text-nearblack tracking-[-0.3px] mb-2">
            How are you joining?
          </h2>
          <p className="text-[14px] text-gray mb-10 leading-[1.7]">
            Choose your role — you can only be one, and it shapes how you experience Solmae.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-9">
            {(["member", "creator"] as const).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`border-2 p-7 text-left cursor-pointer transition-all rounded-[2px] ${
                  role === r ? "border-nearblack bg-nearblack" : "border-lightgray bg-white hover:border-gray"
                }`}
              >
                <div className={`w-[18px] h-[18px] rounded-full border-2 mb-4 relative transition-colors ${
                  role === r ? "border-salmon bg-salmon" : "border-lightgray"
                }`}>
                  {role === r && (
                    <div className="absolute w-2 h-2 rounded-full bg-white top-[3px] left-[3px]" />
                  )}
                </div>
                <p className={`font-serif text-[20px] font-medium mb-2 capitalize ${role === r ? "text-white" : "text-nearblack"}`}>
                  {r}
                </p>
                <p className={`text-[13px] leading-[1.5] ${role === r ? "text-white/60" : "text-gray"}`}>
                  {r === "member"
                    ? "Browse the daily Edition, follow the Creators you love, and connect with other Members."
                    : "Share your work with Solmae's community. Your content surfaces in Members' daily Editions."}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="px-8 py-3 bg-nearblack text-white text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#333] transition-colors cursor-pointer"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
