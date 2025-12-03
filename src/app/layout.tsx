import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Aadhav Sundar | Building things I wish existed",
  description: "Founder, Engineer, and Builder. Creating products that solve real problems - from AI-powered orthotics to branching AI conversations.",
  keywords: ["Aadhav Sundar", "Georgia Tech", "Auralis Technologies", "BranchGPT", "Stride Labs", "AI", "Founder"],
  authors: [{ name: "Aadhav Sundar" }],
  openGraph: {
    title: "Aadhav Sundar | Building things I wish existed",
    description: "Founder, Engineer, and Builder. Creating products that solve real problems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
