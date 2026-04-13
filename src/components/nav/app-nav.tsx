import Link from "next/link";

const links = [
  { href: "/home", label: "The Edition" },
  { href: "/creators", label: "Creators" },
  { href: "/members", label: "Members" },
];

export function AppNav() {
  return (
    <header className="bg-white border-b border-lightgray h-[60px] flex items-center px-14 sticky top-0 z-50">
      <Link href="/home" className="font-serif italic text-xl text-nearblack tracking-wide mr-12">
        Solmae
      </Link>
      <nav className="flex gap-8 flex-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[11px] font-bold tracking-widest uppercase text-gray hover:text-nearblack transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center text-[12px] font-bold text-[#5a5e9a] cursor-pointer">
        JB
      </div>
    </header>
  );
}
