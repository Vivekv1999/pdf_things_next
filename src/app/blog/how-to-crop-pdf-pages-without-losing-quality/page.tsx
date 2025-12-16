import Link from "next/link";
import Image from "next/image";
import { MoveRight, Calendar, User, ChevronLeft, Check, Shield, Zap, Crop, Scissors } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to Crop PDF Pages Without Losing Quality - Free Online Tool",
    description:
        "Learn how to crop PDF pages perfectly without losing quality using our free, secure online tool. Local processing ensures your documents stay private. No uploads required!",
    keywords: ["crop pdf", "trim pdf", "pdf cropper", "crop pdf online", "pdf editing", "remove pdf margins"],
    authors: [{ name: "PDF Things Team" }],
    openGraph: {
        title: "How to Crop PDF Pages Without Losing Quality",
        description: "Crop PDF pages perfectly with our free, secure online tool. Local processing keeps your documents private.",
        url: "https://pdfthings.com/blog/how-to-crop-pdf-pages-without-losing-quality",
        siteName: "PDF Things",
        images: [
            {
                url: "/blog/how-to-crop-pdf-hero.png",
                width: 1200,
                height: 630,
                alt: "Crop PDF Pages Without Losing Quality",
            },
        ],
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "How to Crop PDF Pages Without Losing Quality",
        description: "Crop PDF pages perfectly with our free, secure online tool.",
        images: ["/blog/how-to-crop-pdf-hero.png"],
    },
    alternates: {
        canonical: "https://pdfthings.com/blog/how-to-crop-pdf-pages-without-losing-quality",
    },
};

function Step({ number, title, text }: { number: number; title: string; text: React.ReactNode }) {
    return (
        <div className="flex gap-4 sm:gap-6">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                {number}
            </div>
            <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {text}
                </p>
            </div>
        </div>
    );
}

function FeatureBox({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
        </div>
    )
}

export default function BlogPost() {
    // JSON-LD Schema for SEO
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "How to Crop PDF Pages Without Losing Quality",
        "description": "Learn how to crop PDF pages perfectly without losing quality using our free, secure online tool.",
        "image": "https://pdfthings.com/blog/how-to-crop-pdf-hero.png",
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
        "name": "How to Crop PDF Pages Without Losing Quality",
        "description": "Step-by-step guide to crop PDF pages using PDF Things",
        "image": "https://pdfthings.com/blog/how-to-crop-pdf-hero.png",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Go to the Crop PDF Tool",
                "text": "Navigate to the free Crop PDF page on PDF Things.",
                "url": "https://pdfthings.com/crop-pdf"
            },
            {
                "@type": "HowToStep",
                "name": "Upload Your PDF",
                "text": "Drag and drop your PDF file or click to select it from your computer."
            },
            {
                "@type": "HowToStep",
                "name": "Draw Crop Area",
                "text": "Click and drag on the PDF page to select the area you want to keep."
            },
            {
                "@type": "HowToStep",
                "name": "Adjust Crop Box",
                "text": "Fine-tune your selection by dragging the corner and edge handles."
            },
            {
                "@type": "HowToStep",
                "name": "Crop & Download",
                "text": "Click the 'Crop & Download' button to process and save your cropped PDF."
            }
        ]
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
                                    src="/blog/how-to-crop-pdf-hero.png"
                                    alt="Cropping PDF Pages Without Losing Quality"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                            </div>

                            <div className="p-8 sm:p-10 -mt-20 relative z-10">
                                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 border border-gray-100 dark:border-gray-700/50">
                                    <div className="flex flex-wrap gap-3 mb-6">
                                        {["Crop PDF", "PDF Editing", "Quality"].map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 uppercase"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                                        How to Crop PDF Pages <span className="text-indigo-600">Without Losing Quality</span>
                                    </h1>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6">
                                        <span className="flex items-center mr-6">
                                            <User className="w-4 h-4 mr-2 text-indigo-500" />
                                            PDF Things Team
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                                            December 16, 2024
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Introduction */}
                    <div className="prose prose-lg dark:prose-invert max-w-none mb-16 px-2">
                        <p className="lead text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            Need to remove unwanted margins, trim white space, or focus on a specific section of your PDF?
                            Cropping PDF pages is essential for creating professional documents, reducing file size, and improving readability.
                        </p>
                        <p>
                            In this comprehensive guide, we&apos;ll show you how to <strong>crop PDF pages without losing quality</strong> using <Link href="/" className="text-indigo-600 no-underline hover:underline font-semibold">PDF Things</Link>.
                            Our tool uses advanced local processing to ensure your documents remain pristine and private.
                        </p>
                    </div>

                    {/* Privacy & Performance Note */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 sm:p-8 rounded-r-xl mb-16">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
                            Your Privacy is Our Priority
                        </h3>
                        <div className="prose dark:prose-invert text-gray-700 dark:text-gray-300">
                            <p className="mb-4">
                                Unlike traditional online PDF tools that upload your files to remote servers, <strong>PDF Things processes everything locally in your browser</strong>.
                                This means your sensitive documents—whether they&apos;re contracts, invoices, or personal files—<span className="font-semibold text-amber-700 dark:text-amber-400">never leave your device</span>.
                            </p>
                            <p className="mb-4">
                                <strong>Quality preservation is guaranteed.</strong> Our cropping engine maintains the original PDF resolution and quality because we work directly with the PDF structure,
                                not by converting to images and back. You get pixel-perfect results every time.
                            </p>
                            <p className="text-sm italic opacity-80">
                                <strong>Performance Note:</strong> Local processing means we use your device&apos;s power instead of cloud servers.
                                While this ensures absolute privacy, very large PDFs may take a moment to process. We&apos;re continuously optimizing for better performance!
                            </p>
                        </div>
                    </div>

                    {/* Steps Section */}
                    <section className="mb-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 sm:p-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
                            How to Crop PDF Pages in 5 Simple Steps
                        </h2>
                        <div className="space-y-10 max-w-3xl mx-auto">
                            <Step
                                number={1}
                                title="Go to the Crop PDF Tool"
                                text={<span>Navigate to our free <Link href="/crop-pdf" className="text-indigo-600 font-medium hover:underline">Crop PDF Page</Link> to get started securely.</span>}
                            />
                            <Step
                                number={2}
                                title="Upload Your PDF"
                                text="Drag and drop your PDF file directly into the browser window, or click to select it from your computer. The file is processed locally—no uploading to servers."
                            />
                            <Step
                                number={3}
                                title="Draw Crop Area"
                                text="Click and drag on the PDF page to select the area you want to keep. A semi-transparent overlay will show you exactly what will be removed."
                            />
                            <Step
                                number={4}
                                title="Adjust Crop Box"
                                text="Fine-tune your selection by dragging the corner and edge handles. The crop box is constrained to the page boundaries to prevent errors."
                            />
                            <Step
                                number={5}
                                title="Crop & Download"
                                text="Click the 'Crop & Download' button. Your cropped PDF is processed instantly and downloads automatically with perfect quality preservation."
                            />
                        </div>
                        <div className="mt-12 text-center">
                            <Link
                                href="/crop-pdf"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:scale-105 shadow-lg shadow-indigo-200 dark:shadow-none"
                            >
                                Try Crop PDF Now
                                <MoveRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </section>

                    {/* Benefits Grid */}
                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 px-2">
                            Why Use PDF Things for Cropping?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <FeatureBox
                                icon={Shield}
                                title="100% Private & Secure"
                                text="Your PDFs are processed entirely in your browser. No uploads, no cloud storage, no data collection. Your files stay on your device."
                            />
                            <FeatureBox
                                icon={Zap}
                                title="No Quality Loss"
                                text="Our advanced PDF engine works directly with the PDF structure, preserving original quality. No image conversion, no compression artifacts."
                            />
                            <FeatureBox
                                icon={Check}
                                title="Completely Free"
                                text="No hidden costs, no watermarks, no sign-up required. Professional-grade PDF cropping available to everyone, instantly."
                            />
                        </div>
                    </section>

                    {/* Use Cases */}
                    <section className="mb-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 sm:p-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            Common Use Cases for PDF Cropping
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                                <div className="flex items-start gap-4">
                                    <Scissors className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Remove Margins</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">Trim excessive white space from scanned documents or PDFs with large margins.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                                <div className="flex items-start gap-4">
                                    <Crop className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Extract Sections</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">Focus on specific charts, tables, or content areas from larger documents.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                                <div className="flex items-start gap-4">
                                    <Check className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Standardize Sizes</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">Create uniform page sizes across multiple PDFs for professional presentations.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                                <div className="flex items-start gap-4">
                                    <Zap className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">Reduce File Size</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">Smaller page dimensions mean smaller file sizes, perfect for email attachments.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Conclusion */}
                    <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-8 sm:p-12 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Ready to Crop Your PDFs?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Experience the perfect combination of quality, privacy, and ease. Start cropping your PDFs in seconds with our free online tool.
                        </p>
                        <Link
                            href="/crop-pdf"
                            className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
                        >
                            <Crop className="w-5 h-5 mr-2" />
                            Start Cropping PDFs Now
                        </Link>
                    </section>

                </div>
            </article>
        </>
    );
}
