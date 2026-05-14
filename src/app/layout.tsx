import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "CipherSage — Master On-Chain Privacy & Earn Your Badge",
  description:
    "An interactive educational game about Fhenix and Fully Homomorphic Encryption. Play through 7 topics, level up from Beginner to Master, and mint a soulbound NFT badge.",
  keywords: ["CipherSage", "Fhenix", "FHE", "blockchain privacy", "CoFHE", "Web3 education", "NFT badge"],
  openGraph: {
    title: "CipherSage — Master On-Chain Privacy",
    description: "Level up from Beginner to Master on Fhenix & FHE. Earn a soulbound NFT badge that lives on-chain forever.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CipherSage",
    description: "The interactive game that teaches you everything about Fhenix and on-chain privacy. Earn your badge.",
    site: "@Fhenix_io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: '#0A0B14' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
