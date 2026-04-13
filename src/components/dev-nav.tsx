"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SCREENS = [
  { label: "1 · Landing",           href: "/" },
  { label: "2 · Invite Gate",       href: "/invite" },
  { label: "3a · Onboard: Role",    href: "/onboard" },
  { label: "3b · Onboard: Auth",    href: "/onboard/auth" },
  { label: "3c · Onboard: Profile", href: "/onboard/profile" },
  { label: "4 · The Edition",       href: "/home" },
  { label: "5 · Creators",          href: "/creators" },
  { label: "6 · Creator Profile",   href: "/creators/nicole-keshishian" },
  { label: "7 · Members",           href: "/members" },
  { label: "7b · Member Profile",   href: "/members/jennifer-l" },
  { label: "8 · Admin",             href: "/admin" },
  { label: "Admin: Content",        href: "/admin/content" },
  { label: "Admin: Creators",       href: "/admin/creators" },
  { label: "Admin: Members",        href: "/admin/members" },
  { label: "Admin: Ingest",         href: "/admin/ingest" },
  { label: "Apply as Creator",      href: "/apply" },
];

export function DevNav() {
  const pathname = usePathname();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#111",
        borderBottom: "1px solid #333",
        padding: "8px 20px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          color: "#555",
          fontSize: "10px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginRight: "6px",
          whiteSpace: "nowrap",
          fontWeight: 700,
        }}
      >
        Solmae
      </span>

      {SCREENS.map(({ label, href }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            style={{
              background: isActive ? "#FE9D94" : "transparent",
              border: `1px solid ${isActive ? "#FE9D94" : "#333"}`,
              color: isActive ? "#1A1A1A" : "#888",
              fontWeight: isActive ? 600 : 400,
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "11px",
              whiteSpace: "nowrap",
              textDecoration: "none",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
