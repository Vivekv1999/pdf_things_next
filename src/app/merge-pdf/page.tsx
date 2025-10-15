import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import MergePdfClient from "./MergePdfClient";

export const metadata: Metadata = {
    title: "Merge PDF Online | Free & Secure PDF Merger Tool",
    description:
        "Easily merge multiple PDF files into one document. 100% free, secure, and instant — no signup required.",
    keywords: [
        "merge pdf",
        "pdf merger",
        "combine pdf",
        "merge pdf online",
        "pdf tools",
    ],
    openGraph: {
        title: "Merge PDF Online | Free & Secure PDF Merger Tool",
        description:
            "Combine multiple PDF files into a single document. Free, secure, and works instantly in your browser.",
        url: `${siteConfig.url}/merge-pdf`,
        siteName: siteConfig.name,
        type: "website",
    },
};

export default function Page() {
    return (
        <ToolWrapper>
            <MergePdfClient />
        </ToolWrapper>
    );
}
