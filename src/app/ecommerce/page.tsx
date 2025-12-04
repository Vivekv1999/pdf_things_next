"use client";

import ToolWrapper from "@/src/components/ToolWrapper";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { EcommerceSteps } from "./EcommerceSteps";

const platforms = [
    {
        id: "meesho",
        title: "Meesho",
        description: "Crop and sort shipping labels for Meesho sellers.",
        color: "bg-purple-100 text-purple-700",
        icon: "/icons/meesho.png",
    },
    {
        id: "flipkart",
        title: "Flipkart",
        description: "Format Flipkart labels for faster dispatch.",
        color: "bg-yellow-100 text-yellow-700",
        icon: "/icons/flipkart.png",
    },
    // {
    //     id: "amazon",
    //     title: "Amazon",
    //     description: "Amazon FBA & FBM label cropping made easy.",
    //     color: "bg-blue-100 text-blue-700",
    //     icon: "/icons/amazon.png",
    // },
    // {
    //     id: "sort-by-sku",
    //     title: "Sort by SKU",
    //     description: "Automatically reorder PDFs by SKU or order ID.",
    //     color: "bg-green-100 text-green-700",
    //     icon: "/icons/sku.png",
    // },
];

export default function EcommercePage() {
    return (
        <ToolWrapper>
            <main className="mx-auto px-6 py-12 max-w-6xl">
                {/* Intro Section */}
                <section className="mb-12 text-center">
                    <h1 className="mb-4 font-bold text-gray-800 text-4xl">
                        E-Commerce PDF Tools for Sellers
                    </h1>
                    <p className="mx-auto max-w-2xl text-gray-600 text-lg">
                        Crop, resize, and sort labels for popular marketplaces like Meesho,
                        Flipkart, and Amazon. Save time preparing shipments with our
                        seller-friendly tools — free & no sign-up required.
                    </p>
                </section>

                {/* Cards Section */}
                <motion.div
                    className={`gap-6 grid grid-cols-1 md:grid-cols-2  ${platforms?.length > 2 ? "lg:grid-cols-3" : "mx-5"}`}
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: { staggerChildren: 0.15 },
                        },
                    }}
                >
                    {platforms.map((platform) => (
                        <motion.div
                            key={platform.id}
                            className="bg-gradient-to-br from-purple-100 to-purple-50 text-purple-700 rounded-xl"
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        >
                            <Link href={`/ecommerce/${platform.id}`}>
                                <div
                                    className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer flex flex-col items-center text-center ${platform.color}`}
                                >
                                    <div className="mb-4">
                                        <Image
                                            src={platform.icon}
                                            alt={platform.title}
                                            width={60}
                                            height={60}
                                            className="rounded-xl transition-transform hover:scale-110 duration-200"
                                        />
                                    </div>
                                    <h2 className="mb-2 font-semibold text-xl">{platform.title}</h2>
                                    <p className="opacity-80 text-sm">{platform.description}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <EcommerceSteps />

                {/* SEO Content Section */}
                <section className="mt-16 text-gray-700 text-center">
                    <h2 className="mb-3 font-bold text-2xl">Why Use Our Seller Tools?</h2>
                    <p className="mx-auto mb-6 max-w-3xl">
                        Preparing eCommerce shipments can be time-consuming. Our free online
                        tools let you crop labels, resize them to platform requirements, and
                        even sort PDFs by SKU — all in seconds. No software installs, no
                        hidden fees, just simple tools that work.
                    </p>
                </section>
            </main>
        </ToolWrapper >
    );
}
