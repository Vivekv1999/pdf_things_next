import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import CompressPdf from "./CompressPdf";

export const metadata: Metadata = {
    title: "Compress PDF Online | Reduce PDF File Size Free",
    description:
        "Shrink your PDF file size by optimizing content. Free, secure, and works instantly — no signup required.",
    keywords: ["compress pdf", "reduce pdf size", "pdf optimizer", "pdf tools"],
    openGraph: {
        title: "Compress PDF Online | Reduce PDF File Size Free",
        description:
            "Optimize your PDF file size easily in the browser. Free, secure, and instant.",
        url: `${siteConfig.url}/compress-pdf`,
        siteName: siteConfig.name,
        type: "website",
    },
};

export default function Page() {
    return (
        <ToolWrapper>
            <CompressPdf />
        </ToolWrapper>
    );
}
