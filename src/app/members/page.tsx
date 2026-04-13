import { AppNav } from "@/components/nav/app-nav";
import { MEMBERS } from "@/lib/seed-data";
import { MembersClient } from "./members-client";

export default function MembersPage() {
  return (
    <>
      <AppNav />
      <div className="max-w-[1248px] mx-auto w-full px-14 py-13">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-normal text-nearblack tracking-[-0.5px] mb-1.5">Members</h1>
          <p className="text-[14px] text-gray">Browse the community. Click any Member to see their Bench.</p>
        </div>
        <MembersClient members={MEMBERS} />
      </div>
    </>
  );
}
