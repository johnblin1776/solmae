import { AppNav } from "@/components/nav/app-nav";

export default async function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <AppNav />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <p className="text-gray text-xs uppercase tracking-widest mb-6">Creator</p>
        <h1 className="font-serif italic text-4xl text-nearblack mb-4">{id}</h1>
        {/* TODO: creator bio, social links, content feed, follow button */}
      </main>
    </>
  );
}
