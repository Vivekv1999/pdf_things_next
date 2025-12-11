import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
        {/* JSON-LD Structured Data for SEO */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://pdfthings.com/#website",
                  "url": "https://pdfthings.com",
                  "name": "PDF Things",
                  "description": "Free online PDF tools for merging, splitting, cropping PDFs and ecommerce label tools for Flipkart & Meesho sellers",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://pdfthings.com/?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://pdfthings.com/#organization",
                  "name": "PDF Things",
                  "url": "https://pdfthings.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://pdfthings.com/og-image.png"
                  },
                  "sameAs": []
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://pdfthings.com/#webapp",
                  "name": "PDF Things - Free PDF Tools",
                  "url": "https://pdfthings.com",
                  "applicationCategory": "Utility",
                  "operatingSystem": "Any",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  },
                  "featureList": [
                    "Merge PDF files",
                    "Split PDF documents",
                    "Crop PDF pages",
                    "Flipkart label sorter",
                    "Meesho label tool",
                    "SKU-based label sorting",
                    "Multi-account label processing"
                  ],
                  "screenshot": "https://pdfthings.com/og-image.png"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Meesho Label Sort",
                  "url": "https://pdfthings.com/ecommerce/meesho",
                  "description": "Sort Meesho labels by SKU for all accounts"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Flipkart Label Crop",
                  "url": "https://pdfthings.com/ecommerce/flipkart",
                  "description": "Crop and Sort Flipkart labels by SKU"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Merge PDF",
                  "url": "https://pdfthings.com/merge-pdf",
                  "description": "Combine multiple PDFs into one file"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Split PDF",
                  "url": "https://pdfthings.com/split-pdf",
                  "description": "Extract pages from your PDF"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Crop PDF",
                  "url": "https://pdfthings.com/crop-pdf",
                  "description": "Trim PDF margins"
                }
              ]
            })
          }}
        />

        <StoreProvider>
          <Applayout>
            {children}
          </Applayout>
        </StoreProvider>
      </body>
    </html>
  );
}
