import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Applayout from "../layout/Applayout";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDF Things - Free Online PDF Tools | Merge, Split, Crop & Convert PDF",
  description: "Free online PDF tools for everyone. Merge PDF, Split PDF, Crop PDF, and specialized ecommerce tools for Flipkart & Meesho sellers. 100% secure, browser-based processing. No upload, no registration required.",
  keywords: [
    "free pdf tools",
    "merge pdf",
    "split pdf",
    "crop pdf",
    "convert pdf online",
    "ecommerce pdf tools",
    "flipkart label sorter",
    "flipkart label crop",
    "flipkart multiple account label crop",
    "meesho label tool",
    "meesho label sort",
    "label sort by SKU",
    "meesho multiple account label sort",
    "pdf editor",
    "compress pdf"
  ],
  openGraph: {
    title: "PDF Things - Free Online PDF Tools",
    description: "Merge, Split, Crop PDF and more. 100% free, secure, and fast. No registration required.",
    type: "website",
    url: "https://pdfthings.com",
    images: [
      {
        url: "https://pdfthings.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PDF Things - Free Online PDF Tools",
      },
    ],
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <Applayout>
            {children}
          </Applayout>
        </StoreProvider>
      </body>
    </html>
  );
}
