import { AppNav } from "@/components/nav/app-nav";

export default function ProfilePage() {
  return (
    <>
      <AppNav />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <h1 className="font-serif italic text-4xl text-nearblack mb-8">My Profile</h1>
        {/* TODO: profile view */}
      </main>
    </>
  );
}
