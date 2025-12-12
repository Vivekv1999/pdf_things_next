import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import PdfToJpgClient from "./PdfToJpgClient";

export const metadata: Metadata = {
    title: "PDF to JPG Converter | Free Online Tool",
    description: "Convert PDF pages to high-quality JPG images for free. Fast, secure, and easy to use.",
    keywords: [
        "pdf to jpg",
        "convert pdf to image",
        "pdf converter",
        "free pdf tool",
        "online pdf to jpg",
    ],
    openGraph: {
        title: "PDF to JPG Converter | Free Online Tool",
        description: "Convert PDF pages to high-quality JPG images for free. Fast, secure, and easy to use.",
        url: `${siteConfig.url}/pdf-to-jpg`,
        siteName: siteConfig.name,
        type: "website",
    },
};

export default function Page() {
    return (
        <ToolWrapper>
            <PdfToJpgClient />
        </ToolWrapper>
    );
}
