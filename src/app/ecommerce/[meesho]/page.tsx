import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import { Metadata } from "next";
import MeeshoEcom from "./MeeshoEcom";

export const metadata: Metadata = {
    title: "Meesho Seller Tools | Merge & Sort PDFs by SKU Labels",
    description:
        "Free Meesho seller tools to merge invoices, sort PDFs by SKU or product label, and generate account labels instantly. Simple, secure, and fast for every Meesho seller.",
    keywords: [
        "meesho tools",
        "meesho seller tools",
        "meesho invoice merge",
        "sort pdf by sku",
        "meesho label generator",
        "meesho account label",
        "meesho pdf tools",
        "pdf merge for meesho",
        "meesho order management",
        "seller utilities"
    ],
    openGraph: {
        title: "Meesho Seller Tools | Merge & Sort PDFs by SKU Labels",
        description:
            "Free online tools for Meesho sellers — merge invoices, sort PDFs by SKU, and generate account labels instantly. Streamline your seller workflow today.",
        url: `${siteConfig.url}/meesho-tools`,
        siteName: siteConfig.name,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Meesho Seller Tools | Merge & Sort PDFs by SKU Labels",
        description:
            "Merge and sort Meesho invoices by SKU or label, generate account labels, and organize your PDF files easily — all free and online.",
    },
};

const page = () => {
    return (
        <ToolWrapper>
            <MeeshoEcom />
        </ToolWrapper>
    )
}

export default page
