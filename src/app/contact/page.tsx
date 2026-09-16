import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/nav/public-nav";
import { SiteFooter } from "@/components/nav/site-footer";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Solmae",
  description: "Get in touch with Solmae.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-cream">
      <PublicNav />
      <main className="mx-auto w-full max-w-[560px] flex-1 px-6 py-16 text-center sm:px-10">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-coral uppercase">Contact</p>
        <h1 className="mt-4 font-serif text-[42px] tracking-[-0.03em] text-ink">Say hello.</h1>
        <p className="mt-5 text-[15px] leading-8 text-ink/55">
          {site.contactEmail ? (
            <>
              Write us at{" "}
              <a className="text-ink underline underline-offset-4" href={`mailto:${site.contactEmail}`}>
                {site.contactEmail}
              </a>
              , or leave your email and we&apos;ll be in touch.
            </>
          ) : (
            <>
              Leave your email and we&apos;ll be in touch. For Founding 50,{" "}
              <Link href="/founding-50" className="text-ink underline underline-offset-4">
                apply here
              </Link>
              .
            </>
          )}
        </p>
        <div className="mx-auto mt-10 max-w-[340px]">
          <WaitlistForm source="contact" variant="page" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
