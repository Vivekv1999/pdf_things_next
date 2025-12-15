import Link from "next/link";
import Image from "next/image";
import { MoveRight, Calendar, User, ChevronLeft, Check, Shield, Zap, FileText } from "lucide-react";

export const metadata = {
    title: "How to Merge PDFs Online for Free - Secure & Private",
    description:
        "Learn how to combine multiple PDF files into one document instantly using our free, secure, and private online tool. No uploads required!",
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
    return (
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
                                src="/blog/how-to-merge-pdfs-hero.png"
                                alt="Merging PDF Documents"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                        </div>

                        <div className="p-8 sm:p-10 -mt-20 relative z-10">
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 border border-gray-100 dark:border-gray-700/50">
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {["Merge PDF", "Productivity"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 uppercase"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                                    How to Merge PDFs Online for Free - <span className="text-indigo-600">Secure & Private</span>
                                </h1>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6">
                                    <span className="flex items-center mr-6">
                                        <User className="w-4 h-4 mr-2 text-indigo-500" />
                                        PDF Things Team
                                    </span>
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                                        May 20, 2024
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Introduction */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-16 px-2">
                    <p className="lead text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        Merging PDF files is a common task for students, professionals, and anyone managing digital documents.
                        Whether you&apos;re combining invoices, organizing study notes, or putting together a project report, having a reliable tool is essential.
                    </p>
                    <p>
                        In this guide, we&apos;ll show you how to <strong>merge PDFs online for free</strong> using <Link href="/" className="text-indigo-600 no-underline hover:underline font-semibold">PDF Things</Link>.
                        Our platform uses local-first technology to ensure your documents never leave your computer.
                    </p>
                </div>

                {/* Privacy & Performance Note */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 sm:p-8 rounded-r-xl mb-16">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
                        Why Local Processing Matters for Your Privacy
                    </h3>
                    <div className="prose dark:prose-invert text-gray-700 dark:text-gray-300">
                        <p className="mb-4">
                            Before guiding you through the steps, it&apos;s crucial to understand <strong>why PDF Things is safer</strong> than standard online tools.
                            Most websites require you to upload your sensitive PDFs to their servers to process them. This creates a risk where your private data (bank statements, contracts, personal IDs) could be stored or leaked.
                        </p>
                        <p className="mb-4">
                            <strong>We do things differently.</strong> Our advanced engine processes your files <span className="font-semibold text-amber-700 dark:text-amber-400">100% locally on your device</span>.
                            This means your documents <strong>never leave your computer</strong>. It&apos;s as secure as using offline software, but with the convenience of a web browser.
                        </p>
                        <p className="text-sm italic opacity-80">
                            <strong>Note on Heavy Files:</strong> Because we prioritize your privacy by using your device&apos;s own processing power (instead of a powerful cloud server), you might notice that extremely large or complex PDF files take a moment to process.
                            We are actively optimizing our engine to handle heavier files in future updates, but for now, this slight trade-off guarantees you <strong>absolute data privacy</strong>.
                        </p>
                    </div>
                </div>

                {/* Steps Section */}
                <section className="mb-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 sm:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
                        How to Merge PDFs in 5 Simple Steps
                    </h2>
                    <div className="space-y-10 max-w-3xl mx-auto">
                        <Step
                            number={1}
                            title="Go to the Merge PDF Tool"
                            text={<span>Navigate to our free <Link href="/merge-pdf" className="text-indigo-600 font-medium hover:underline">Merge PDF Page</Link> to get started safely.</span>}
                        />
                        <Step
                            number={2}
                            title="Select Your Files"
                            text="Drag and drop your PDF files directly into the browser window, or click the 'Choose Files' button to select them from your computer."
                        />
                        <Step
                            number={3}
                            title="Reorder Pages"
                            text="Once uploaded, you can drag and drop the thumbnails to rearrange the order of your documents exactly how you want them in the final file."
                        />
                        <Step
                            number={4}
                            title="Merge Instantly"
                            text="Click the 'Merge PDF' button. Because we process locally, the merge happens instantly without any uploading wait time."
                        />
                        <Step
                            number={5}
                            title="Download Your File"
                            text="Your new combined PDF is ready immediately. Click download to save it to your device."
                        />
                    </div>
                    <div className="mt-12 text-center">
                        <Link
                            href="/merge-pdf"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:scale-105 shadow-lg shadow-indigo-200 dark:shadow-none"
                        >
                            Try Merge PDF Now
                            <MoveRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </section>

                {/* Benefits Grid */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 px-2">
                        Why Use PDF Things?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureBox
                            icon={Shield}
                            title="100% Private (Local)"
                            text="Your files are processed in your browser. They are never uploaded to our servers, ensuring maximum privacy for sensitive data."
                        />
                        <FeatureBox
                            icon={Zap}
                            title="Lightning Fast"
                            text="Zero upload or download time. The processing power of your own device makes merging split-second fast."
                        />
                        <FeatureBox
                            icon={Check}
                            title="Completely Free"
                            text="No hidden costs, no watermarks, and no sign-up required. Just open the tool and start working."
                        />
                    </div>
                </section>

                {/* Conclusion */}
                <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-8 sm:p-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Ready to Organize Your Documents?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        Stop wasting time with slow, unsafe online tools. Experience the speed and security of local PDF processing today.
                    </p>
                    <Link
                        href="/merge-pdf"
                        className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
                    >
                        <FileText className="w-5 h-5 mr-2" />
                        Start Merging PDFs
                    </Link>
                </section>

            </div>
        </article>
    );
}
