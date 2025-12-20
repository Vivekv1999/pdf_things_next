import type { Metadata } from "next";
import { siteConfig } from "@/src/constants/appConstants";

export const metadata: Metadata = {
    title: "E-Commerce PDF Tools for Sellers | Flipkart & Meesho",
    description: "Free PDF tools for e-commerce sellers. Crop, resize, and sort labels for Flipkart, Meesho, and Amazon. Save time preparing shipments with our seller-friendly tools.",
    alternates: {
        canonical: `${siteConfig.url}/ecommerce`,
    },
};

export default function EcommerceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
