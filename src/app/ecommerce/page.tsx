"use client";

import ToolWrapper from "@/src/components/ToolWrapper";
import ContentSection from "@/src/components/ContentSection";
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

                <ContentSection
                    title="Free One-Click PDF Tools for E-Commerce Sellers"
                    description="Essential PDF tools for Flipkart, Meesho, and Amazon sellers. Crop labels, sort by SKU, and manage shipping documents effortlessly."
                    toolName="Ecommerce PDF Tools"
                    toolPath="/ecommerce"
                    content={
                        <>
                            <p>
                                Running an e-commerce business on platforms like Flipkart, Meesho, or Amazon involves handling a mountain of shipping labels and invoices. Our <strong>E-Commerce PDF Tools</strong> are specifically designed to streamline this process. Save hours of manual work by automating the cropping, resizing, and sorting of your shipping documents with just a few clicks.
                            </p>

                            <h3>Boost Your Shipping Efficiency</h3>
                            <p>
                                Why waste time cutting labels with scissors or manually organizing files? Our suite of tools offers:
                            </p>
                            <ul>
                                <li><strong>Platform-Specific Presets:</strong> We have tailored solutions for major marketplaces. Instantly crop standard A4 label sheets into perfectly sized 4x6 or 6x4 thermal printer formats for Flipkart and Meesho.</li>
                                <li><strong>Smart Sorting:</strong> managing multi-account orders? Our tools can sort your label PDFs based on SKU or Order ID, making packing and dispatching significantly faster and error-free.</li>
                                <li><strong>Bulk Processing:</strong> Upload huge batches of label files at once. Our tool processes them in seconds, getting your shipments ready for pickup in record time.</li>
                            </ul>

                            <h3>Tools We Offer</h3>
                            <ul>
                                <li><strong>Reference Label Cropper:</strong> Automatically extract and resize shipping labels from mixed layout PDFs.</li>
                                <li><strong>Invoice Separator:</strong> Split bulk invoice files into individual documents for easier record-keeping.</li>
                                <li><strong>Manifest Generator:</strong> (Coming Soon) Create swift dispatch manifests based on your processed labels.</li>
                            </ul>

                            <h3>Why Choose Our Seller Tools?</h3>
                            <ul>
                                <li><strong>100% Free:</strong> Boost your business profit margins. We don't charge a subscription fee or take a commission.</li>
                                <li><strong>Secure Client-Side Processing:</strong> Your customer data and order details remain confidential. All processing happens locally on your machine.</li>
                                <li><strong>No Installation Needed:</strong> Access our tools from any computer with a browser. Perfect for warehouse operations.</li>
                            </ul>

                            <p>
                                Join thousands of smart online sellers who have optimized their dispatch workflow. Try our free E-Commerce PDF Tools today and ship faster!
                            </p>
                        </>
                    }
                    faqs={[
                        {
                            question: "Which marketplaces do you support?",
                            answer: "Our tools are optimized for the most popular Indian e-commerce platforms, including Flipkart, Meesho, and Amazon, with specific presets for their standard label formats."
                        },
                        {
                            question: "Is this tool free for commercial use?",
                            answer: "Yes! Our tools are completely free for all sellers, whether you process 10 orders a day or 10,000."
                        },
                        {
                            question: "Can I crop labels for thermal printers?",
                            answer: "Absolutely. One of our key features is converting standard A4 PDF labels into thermal-printer-friendly sizes (like 4x6 inches) instantly."
                        },
                        {
                            question: "Is my customer data safe?",
                            answer: "Your data security is guaranteed. We use client-side processing, meaning your PDF files containing customer addresses and order details never leave your computer."
                        },
                        {
                            question: "How many labels can I process at once?",
                            answer: "You can upload and process bulk files. Our optimized engine handles large documents smoothly, saving you significant time during peak sales seasons."
                        },
                        {
                            question: "Do you offer tools for sorting orders?",
                            answer: "Yes, our 'Sort by SKU' feature (check availability) allows you to reorder your PDF labels based on the product SKU, streamlining your packing process."
                        }
                    ]}
                />
            </main>
        </ToolWrapper >
    );
}
