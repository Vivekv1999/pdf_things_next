import ContentSection from "@/src/components/ContentSection";
import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import SplitPdfClient from "./SplitPdfClient";

export const metadata: Metadata = {
    title: "Split PDF Online | Free & Fast",
    description:
        "Split PDF into multiple smaller files by page ranges. Free, secure, and instant.",
    keywords: [
        "split pdf",
        "pdf splitter",
        "online pdf tools",
        "split pdf free",
        "split pdf fast",
    ],
    openGraph: {
        title: "Split PDF Online | Free & Fast",
        description:
            "Split PDF into multiple smaller files by page ranges. Free, secure, and instant.",
        url: `${siteConfig.url}/split-pdf`,
        siteName: siteConfig.name,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Split PDF Online | Free & Fast",
        description:
            "Split PDF into multiple smaller files by page ranges. Free, secure, and instant.",
    },
};

export default function Page() {
    return (
        <ToolWrapper>
            <SplitPdfClient />
            <ContentSection
                title="Split PDF Files Online for Free"
                description="The fastest way to extract pages from your PDF or split large documents into smaller files. Secure, simple, and free."
                toolName="Split PDF"
                toolPath="/split-pdf"
                content={
                    <>
                        <p>
                            Large PDF files can be cumbersome to share and difficult to navigate. Our <strong>Split PDF tool</strong> gives you the power to extract exactly what you need. Whether you want to separate a single page, pull out a specific chapter, or divide a massive document into manageable chunks, our tool makes it effortless. All of this happens directly in your browser, ensuring efficiency and privacy.
                        </p>

                        <h3>Why Split PDF Documents?</h3>
                        <p>
                            Splitting PDFs is a crucial feature for tailoring your documents to specific needs:
                        </p>
                        <ul>
                            <li><strong>Targeted Sharing:</strong> Extract only the relevant pages from a large report to share with colleagues or clients, avoiding unnecessary information overload.</li>
                            <li><strong>File Size Management:</strong> Break down huge files into smaller pieces to meet email attachment limits or upload restrictions.</li>
                            <li><strong>Archive Organization:</strong> Separate invoices, receipts, or contracts effectively if they were scanned into a single bulk PDF.</li>
                            <li><strong>Personalized Use:</strong> Save specific articles or sections from a larger publication for easy reference later.</li>
                        </ul>

                        <h3>Key Features</h3>
                        <ul>
                            <li><strong>Visual Page Selection:</strong> No guessing games. See previews of every page and simply select the ranges or individual pages you want to extract.</li>
                            <li><strong>Multiple Split Modes:</strong> Choose to extract every page as a separate file or define custom ranges (e.g., pages 1-5, 8, 11-15).</li>
                            <li><strong>100% Private & Secure:</strong> We utilize client-side technology to process your files. Your sensitive data never leaves your device and is never uploaded to any server.</li>
                            <li><strong>Instant Processing:</strong> Because there are no uploads involved, splitting even large documents happens in seconds.</li>
                            <li><strong>Free & Unlimited:</strong> Split as many PDFs as you like at no cost. We don&apos;t limit the number of documents you can process.</li>
                        </ul>

                        <h3>How to Split a PDF</h3>
                        <ol>
                            <li><strong>Upload PDF:</strong> Click &quot;Select PDF&quot; or drag and drop your file to get started.</li>
                            <li><strong>Select Pages:</strong> multiple options are available. You can click on individual pages to select them or type in specific page ranges.</li>
                            <li><strong>Split:</strong> Once you&apos;ve defined your selection, click the &quot;Split PDF&quot; button.</li>
                            <li><strong>Download:</strong> Your new file(s) will be ready for download instantly. If multiple files are created, they&apos;ll be securely zipped for convenience.</li>
                        </ol>

                        <p>
                            Experience the freedom of precise document management. Try our free Split PDF tool today and take control of your file organization.
                        </p>
                    </>
                }
                faqs={[
                    {
                        question: "Is this PDF splitter free?",
                        answer: "Yes, our Split PDF tool is 100% free. You can use it as often as you need without any charges or hidden fees."
                    },
                    {
                        question: "Can I extract just one specific page?",
                        answer: "Absolutely. You can select a single page or any combination of specific pages and ranges to extract them into a new PDF document."
                    },
                    {
                        question: "Are my files safe?",
                        answer: "Your security is our priority. We use client-side processing, ensuring that your PDF files are handled entirely within your browser and are never sent to a remote server."
                    },
                    {
                        question: "Can I split a password-protected PDF?",
                        answer: "To split a secure PDF, you will first need to provide the password to unlock the document. Once unlocked, the tool can process it just like any other file."
                    },
                    {
                        question: "Is there a limit to the file size?",
                        answer: "Since processing is local, the limit depends on your device's browser capabilities. It can handle most standard and large documents with ease, though extremely huge files might take a little longer."
                    },
                    {
                        question: "Do I need to create an account?",
                        answer: "No account or registration is required. You can start splitting your PDFs immediately without providing any personal details."
                    }
                ]}
            />
        </ToolWrapper>
    );
}
