import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import { Metadata } from "next";
import FlipkartEcomClient from "./FlipkartEcomClient";

export const metadata: Metadata = {
    title: "Flipkart Seller Tools | Crop & Sort Labels by SKU",
    description:
        "Free Flipkart seller tools to crop shipping labels and sort PDFs by SKU or product label. Simplify order processing with fast, secure, and easy-to-use tools made for Flipkart sellers.",
    keywords: [
        "flipkart tools",
        "flipkart lable crop",
        "flipkart seller tools",
        "flipkart label cropper",
        "crop flipkart pdf labels",
        "sort pdf by sku",
        "flipkart order management",
        "flipkart label sorter",
        "flipkart pdf tools",
        "flipkart shipping label crop",
        "seller utilities"
    ],
    openGraph: {
        title: "Flipkart Seller Tools | Crop & Sort Labels by SKU",
        description:
            "Free online tools for Flipkart sellers — crop shipping labels, sort PDFs by SKU or product label, and organize your orders easily. Streamline your Flipkart seller workflow today.",
        url: `${siteConfig.url}/flipkart-tools`,
        siteName: siteConfig.name,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Flipkart Seller Tools | Crop & Sort Labels by SKU",
        description:
            "Crop and sort Flipkart shipping labels by SKU, manage your invoices, and organize PDFs easily — free tools made for Flipkart sellers.",
    },
};

const page = () => {
    return (
        <ToolWrapper>
            <FlipkartEcomClient />
        </ToolWrapper>
    );
};

export default page;
