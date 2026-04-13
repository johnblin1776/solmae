import { AppNav } from "@/components/nav/app-nav";

export default function CreatorsPage() {
  return (
    <>
      <AppNav />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <h1 className="font-serif italic text-4xl text-nearblack mb-1">Creators</h1>
        <p className="text-gray text-sm mb-10">Discover the voices behind Solmae.</p>
        {/* TODO: creators grid with search + topic filter */}
      </main>
    </>
  );
}
