"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { StepSidebar } from "@/components/onboard/step-sidebar";
import { ALL_TOPICS } from "@/lib/seed-data";

function ProfileContent() {
  const params = useSearchParams();
  const router = useRouter();
  const role = params.get("role") ?? "member";
  const roleLabel = role === "creator" ? "Creator" : "Member";
  const [topics, setTopics] = useState<string[]>(["Nutrition", "Design"]);

  function toggleTopic(t: string) {
    setTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <header className="bg-white border-b border-lightgray h-[60px] flex items-center px-14">
        <Link href="/" className="font-serif italic text-xl text-nearblack">Solmae</Link>
      </header>

      <div className="max-w-[920px] mx-auto px-14 py-16 grid gap-[72px]" style={{ gridTemplateColumns: "220px 1fr" }}>
        <StepSidebar current={3} roleLabel={roleLabel} authLabel="Signed in" />

        <div>
          <h2 className="font-serif text-[32px] font-normal text-nearblack tracking-[-0.3px] mb-2">
            Tell us about yourself.
          </h2>
          <p className="text-[14px] text-gray mb-10 leading-[1.7]">
            This is what other Members see when they visit your profile.
          </p>

          {/* Photo upload */}
          <div className="mb-5">
            <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">Profile Photo</label>
            <div className="border-2 border-dashed border-lightgray rounded-[3px] p-9 text-center cursor-pointer hover:border-nearblack transition-colors">
              <div className="w-14 h-14 rounded-full bg-lavender mx-auto mb-3 flex items-center justify-center text-2xl">📷</div>
              <p className="text-[14px] text-gray"><strong className="text-nearblack">Upload a photo</strong> or drag and drop</p>
              <p className="text-[12px] text-gray mt-1">JPG or PNG, up to 5MB</p>
            </div>
          </div>

          {/* Name row */}
          <div className="grid grid-cols-2 gap-3.5 mb-5">
            <div>
              <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">First Name</label>
              <input defaultValue="Sarah" className="w-full px-3 py-2.5 border-[1.5px] border-lightgray rounded-[2px] text-[14px] outline-none focus:border-nearblack transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">Last Name</label>
              <input defaultValue="Chen" className="w-full px-3 py-2.5 border-[1.5px] border-lightgray rounded-[2px] text-[14px] outline-none focus:border-nearblack transition-colors" />
            </div>
          </div>

          {/* Bio */}
          <div className="mb-5">
            <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">
              A little about you <span className="text-gray font-normal normal-case tracking-normal">(bio)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Interior designer, mom to two, endlessly curious about perimenopause + nutrition. Mill Valley."
              className="w-full px-3 py-2.5 border-[1.5px] border-lightgray rounded-[2px] text-[14px] outline-none focus:border-nearblack transition-colors resize-y"
            />
          </div>

          {/* Location */}
          <div className="mb-5">
            <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">
              Location <span className="text-gray font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <input placeholder="e.g. Mill Valley, CA" className="w-full px-3 py-2.5 border-[1.5px] border-lightgray rounded-[2px] text-[14px] outline-none focus:border-nearblack transition-colors" />
          </div>

          {/* Social handles */}
          <div className="mb-5">
            <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">
              Social handles <span className="text-gray font-normal normal-case tracking-normal">— at least one required</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[["IG", "@handle"], ["X", "@handle"], ["LI", "URL or handle"], ["TT", "@handle"], ["FB", "URL or handle"]].map(([pre, ph]) => (
                <div key={pre} className="flex border-[1.5px] border-lightgray rounded-[2px] overflow-hidden focus-within:border-nearblack transition-colors">
                  <span className="px-3 py-2.5 bg-[#F5F3EF] text-[11px] font-bold text-gray border-r border-lightgray flex items-center">{pre}</span>
                  <input placeholder={ph} className="flex-1 px-3 py-2.5 text-[14px] bg-white outline-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div className="mb-9">
            <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-3">Topics you&apos;re into</label>
            <div className="flex flex-wrap gap-2">
              {ALL_TOPICS.map(t => (
                <button
                  key={t}
                  onClick={() => toggleTopic(t)}
                  className={`px-4 py-[7px] border-[1.5px] rounded-[20px] text-[13px] cursor-pointer transition-all ${
                    topics.includes(t)
                      ? "bg-lavender border-[#a8abdc] text-[#4a4e8a] font-semibold"
                      : "bg-white border-lightgray text-nearblack hover:border-gray"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => router.push("/home")}
            className="px-8 py-3 bg-nearblack text-white text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#333] transition-colors cursor-pointer"
          >
            Complete My Profile →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OnboardProfilePage() {
  return (
    <Suspense>
      <ProfileContent />
    </Suspense>
  );
}
