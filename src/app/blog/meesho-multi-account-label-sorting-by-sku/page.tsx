"use client";

import Link from "next/link";
import Image from "next/image";
import { MoveRight, Calendar, User, ChevronLeft, Users, SortAsc, Zap, Shield, ChevronDown } from "lucide-react";
import { useState } from "react";

function AccordionItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={onClick}
                className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">{question}</h3>
                <ChevronDown className={`w-5 h-5 text-indigo-600 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
}

function StatBox({ number, label }: { number: string; label: string }) {
    return (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{number}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
        </div>
    );
}

export default function BlogPost() {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "How does multi-account label sorting work?",
            answer: "Simply upload label PDFs from all your Meesho seller accounts at once. Our tool merges ALL labels from ALL accounts together and sorts them by SKU in one perfect sequence. For example, if you have 3 accounts, you don't need to sort each account individually - all SKUs are organized together regardless of which account they came from. Just upload, download, and print!"
        },
        {
            question: "Is my customer data safe with this tool?",
            answer: "Absolutely! We use 100% local processing - your PDF files never leave your computer. All sorting happens in your browser, ensuring complete privacy for your customer data and order information."
        },
        {
            question: "How much time can I save using this tool?",
            answer: "Sellers report saving 15-20 minutes per batch. Instead of printing all labels and manually sorting them physically, you get a pre-sorted PDF ready to print in the correct order."
        },
        {
            question: "Can I sort labels from unlimited Meesho accounts?",
            answer: "Yes! There's no limit on the number of Meesho seller accounts you can manage. Upload labels from 2, 5, 10, or more accounts - our tool handles them all seamlessly."
        },
        {
            question: "What if some labels don't have SKUs?",
            answer: "Our intelligent algorithm can handle mixed labels. Labels without clear SKUs will be grouped separately, and you'll get a clean, organized output regardless."
        },
        {
            question: "Is this tool really free?",
            answer: "Yes, completely free! No hidden costs, no subscriptions, no watermarks. We believe in helping Meesho sellers succeed without adding to their expenses."
        }
    ];

    // JSON-LD Schemas
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Meesho Multi-Account Label Sorting by SKU - Save Hours Daily",
        "description": "Learn how to manage multiple Meesho seller accounts and automatically sort shipping labels by SKU.",
        "image": "https://pdfthings.com/blog/meesho-hero.png",
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
        "datePublished": "2024-12-16",
        "dateModified": "2024-12-16"
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Sort Meesho Labels by SKU Across Multiple Accounts",
        "description": "Step-by-step guide to automatically sort Meesho shipping labels by SKU",
        "image": "https://pdfthings.com/blog/meesho-sorting-process.png",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Upload Labels from All Accounts",
                "text": "Drag and drop label PDFs from all your Meesho seller accounts into the tool.",
                "url": "https://pdfthings.com/ecommerce/meesho"
            },
            {
                "@type": "HowToStep",
                "name": "Automatic SKU Detection",
                "text": "The tool automatically detects and extracts SKU information from each label."
            },
            {
                "@type": "HowToStep",
                "name": "Smart Sorting",
                "text": "Labels are intelligently sorted by SKU across all accounts."
            },
            {
                "@type": "HowToStep",
                "name": "Download Sorted PDF",
                "text": "Get one perfectly organized PDF file ready for printing."
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

            <article className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Back link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-8 transition-colors text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Blog
                    </Link>

                    {/* Hero Section */}
                    <header className="mb-12">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                            <div className="relative h-64 sm:h-80 md:h-[400px] w-full">
                                <Image
                                    src="/blog/meesho-hero.png"
                                    alt="Meesho Multi-Account Label Sorting"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                            </div>

                            <div className="p-8 sm:p-10 -mt-20 relative z-10">
                                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 border border-gray-100 dark:border-gray-700/50">
                                    <div className="flex flex-wrap gap-3 mb-6">
                                        {["Meesho", "SKU Sorting", "Multi-Account", "Automation"].map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 uppercase"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                                        Meesho Multi-Account Label Sorting by <span className="text-purple-600">SKU</span>
                                    </h1>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                        Save 15-20 minutes per batch by automatically sorting shipping labels across all your Meesho seller accounts
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6">
                                        <span className="flex items-center mr-6">
                                            <User className="w-4 h-4 mr-2 text-purple-500" />
                                            PDF Things Team
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                                            December 16, 2024
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Stats Section */}
                    <section className="mb-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatBox number="15-20" label="Minutes Saved Per Batch" />
                            <StatBox number="100%" label="Accurate SKU Sorting" />
                            <StatBox number="Unlimited" label="Accounts Supported" />
                            <StatBox number="0₹" label="Completely Free" />
                        </div>
                    </section>

                    {/* Problem Statement */}
                    <section className="mb-16 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6 sm:p-8 rounded-r-xl">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            The Multi-Account Challenge
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Managing multiple Meesho seller accounts? You know the pain:
                        </p>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold mt-1">✗</span>
                                <span>Download labels from each account separately</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold mt-1">✗</span>
                                <span>Print all labels without organization</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold mt-1">✗</span>
                                <span>Manually sort physical labels by SKU - wasting 15-20 minutes</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 font-bold mt-1">✗</span>
                                <span>Risk mixing up orders and delaying shipments</span>
                            </li>
                        </ul>
                    </section>

                    {/* Solution Overview */}
                    <section className="mb-16 prose prose-lg dark:prose-invert max-w-none">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            The Smart Solution: Automatic SKU Sorting
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            What if you could upload labels from all your Meesho accounts at once and get them back perfectly sorted by SKU - ready to print in the correct order?
                            That&apos;s exactly what our <Link href="/ecommerce/meesho" className="text-purple-600 no-underline hover:underline font-semibold">Meesho Label Sorting Tool</Link> does.
                        </p>
                        <p>
                            <strong>Here&apos;s the magic:</strong> If you have 3 accounts, you don&apos;t need to sort each account&apos;s labels individually.
                            Our tool <strong>merges ALL labels from ALL 3 accounts together</strong> and sorts them by SKU in one perfect sequence.
                            All SKUs are organized together regardless of which account they came from - so you can just focus on your business!
                        </p>
                        <p>
                            Our tool uses intelligent SKU detection to automatically organize your shipping labels <strong>before</strong> you print them.
                            No more physical sorting, no more wasted time, no more errors.
                        </p>
                    </section>

                    {/* Process Infographic */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            How It Works
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-8">
                            <Image
                                src="/blog/meesho-sorting-process.png"
                                alt="Meesho Label Sorting Process"
                                width={1200}
                                height={600}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </section>

                    {/* Before/After Comparison */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            Before vs After
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            <Image
                                src="/blog/meesho-before-after.png"
                                alt="Before and After Using Meesho Label Sorting"
                                width={1200}
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>
                    </section>

                    {/* Key Features */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
                            Powerful Features
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl mb-4 inline-block">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Multi-Account Support</h3>
                                <p className="text-gray-600 dark:text-gray-300">Upload labels from unlimited Meesho seller accounts in one go. No restrictions.</p>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl mb-4 inline-block">
                                    <SortAsc className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart SKU Sorting</h3>
                                <p className="text-gray-600 dark:text-gray-300">Automatically detect and sort all labels by product SKU. Perfect organization every time.</p>
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-4 rounded-xl mb-4 inline-block">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Lightning Fast</h3>
                                <p className="text-gray-600 dark:text-gray-300">Process hundreds of labels in seconds. What took 20 minutes now takes less than a minute.</p>
                            </div>
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
                                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-4 rounded-xl mb-4 inline-block">
                                    <Shield className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">100% Secure & Private</h3>
                                <p className="text-gray-600 dark:text-gray-300">All processing happens in your browser. Your data never leaves your device.</p>
                            </div>
                        </div>
                    </section>

                    {/* Accordion FAQ Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openFaqIndex === index}
                                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 sm:p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Save Hours Every Day?
                        </h2>
                        <p className="text-purple-100 mb-8 max-w-2xl mx-auto text-lg">
                            Join thousands of smart Meesho sellers who have automated their label sorting workflow. Start shipping faster today!
                        </p>
                        <Link
                            href="/ecommerce/meesho"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-purple-600 bg-white rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
                        >
                            Try Meesho Label Sorting Now
                            <MoveRight className="ml-2 w-5 h-5" />
                        </Link>
                        <p className="mt-6 text-sm text-purple-200">
                            100% Free • No Sign-up Required • Unlimited Accounts
                        </p>
                    </section>

                </div>
            </article>
        </>
    );
}
