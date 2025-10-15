import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import CropPdfClient from "./CropPdfClient";

export const metadata: Metadata = {
    title: "Crop PDF Online | Free & Fast",
    description:
        "Crop PDF pages to remove unwanted areas. Free, secure, and instant.",
    keywords: [
        "crop pdf",
        "pdf cropper",
        "online pdf tools",
        "crop pdf free",
        "crop pdf fast",
        "trim pdf pages",
        "remove pdf margins",
        "pdf page cutter",
        "resize pdf pages",
        "edit pdf online"
    ],
    openGraph: {
        title: "Crop PDF Online | Free & Fast",
        description:
            "Crop PDF pages to remove unwanted areas. Free, secure, and instant.",
        url: `${siteConfig.url}/crop-pdf`,
        siteName: siteConfig.name,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Crop PDF Online | Free & Fast",
        description:
            "Crop PDF pages to remove unwanted areas. Free, secure, and instant.",
    },
};

export default function Page() {
    return (
        <ToolWrapper>
            <CropPdfClient />
        </ToolWrapper>
    );
}
