export default function OnboardAuthPage() {
  return (
    <main className="min-h-screen bg-offwhite flex items-center justify-center">
      <div className="w-full max-w-lg px-6">
        <h1 className="font-serif italic text-3xl text-nearblack mb-2">Sign in to continue.</h1>
        <p className="text-gray text-sm mb-8">We&apos;ll pull your name and photo automatically — nothing else without your permission.</p>
        {/* TODO: Google + Facebook OAuth buttons */}
      </div>
    </main>
  );
}
