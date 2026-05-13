import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import AuthSessionSync from "@/src/components/AuthSessionSync";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "GreenPenny",
  description: "Wealth management, beautifully engineered.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased min-h-screen bg-navy text-slate-200 selection:bg-primary/30 selection:text-white font-sans">
        <AuthSessionSync />
        {children}
      </body>
    </html>
  );
}
