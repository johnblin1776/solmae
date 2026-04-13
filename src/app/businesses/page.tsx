import { AppNav } from "@/components/nav/app-nav";
import { BUSINESSES } from "@/lib/seed-data";
import { BusinessesClient } from "./businesses-client";

export default function BusinessesPage() {
  return (
    <>
      <AppNav />
      <div className="px-14 pt-11 pb-9 border-b border-lightgray bg-white">
        <p className="text-[10px] font-bold tracking-[2.5px] uppercase text-salmon mb-1.5">Community</p>
        <h1 className="font-serif text-[48px] font-normal text-nearblack leading-none tracking-[-1.5px]">
          Businesses
        </h1>
        <p className="text-[14px] text-gray mt-3 max-w-[480px] leading-[1.7]">
          Businesses owned and run by Solmae Creators and Members. Search by keyword, location, or category.
        </p>
      </div>
      <BusinessesClient businesses={BUSINESSES} />
    </>
  );
}
