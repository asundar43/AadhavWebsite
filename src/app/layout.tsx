import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aadhav Sundar | Building things I wish existed",
  description: "Georgia Tech builder. Head of Engineering @ Interlock (Mark Cuban–backed). Founder of Auralis Technologies - software deployed in 50+ countries. Patent-pending AI for CAD automation.",
  keywords: ["Aadhav Sundar", "Georgia Tech", "Interlock Studios", "Auralis", "Mark Cuban", "AI", "Founder", "CAD automation"],
  authors: [{ name: "Aadhav Sundar" }],
  applicationName: "Aadhav Sundar",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Aadhav Sundar",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Aadhav Sundar | Building things I wish existed",
    description: "Georgia Tech builder. Head of Engineering @ Interlock (Mark Cuban–backed). Founder of Auralis Technologies - software deployed in 50+ countries. Patent-pending AI for CAD automation.",
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
      <head>
        <title>Aadhav Sundar | Building things I wish existed</title>
        <meta name="apple-mobile-web-app-title" content="Aadhav Sundar | Building things I wish existed" />
        <meta property="og:title" content="Aadhav Sundar | Building things I wish existed" />
      </head>
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
