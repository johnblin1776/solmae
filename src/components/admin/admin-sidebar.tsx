"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Content Queue",  href: "/admin/content",  badge: 3 },
  { label: "Creators",       href: "/admin/creators", badge: 2 },
  { label: "Members",        href: "/admin/members",  badge: null },
  { label: "Ingest Log",     href: "/admin/ingest",   badge: null },
  { label: "Settings",       href: "/admin/settings", badge: null },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] flex-shrink-0 bg-[#1A1A1A] min-h-[calc(100vh-41px)] flex flex-col">
      {/* Brand */}
      <div className="px-6 pt-8 pb-6 border-b border-[#333]">
        <p className="font-serif italic text-white text-[20px] leading-none">Solmae</p>
        <p className="text-[11px] text-[#888] tracking-[1.5px] uppercase mt-1">Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5">
        {NAV.map(({ label, href, badge }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-[3px] mb-0.5 text-[13px] font-medium transition-colors ${
                active
                  ? "bg-[#FE9D94] text-[#1A1A1A] font-semibold"
                  : "text-[#aaa] hover:text-white hover:bg-[#2a2a2a]"
              }`}
            >
              <span>{label}</span>
              {badge !== null && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  active ? "bg-[#1A1A1A]/20 text-[#1A1A1A]" : "bg-[#FE9D94]/20 text-[#FE9D94]"
                }`}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-5 border-t border-[#333]">
        <p className="text-[11px] text-[#555]">Signed in as admin</p>
      </div>
    </aside>
  );
}
