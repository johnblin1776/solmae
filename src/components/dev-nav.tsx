"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const SCREENS = [
  { label: "Waitlist", href: "/" },
  { label: "About", href: "/about" },
  { label: "Founding 50", href: "/founding-50" },
  { label: "Invite", href: "/invite" },
  { label: "Onboard", href: "/onboard" },
  { label: "Edition", href: "/home" },
  { label: "Creators", href: "/creators" },
  { label: "Members", href: "/members" },
  { label: "Businesses", href: "/businesses" },
  { label: "Benches", href: "/benches" },
  { label: "Admin", href: "/admin" },
  { label: "Apply (legacy)", href: "/apply" },
];

export function DevNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function lock() {
    await fetch("/api/internal/lock", { method: "POST" });
    router.push("/");
    router.refresh();
  }

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
        Internal
      </span>

      {SCREENS.map(({ label, href }) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            style={{
              background: isActive ? "#E85A4C" : "transparent",
              border: `1px solid ${isActive ? "#E85A4C" : "#333"}`,
              color: isActive ? "#fff" : "#888",
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

      <button
        type="button"
        onClick={lock}
        style={{
          marginLeft: "auto",
          background: "transparent",
          border: "1px solid #333",
          color: "#888",
          padding: "4px 12px",
          borderRadius: "20px",
          fontSize: "11px",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Lock
      </button>
    </div>
  );
}
