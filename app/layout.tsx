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

export const metadata: Metadata = {
  metadataBase: new URL("https://app.16arena.com"),
  title: {
    default: "16Arena",
    template: "%s | 16Arena",
  },
  description: "Join squads, invites, and referrals on 16Arena.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "16Arena",
    description: "Join squads, invites, and referrals on 16Arena.",
    url: "https://app.16arena.com",
    siteName: "16Arena",
    type: "website",
    images: [{ url: "https://app.16arena.com/banner.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "16Arena",
    description: "Join squads, invites, and referrals on 16Arena.",
    images: ["https://app.16arena.com/banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
