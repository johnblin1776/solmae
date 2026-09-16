import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Work_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { DevNav } from "@/components/dev-nav";
import { BenchProvider } from "@/lib/bench-context";
import { hasInternalAccess } from "@/lib/internal-access-server";
import { site } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Solmae",
    template: "%s",
  },
  description: site.description,
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const internal = await hasInternalAccess();

  return (
    <html
      lang="en"
      className={cn("h-full antialiased", playfair.variable, cormorant.variable, workSans.variable)}
    >
      <body
        className={cn("flex min-h-full flex-col", internal && "pt-[41px]")}
        style={{ "--dev-nav-h": internal ? "41px" : "0px" } as React.CSSProperties}
      >
        {internal ? <DevNav /> : null}
        <BenchProvider>{children}</BenchProvider>
      </body>
    </html>
  );
}
