import { AppNav } from "@/components/nav/app-nav";

export default function MembersPage() {
  return (
    <>
      <AppNav />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <h1 className="font-serif italic text-4xl text-nearblack mb-1">Members</h1>
        <p className="text-gray text-sm mb-10">The Solmae community.</p>
        {/* TODO: members grid with search + topic filter */}
      </main>
    </>
  );
}
