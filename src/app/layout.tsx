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
  description: "Georgia Tech builder. Mark Cuban-backed founder at Interlock Studios. Creator of Auralis—used in 30+ countries. Patent-pending AI for CAD automation.",
  keywords: ["Aadhav Sundar", "Georgia Tech", "Interlock Studios", "Auralis", "Mark Cuban", "AI", "Founder", "CAD automation"],
  authors: [{ name: "Aadhav Sundar" }],
  openGraph: {
    title: "Aadhav Sundar | Building things I wish existed",
    description: "Georgia Tech builder. Mark Cuban-backed founder. Creator of Auralis—used in 30+ countries.",
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
