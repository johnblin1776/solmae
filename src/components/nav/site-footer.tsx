import Link from "next/link";
import { MarkHalved } from "@/lib/marks";
import { site } from "@/lib/site";

const links = [
  { href: "/about", label: "About" },
  { href: "/founding-50", label: "Founding 50" },
  { href: "/#join", label: "Join" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter({ dark = true }: { dark?: boolean }) {
  const instagram = site.instagramUrl;

  return (
    <footer className={dark ? "bg-ink text-white" : "bg-periwinkle/80 text-ink"}>
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-8 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <MarkHalved className="size-6" />
          <span className="font-display italic text-[20px] tracking-[0.04em] lowercase">solmae</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] font-semibold tracking-[0.14em] uppercase">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center opacity-80 transition-opacity hover:opacity-100 sm:min-h-0"
            >
              {link.label}
            </Link>
          ))}
          {instagram ? (
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center opacity-80 transition-opacity hover:opacity-100 sm:min-h-0"
            >
              Instagram
            </a>
          ) : null}
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1120px] px-6 py-4 text-[11px] tracking-wide opacity-50 sm:px-10">
          © {new Date().getFullYear()} Solmae. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
