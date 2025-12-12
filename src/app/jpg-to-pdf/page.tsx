import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import JpgToPdfClient from "./JpgToPdfClient";

export const metadata: Metadata = {
    title: "JPG to PDF Converter | Free Online Tool",
    description: "Convert JPG, PNG, and other images to PDF. Combine multiple images into a single document for free.",
    keywords: [
        "jpg to pdf",
        "image to pdf",
        "convert images to pdf",
        "png to pdf",
        "combine images to pdf",
    ],
    openGraph: {
        title: "JPG to PDF Converter | Free Online Tool",
        description: "Convert JPG, PNG, and other images to PDF. Combine multiple images into a single document for free.",
        url: `${siteConfig.url}/jpg-to-pdf`,
        siteName: siteConfig.name,
        type: "website",
    },
};

export default function Page() {
    return (
        <ToolWrapper>
            <JpgToPdfClient />
        </ToolWrapper>
    );
}
