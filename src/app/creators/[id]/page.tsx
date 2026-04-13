import { notFound } from "next/navigation";
import Link from "next/link";
import { AppNav } from "@/components/nav/app-nav";
import { Tag } from "@/components/ui/tag";
import { CREATORS, CONTENT_ITEMS } from "@/lib/seed-data";

export default async function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const creator = CREATORS.find(c => c.id === id);
  if (!creator) notFound();

  const items = CONTENT_ITEMS.filter(i => i.creatorId === id);

  return (
    <>
      <AppNav />

      {/* Profile header */}
      <div className="bg-white border-b border-lightgray px-14 py-13">
        <div className="max-w-[1248px] mx-auto grid gap-10 items-start" style={{ gridTemplateColumns: "160px 1fr auto" }}>
          {/* Avatar */}
          <div
            className="w-40 h-40 rounded-full flex items-center justify-center font-serif italic text-[56px] text-white overflow-hidden"
            style={creator.avatarColor ? { background: creator.avatarColor } : { background: "#CCCEEF" }}
          >
            {creator.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={creator.avatarUrl} alt={creator.name} className="w-full h-full object-cover object-top rounded-full" />
            ) : creator.initials}
          </div>

          {/* Info */}
          <div>
            <h1 className="font-serif text-[40px] font-normal text-nearblack tracking-[-0.5px] mb-1">{creator.name}</h1>
            <p className="text-[14px] text-gray mb-3.5">{creator.handle}</p>
            <p className="text-[15px] text-nearblack leading-[1.75] max-w-[540px] mb-5">{creator.bio}</p>
            <div className="flex gap-2 flex-wrap mb-4">
              {creator.socials.map(s => (
                <Link
                  key={s.label}
                  href={s.url}
                  className="flex items-center px-3 py-[5px] border border-lightgray rounded-[2px] text-[11px] font-semibold text-gray hover:border-nearblack hover:text-nearblack transition-all tracking-[0.3px]"
                >
                  {s.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {creator.topics.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>

          {/* Stats + follow */}
          <div className="text-right pt-2">
            <div className="mb-5">
              <div className="font-serif text-[36px] text-nearblack leading-none">{creator.followers}</div>
              <div className="text-[11px] text-gray tracking-[0.5px] mt-0.5">Instagram followers</div>
            </div>
            <button className="text-[11px] font-bold tracking-[0.8px] uppercase px-5 py-2 bg-nearblack border-[1.5px] border-nearblack text-white rounded-[2px] hover:bg-[#333] transition-colors cursor-pointer">
              Following
            </button>
          </div>
        </div>
      </div>

      {/* Content feed */}
      <div className="max-w-[1248px] mx-auto px-14 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-[24px] font-normal text-nearblack">
            {creator.name.split(" ")[0]}&apos;s Content on Solmae
          </h2>
          <span className="text-[13px] text-gray">{creator.postCount} posts</span>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-3 gap-5">
            {items.map(item => (
              <Link
                key={item.id}
                href={item.url}
                target="_blank"
                className="bg-white border border-lightgray overflow-hidden hover:-translate-y-[2px] transition-transform block"
              >
                {"imageUrl" in item && item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.title} className="w-full aspect-video object-cover" />
                ) : (
                  <div
                    className="w-full aspect-video flex items-center justify-center text-[28px]"
                    style={{ background: "imageColor" in item ? item.imageColor : "#E5E3DE" }}
                  >
                    {"imageEmoji" in item ? item.imageEmoji : ""}
                  </div>
                )}
                <div className="p-4">
                  <p className="text-[9px] font-bold tracking-[1.2px] uppercase text-gray mb-1.5">{item.format} · Repost</p>
                  <p className="font-serif text-[16px] font-normal text-nearblack leading-[1.35] mb-1.5">{item.title}</p>
                  <p className="text-[11px] text-gray">{item.date}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-[14px] text-gray">No content yet.</p>
        )}
      </div>
    </>
  );
}
