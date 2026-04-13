import { AppNav } from "@/components/nav/app-nav";
import { CREATORS } from "@/lib/seed-data";
import { CreatorsClient } from "./creators-client";

export default function CreatorsPage() {
  return (
    <>
      <AppNav />
      <div className="max-w-[1248px] mx-auto w-full px-14 py-13">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-normal text-nearblack tracking-[-0.5px] mb-1.5">
            Creators
          </h1>
          <p className="text-[14px] text-gray">
            Add Creators to your Bench — they shape your daily Edition.
          </p>
        </div>
        <CreatorsClient creators={CREATORS} />
      </div>
    </>
  );
}
