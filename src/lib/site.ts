export const site = {
  name: "Solmae",
  headline: "A Better Way for Women to Connect",
  dek: "Trusted discovery, community, and real-life connection.",
  description:
    "Solmae is a women-centered discovery and community platform where trusted insights, real connections, and great ideas come to life.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
};

export const pillars = [
  {
    id: "inspiration",
    number: "01",
    title: "Inspiration",
    mark: "eclipse" as const,
    tone: "periwinkle" as const,
    summary:
      "Discover what to try next — places, ideas, and experiences recommended by women you can actually trust.",
  },
  {
    id: "education",
    number: "02",
    title: "Education",
    mark: "vesica" as const,
    tone: "blush" as const,
    summary:
      "Ask real questions and learn from women who have been there. Taste and knowledge are the currency here.",
  },
  {
    id: "connection",
    number: "03",
    title: "Connection",
    mark: "halved" as const,
    tone: "peach" as const,
    summary:
      "Meet people, join clubs, and turn an online conversation into a table, a walk, a room you want to be in.",
  },
] as const;
