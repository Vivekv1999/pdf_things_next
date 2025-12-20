import type { Metadata } from "next";
import { siteConfig } from "@/src/constants/appConstants";

export const metadata: Metadata = {
    title: `About ${siteConfig.name} | Free PDF Tools`,
    description: "Learn about PDF Things - a lightweight, fast, and privacy-focused toolkit for PDF processing. 100% browser-based with zero data collection.",
    alternates: {
        canonical: `${siteConfig.url}/about`,
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
