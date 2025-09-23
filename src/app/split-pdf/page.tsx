import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import SplitPdf from "./SplitPdf";

export const metadata: Metadata = {
    title: "Split PDF Online | Free & Fast",
    description:
        "Split PDF into multiple smaller files by page ranges. Free, secure, and instant.",
    keywords: [
        "split pdf",
        "pdf splitter",
        "online pdf tools",
        "split pdf free",
        "split pdf fast",
    ],
    openGraph: {
        title: "Split PDF Online | Free & Fast",
        description:
            "Split PDF into multiple smaller files by page ranges. Free, secure, and instant.",
        url: `${siteConfig.url}/split-pdf`,
        siteName: siteConfig.name,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Split PDF Online | Free & Fast",
        description:
            "Split PDF into multiple smaller files by page ranges. Free, secure, and instant.",
    },
};


export default function Page() {
    return (
        <>
            <ToolWrapper>
                <SplitPdf />
            </ToolWrapper>
        </>
    );
}
