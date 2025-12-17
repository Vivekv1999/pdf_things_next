"use client";

import { Calendar, ChevronLeft, ChevronRight, Crop, Download, Layers, Minus, Plus, Shield, SortAsc, User, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-3 font-semibold transition-all ${active
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                } rounded-lg`}
        >
            {children}
        </button>
    );
}

function ExpandableCard({ icon: Icon, title, description, details }: { icon: any; title: string; description: string; details: string }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-6 flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
            >
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-3 rounded-lg flex-shrink-0">
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{description}</p>
                </div>
                <div className="flex-shrink-0">
                    {isExpanded ? (
                        <Minus className="w-5 h-5 text-orange-500" />
                    ) : (
                        <Plus className="w-5 h-5 text-orange-500" />
                    )}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-0"}`}>
                <div className="px-6 pb-6 pt-2 bg-gray-50 dark:bg-gray-900/50">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{details}</p>
                </div>
            </div>
        </div>
    );
}

function TimelineStep({ number, title, description }: { number: number; title: string; description: string }) {
    return (
        <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                    {number}
                </div>
                {number < 4 && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-orange-500 to-yellow-500 mx-auto mt-2" />
                )}
            </div>
            <div className="flex-1 pt-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{description}</p>
            </div>
        </div>
    );
}

export default function FlipkartBlogClient() {
    const [activeTab, setActiveTab] = useState("overview");

    const faqs = [
        {
            question: "How does the auto-crop feature work?",
            answer: "Our tool automatically detects the label boundaries in your Flipkart PDFs and crops them to the perfect shipping size. No manual measurement or cutting needed - just upload and let our algorithm handle the precise cropping!"
        },
        {
            question: "Can I really process multiple accounts in one click?",
            answer: "Yes! Upload label PDFs from all your Flipkart seller accounts at once. Our tool merges them all together, auto-crops each label to perfect size, sorts them by SKU, and gives you one organized PDF - all with a single click. It's that simple!"
        },
        {
            question: "Why is SKU sorting important for Flipkart sellers?",
            answer: "SKU sorting dramatically speeds up your packing process. When labels are sorted by SKU, you can pack all orders for the same product together, reducing errors and saving 20-30 minutes per batch. Flipkart doesn't provide this feature, so we built it for you!"
        },
        {
            question: "Is my customer data safe?",
            answer: "Absolutely! We use 100% local processing - your PDF files never leave your computer. All cropping, merging, and sorting happens in your browser. Your customer addresses and order details remain completely private on your device."
        },
        {
            question: "What size are the cropped labels?",
            answer: "Labels are cropped to standard shipping label size (approximately 4x6 inches) that fits perfectly on packages. The exact dimensions are optimized for Flipkart's label format, eliminating wasted paper and ensuring professional-looking packages."
        },
        {
            question: "How long does the processing take?",
            answer: "Processing is lightning-fast! For most batches (even with hundreds of labels from multiple accounts), the entire process - merge, crop, and sort - takes under 2 minutes. Much faster than manual cropping and sorting!"
        },
        {
            question: "Do I need to install any software?",
            answer: "No installation needed! Our tool runs entirely in your web browser. Just visit the page, upload your PDFs, and start processing. Works on any computer with a modern browser - perfect for warehouse operations."
        },
        {
            question: "Is this tool really free?",
            answer: "Yes, completely free! No hidden costs, no subscriptions, no watermarks on your labels. We believe in helping Flipkart sellers succeed without adding to their expenses. Process unlimited labels from unlimited accounts at no cost."
        }
    ];

    // JSON-LD Schemas
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Flipkart Label Auto-Crop & SKU Sort - One-Click Solution for Sellers",
        "description": "Complete guide to automatically crop Flipkart shipping labels and sort by SKU across multiple seller accounts with one click.",
        "image": "https://pdfthings.com/blog/flipkart-hero.png",
        "author": {
            "@type": "Organization",
            "name": "PDF Things Team"
        },
        "publisher": {
            "@type": "Organization",
            "name": "PDF Things",
            "logo": {
                "@type": "ImageObject",
                "url": "https://pdfthings.com/logo.png"
            }
        },
        "datePublished": "2024-12-17",
        "dateModified": "2024-12-17"
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Auto-Crop and Sort Flipkart Labels by SKU",
        "description": "Step-by-step guide to automatically crop and sort Flipkart shipping labels",
        "image": "https://pdfthings.com/blog/flipkart-one-click-process.png",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Upload Labels from All Accounts",
                "text": "Upload label PDFs from all your Flipkart seller accounts at once.",
                "url": "https://pdfthings.com/ecommerce/flipkart"
            },
            {
                "@type": "HowToStep",
                "name": "Auto-Merge All Accounts",
                "text": "The tool automatically merges all labels from all accounts together."
            },
            {
                "@type": "HowToStep",
                "name": "Auto-Crop to Perfect Size",
                "text": "Each label is automatically cropped to perfect shipping size."
            },
            {
                "@type": "HowToStep",
                "name": "Sort by SKU and Download",
                "text": "Labels are sorted by SKU and you get one organized PDF to download."
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Flipkart Label Auto-Crop & Sort Tool",
        "applicationCategory": "BusinessApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        },
        "description": "Free tool to automatically crop Flipkart shipping labels and sort by SKU across multiple seller accounts"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            <article className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Back link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-8 transition-colors text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Blog
                    </Link>

                    {/* Hero Section */}
                    <header className="mb-12">
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-200 dark:border-yellow-800">
                            <div className="relative h-64 sm:h-80 md:h-[400px] w-full">
                                <Image
                                    src="/blog/flipkart-hero.png"
                                    alt="Flipkart Auto-Crop and SKU Sort"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                            </div>

                            <div className="p-8 sm:p-10 -mt-20 relative z-10">
                                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 border-2 border-yellow-300 dark:border-yellow-700">
                                    <div className="flex flex-wrap gap-3 mb-6">
                                        {["Flipkart", "Auto-Crop", "SKU Sort", "One-Click"].map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-orange-300 uppercase"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                                        Flipkart Label Auto-Crop & SKU Sort - <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">One-Click Solution</span>
                                    </h1>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                        Automatically crop, merge, and sort Flipkart shipping labels from multiple accounts in one click. Save 20-30 minutes per batch!
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6">
                                        <span className="flex items-center mr-6">
                                            <User className="w-4 h-4 mr-2 text-orange-500" />
                                            PDF Things Team
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                                            December 17, 2025
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Tabbed Navigation */}
                    <div className="mb-12">
                        <div className="flex flex-wrap gap-3 justify-center mb-8">
                            <TabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
                                Overview
                            </TabButton>
                            <TabButton active={activeTab === "how-it-works"} onClick={() => setActiveTab("how-it-works")}>
                                How It Works
                            </TabButton>
                            <TabButton active={activeTab === "features"} onClick={() => setActiveTab("features")}>
                                Features
                            </TabButton>
                            <TabButton active={activeTab === "faqs"} onClick={() => setActiveTab("faqs")}>
                                FAQs
                            </TabButton>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-12 border border-gray-200 dark:border-gray-700">
                            {activeTab === "overview" && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                            The Flipkart Seller Challenge
                                        </h2>
                                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                                            If you&apos;re a Flipkart seller managing multiple accounts, you know the daily struggle:
                                        </p>
                                        <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6 rounded-r-lg mb-6">
                                            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-500 font-bold mt-1">✗</span>
                                                    <span><strong>Wrong Label Size:</strong> Flipkart labels print with extra margins - wasting paper and your time cutting them</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-500 font-bold mt-1">✗</span>
                                                    <span><strong>No SKU Sorting:</strong> Flipkart doesn&apos;t sort labels by SKU - you manually sort after printing</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-500 font-bold mt-1">✗</span>
                                                    <span><strong>Multi-Account Hassle:</strong> Download, crop, and sort labels separately for each account</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-red-500 font-bold mt-1">✗</span>
                                                    <span><strong>Time-Consuming:</strong> Spend 20-30 minutes per batch on manual work</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                            Our One-Click Solution
                                        </h2>
                                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                            Imagine uploading labels from all your Flipkart accounts and getting back one perfectly organized PDF - with every label auto-cropped to perfect size and sorted by SKU. That&apos;s exactly what our <Link href="/ecommerce/flipkart" className="text-orange-600 font-semibold hover:underline">Flipkart Label Tool</Link> does!
                                        </p>
                                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-l-4 border-green-500 p-6 rounded-r-lg">
                                            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-500 font-bold mt-1">✓</span>
                                                    <span><strong>Auto-Crop to Perfect Size:</strong> Every label cropped to exact shipping size - ready to print and stick</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-500 font-bold mt-1">✓</span>
                                                    <span><strong>Smart SKU Sorting:</strong> All labels sorted by SKU before printing - no manual sorting needed</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-500 font-bold mt-1">✓</span>
                                                    <span><strong>Multi-Account Merge:</strong> Upload all accounts → auto-merge, crop, and sort in one click</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-500 font-bold mt-1">✓</span>
                                                    <span><strong>One-Click Processing:</strong> All done in under 2 minutes - crop, merge, sort, download!</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "how-it-works" && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                            The One-Click Process
                                        </h2>
                                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                                            Our automated system handles everything for you. Here&apos;s exactly what happens when you click that button:
                                        </p>

                                        {/* Timeline */}
                                        <div className="max-w-2xl mx-auto mb-12">
                                            <TimelineStep
                                                number={1}
                                                title="Upload Labels from All Accounts"
                                                description="Drag and drop label PDFs from all your Flipkart seller accounts. No limit on the number of accounts or files."
                                            />
                                            <TimelineStep
                                                number={2}
                                                title="Auto-Merge All Accounts"
                                                description="Our system automatically merges all labels from all accounts into one unified document. No manual combining needed."
                                            />
                                            <TimelineStep
                                                number={3}
                                                title="Auto-Crop to Perfect Size"
                                                description="Each label is automatically detected and cropped to perfect shipping size. No wasted paper, no manual cutting."
                                            />
                                            <TimelineStep
                                                number={4}
                                                title="Sort by SKU and Download"
                                                description="All labels are sorted by SKU across all accounts. Download one perfectly organized PDF ready for printing!"
                                            />
                                        </div>

                                        {/* Process Image */}
                                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-2xl p-6 sm:p-8">
                                            <Image
                                                src="/blog/flipkart-one-click-process.png"
                                                alt="Flipkart One-Click Process"
                                                width={1200}
                                                height={600}
                                                className="w-full h-auto rounded-lg shadow-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "features" && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                            Powerful Features for Flipkart Sellers
                                        </h2>
                                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                                            Click on each feature to learn more about how it helps your business:
                                        </p>

                                        {/* Expandable Feature Cards */}
                                        <div className="space-y-4 mb-12">
                                            <ExpandableCard
                                                icon={Layers}
                                                title="Multi-Account Merge"
                                                description="Upload labels from unlimited Flipkart seller accounts in one go"
                                                details="Managing multiple Flipkart accounts? No problem! Upload label PDFs from 2, 5, 10, or more accounts at once. Our tool intelligently merges all labels together before processing, saving you from the hassle of managing each account separately. Perfect for sellers scaling their business across multiple accounts."
                                            />
                                            <ExpandableCard
                                                icon={Crop}
                                                title="Auto-Crop Labels"
                                                description="Automatically crop all labels to perfect shipping size"
                                                details="Flipkart labels often print with extra margins and white space. Our advanced algorithm automatically detects label boundaries and crops each one to the exact shipping size (approximately 4x6 inches). This eliminates paper waste, saves cutting time, and ensures professional-looking packages every time. No manual measurement or scissors needed!"
                                            />
                                            <ExpandableCard
                                                icon={SortAsc}
                                                title="Sort by SKU"
                                                description="First tool to sort Flipkart labels by SKU digitally"
                                                details="This is a game-changer! Flipkart doesn&apos;t provide SKU sorting, forcing sellers to manually organize labels after printing. Our tool sorts ALL labels by SKU across ALL accounts BEFORE you print. This means you can pack all orders for the same product together, dramatically reducing errors and saving 20-30 minutes per batch. Focus on packing, not sorting!"
                                            />
                                            <ExpandableCard
                                                icon={Zap}
                                                title="One-Click Processing"
                                                description="Merge, crop, and sort all labels with a single click"
                                                details="Simplicity at its finest. Upload your PDFs, click one button, and our system handles everything: merging all accounts, cropping every label to perfect size, sorting by SKU, and generating your final PDF. The entire process takes under 2 minutes for most batches. That&apos;s the power of automation!"
                                            />
                                            <ExpandableCard
                                                icon={Shield}
                                                title="100% Secure & Private"
                                                description="All processing happens locally in your browser"
                                                details="Your customer data security is our top priority. We use 100% local processing - your PDF files never leave your computer. All merging, cropping, and sorting happens right in your browser using advanced client-side technology. Your customer addresses, order details, and business information remain completely private on your device. No server uploads, no data storage, no privacy risks."
                                            />
                                            <ExpandableCard
                                                icon={Download}
                                                title="Instant Download"
                                                description="Get your perfectly organized PDF immediately"
                                                details="No waiting, no delays. As soon as processing completes, your perfectly cropped and sorted PDF is ready for download. Print it immediately and start packing your orders. The output is optimized for thermal printers and standard printers alike, ensuring crisp, clear labels every time."
                                            />
                                        </div>

                                        {/* Features Showcase Image */}
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
                                            <Image
                                                src="/blog/flipkart-features-showcase.png"
                                                alt="Flipkart Features Showcase"
                                                width={1200}
                                                height={600}
                                                className="w-full h-auto rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "faqs" && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                            Frequently Asked Questions
                                        </h2>
                                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto">
                                            Everything you need to know about our Flipkart label processing tool:
                                        </p>

                                        <div className="space-y-4">
                                            {faqs.map((faq, index) => (
                                                <div key={index} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-start gap-3">
                                                        <span className="text-orange-500 flex-shrink-0">Q{index + 1}.</span>
                                                        <span>{faq.question}</span>
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-9">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <section className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-2xl p-8 sm:p-12 text-center text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Save 20-30 Minutes Per Batch?
                        </h2>
                        <p className="text-yellow-100 mb-8 max-w-2xl mx-auto text-lg">
                            Join thousands of smart Flipkart sellers who have automated their label processing. Start shipping faster today with our one-click solution!
                        </p>
                        <Link
                            href="/ecommerce/flipkart"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-orange-600 bg-white rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                        >
                            Try Flipkart Label Tool Now
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </Link>
                        <p className="mt-6 text-sm text-yellow-100">
                            100% Free • No Sign-up Required • Unlimited Accounts • Instant Processing
                        </p>
                    </section>
                </div>
            </article>
        </>
    );
}
