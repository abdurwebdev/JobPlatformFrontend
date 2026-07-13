import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Optimized Global Metadata to resolve all inspector warnings
export const metadata: Metadata = {
  // 1. Standard Browser & Search Engine Tags (Optimized lengths)
  title: "Explore Tech Careers & Remote Openings | Rozgar App",
  description: "Browse hundreds of verified operational profiles, engineering roles, and global remote opportunities on Rozgar App. Filter by domain, salary, and location.",
  
  // 2. OpenGraph Tags (Facebook, Discord, LinkedIn, Slack)
  openGraph: {
    title: "Explore Tech Careers & Remote Openings | Rozgar App",
    description: "Browse hundreds of verified operational profiles, engineering roles, and global remote opportunities on Rozgar App.",
    type: "website",
    url: "https://job-platform-frontend-62ud.vercel.app",
    siteName: "Rozgar App", // Fixes the anonymous card warning on Discord
    images: [
      {
        url: "https://drive.google.com/file/d/16bMp-KhP9PBwFVohsI2HHIQafekZ4Pvr/view?usp=sharing", // Replace with your actual preview file path
        width: 1200,
        height: 630,
        alt: "Rozgar App Job Board Terminal Preview",
      },
    ],
  },

  // 3. Twitter / X Cards
  twitter: {
    card: "summary_large_image", // Forces full-width visual layout on X feeds
    title: "Explore Tech Careers & Remote Openings | Rozgar App",
    description: "Browse hundreds of verified operational profiles, engineering roles, and global remote opportunities on Rozgar App.",
    images: ["https://drive.google.com/file/d/16bMp-KhP9PBwFVohsI2HHIQafekZ4Pvr/view?usp=sharing"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}