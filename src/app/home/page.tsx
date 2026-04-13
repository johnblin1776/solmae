import { AppNav } from "@/components/nav/app-nav";

export default function EditionPage() {
  return (
    <>
      <AppNav />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <h1 className="font-serif italic text-4xl text-nearblack mb-1">The Edition</h1>
        <p className="text-gray text-sm mb-10">Your daily curated stories.</p>
        {/* TODO: Edition story cards */}
      </main>
    </>
  );
}
