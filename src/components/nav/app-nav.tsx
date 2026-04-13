"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/home",       label: "Edition" },
  { href: "/creators",   label: "Creators" },
  { href: "/businesses", label: "Businesses" },
  { href: "/members",    label: "Members" },
  { href: "/benches",    label: "My Benches" },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-lightgray h-[60px] flex items-center px-14 sticky top-[41px] z-50">
      <Link href="/home" className="font-serif italic text-xl text-nearblack tracking-wide mr-12">
        Solmae
      </Link>
      <nav className="flex gap-8 flex-1">
        {LINKS.map(({ href, label }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`text-[11px] font-bold tracking-[1px] uppercase pb-1 border-b-2 transition-all ${
                isActive
                  ? "text-nearblack border-salmon"
                  : "text-gray border-transparent hover:text-nearblack"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center text-[12px] font-bold text-[#5a5e9a] cursor-pointer select-none">
        S
      </div>
    </header>
  );
}
