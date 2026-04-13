"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { StepSidebar } from "@/components/onboard/step-sidebar";

function AuthContent() {
  const params = useSearchParams();
  const router = useRouter();
  const role = params.get("role") ?? "member";
  const roleLabel = role === "creator" ? "Creator" : "Member";

  function continueWith() {
    router.push(`/onboard/profile?role=${role}`);
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <header className="bg-white border-b border-lightgray h-[60px] flex items-center px-14">
        <Link href="/" className="font-serif italic text-xl text-nearblack">Solmae</Link>
      </header>

      <div className="max-w-[920px] mx-auto px-14 py-16 grid gap-[72px]" style={{ gridTemplateColumns: "220px 1fr" }}>
        <StepSidebar current={2} roleLabel={roleLabel} />

        <div>
          <h2 className="font-serif text-[32px] font-normal text-nearblack tracking-[-0.3px] mb-2">
            Sign in to continue.
          </h2>
          <p className="text-[14px] text-gray mb-10 leading-[1.7]">
            We&apos;ll pull your name and photo automatically — nothing else without your permission.
          </p>

          <div className="flex flex-col gap-3 mb-7">
            <button
              onClick={continueWith}
              className="flex items-center gap-3.5 px-5 py-3.5 border-[1.5px] border-lightgray rounded-[3px] bg-white font-sans text-[15px] font-medium cursor-pointer hover:border-nearblack transition-colors text-left"
            >
              <span className="w-5 h-5 rounded-full bg-[#EA4335] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">G</span>
              Continue with Google
            </button>
            <button
              onClick={continueWith}
              className="flex items-center gap-3.5 px-5 py-3.5 border-[1.5px] border-lightgray rounded-[3px] bg-white font-sans text-[15px] font-medium cursor-pointer hover:border-nearblack transition-colors text-left"
            >
              <span className="w-5 h-5 rounded-full bg-[#1877F2] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">f</span>
              Continue with Facebook
            </button>
          </div>

          <p className="text-[12px] text-gray leading-[1.7]">
            By signing in you agree to Solmae&apos;s{" "}
            <span className="text-nearblack font-semibold cursor-pointer">Terms</span> and{" "}
            <span className="text-nearblack font-semibold cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OnboardAuthPage() {
  return (
    <Suspense>
      <AuthContent />
    </Suspense>
  );
}
