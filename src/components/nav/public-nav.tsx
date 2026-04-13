import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PublicNav() {
  return (
    <header className="bg-white border-b border-lightgray h-[60px] flex items-center px-14">
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="font-serif italic text-xl text-nearblack tracking-wide">
          Solmae
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/invite">
            <Button variant="outline" size="sm" className="text-[11px] font-bold tracking-widest uppercase rounded-[2px]">
              Enter Invite Code
            </Button>
          </Link>
          <Link href="/apply">
            <Button size="sm" className="bg-nearblack text-white text-[11px] font-bold tracking-widest uppercase rounded-[2px] hover:bg-[#333]">
              Apply as Creator
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
