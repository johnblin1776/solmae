"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_TOPICS } from "@/lib/seed-data";

type Step = "form" | "submitted";

export default function ApplyPage() {
  const [step, setStep] = useState<Step>("form");
  const [topics, setTopics] = useState<string[]>([]);

  function toggleTopic(t: string) {
    setTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  }

  if (step === "submitted") {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center px-6">
        <div className="max-w-[480px] text-center">
          <div className="font-serif italic text-[72px] text-salmon leading-none mb-8">S</div>
          <h1 className="font-serif text-[32px] font-normal text-nearblack tracking-[-0.3px] mb-3">
            Your application is in.
          </h1>
          <p className="text-[14px] text-gray leading-[1.8] mb-8 max-w-[360px] mx-auto">
            We review every Creator application personally. You&apos;ll hear from us within a week — usually sooner.
          </p>
          <p className="text-[12px] text-gray">
            Have an invite code?{" "}
            <Link href="/invite" className="text-nearblack font-semibold underline">Join as a Member instead →</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <header className="bg-white border-b border-lightgray h-[60px] flex items-center px-14">
        <Link href="/" className="font-serif italic text-xl text-nearblack">Solmae</Link>
      </header>

      <div className="max-w-[600px] mx-auto px-6 py-14">
        <p className="text-[11px] font-bold tracking-[1.5px] uppercase text-gray mb-2">Creators</p>
        <h1 className="font-serif text-[36px] font-normal text-nearblack tracking-[-0.4px] mb-2">
          Apply to join Solmae.
        </h1>
        <p className="text-[14px] text-gray leading-[1.7] mb-10 max-w-[480px]">
          No invite code needed. We review every application personally and look for Creators with genuine expertise and an engaged audience.
        </p>

        <form
          onSubmit={e => { e.preventDefault(); setStep("submitted"); }}
          className="space-y-5"
        >
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">First Name</label>
              <input required placeholder="First" className="w-full px-3 py-2.5 border-[1.5px] border-lightgray rounded-[2px] text-[14px] outline-none focus:border-nearblack transition-colors" />
            </div>
            <div>
              <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">Last Name</label>
              <input required placeholder="Last" className="w-full px-3 py-2.5 border-[1.5px] border-lightgray rounded-[2px] text-[14px] outline-none focus:border-nearblack transition-colors" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">Email</label>
            <input type="email" required placeholder="you@example.com" className="w-full px-3 py-2.5 border-[1.5px] border-lightgray rounded-[2px] text-[14px] outline-none focus:border-nearblack transition-colors" />
          </div>

          {/* Primary Social */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">
              Primary Social Handle or URL <span className="text-gray font-normal normal-case tracking-normal">— where most of your audience is</span>
            </label>
            <input required placeholder="@handle or URL" className="w-full px-3 py-2.5 border-[1.5px] border-lightgray rounded-[2px] text-[14px] outline-none focus:border-nearblack transition-colors" />
          </div>

          {/* Audience size */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">
              Audience Size <span className="text-gray font-normal normal-case tracking-normal">(combined followers / subscribers)</span>
            </label>
            <select required className="w-full px-3 py-2.5 border-[1.5px] border-lightgray rounded-[2px] text-[14px] outline-none focus:border-nearblack transition-colors bg-white appearance-none">
              <option value="">Select a range…</option>
              <option>Under 5,000</option>
              <option>5,000 – 25,000</option>
              <option>25,000 – 100,000</option>
              <option>100,000 – 500,000</option>
              <option>500K+</option>
            </select>
          </div>

          {/* Topics */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-3">
              What do you cover? <span className="text-gray font-normal normal-case tracking-normal">(pick all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_TOPICS.map(t => (
                <button
                  key={t}
                  type="button"
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

          {/* Bio / why */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">
              Tell us about yourself and your work
            </label>
            <textarea
              required
              rows={4}
              placeholder="Who you are, what you create, and why you want to be part of Solmae."
              className="w-full px-3 py-2.5 border-[1.5px] border-lightgray rounded-[2px] text-[14px] outline-none focus:border-nearblack transition-colors resize-y"
            />
          </div>

          {/* Content sample */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.8px] uppercase text-nearblack mb-2">
              Link to your best recent piece of content <span className="text-gray font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <input type="url" placeholder="https://" className="w-full px-3 py-2.5 border-[1.5px] border-lightgray rounded-[2px] text-[14px] outline-none focus:border-nearblack transition-colors" />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-nearblack text-white text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#333] transition-colors cursor-pointer"
            >
              Submit Application →
            </button>
            <p className="text-[12px] text-gray mt-3">
              Already have an invite code?{" "}
              <Link href="/invite" className="text-nearblack font-semibold underline">Join as a Member →</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
