import type { Metadata } from "next";
import { Libre_Bodoni, Nunito_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { DevNav } from "@/components/dev-nav";
import { BenchProvider } from "@/lib/bench-context";
import "./globals.css";

const bodoni = Libre_Bodoni({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solmae",
  description: "A curated community for women leaders, experts, and creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", bodoni.variable, nunito.variable)}>
      <body className="min-h-full flex flex-col pt-[41px]">
        <DevNav />
        <BenchProvider>
          {children}
        </BenchProvider>
      </body>
    </html>
  );
}
