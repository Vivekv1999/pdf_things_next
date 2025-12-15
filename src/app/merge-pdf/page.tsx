import ContentSection from "@/src/components/ContentSection";
import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import MergePdfClient from "./MergePdfClient";

export const metadata: Metadata = {
    title: "Merge PDF Online | Free & Secure PDF Merger Tool",
    description:
        "Easily merge multiple PDF files into one document. 100% free, secure, and instant — no signup required.",
    keywords: [
        "merge pdf",
        "pdf merger",
        "combine pdf",
        "merge pdf online",
        "pdf tools",
    ],
    openGraph: {
        title: "Merge PDF Online | Free & Secure PDF Merger Tool",
        description:
            "Combine multiple PDF files into a single document. Free, secure, and works instantly in your browser.",
        url: `${siteConfig.url}/merge-pdf`,
        siteName: siteConfig.name,
        type: "website",
    },
};

export default function Page() {
    return (
        <ToolWrapper>
            <MergePdfClient />
            <ContentSection
                title="Merge PDF Files Online for Free"
                description="The easiest way to combine multiple PDF files into a single, organized document. 100% free, secure, and fast."
                toolName="Merge PDF"
                toolPath="/merge-pdf"
                content={
                    <>
                        <p>
                            Organizing digital documents can quickly become chaotic when dealing with multiple separate files. Our <strong>Merge PDF tool</strong> offers a simple, efficient solution to combine your PDF documents into a single, cohesive file. Whether you&apos;re consolidating monthly reports, merging chapters of an ebook, or putting together a job application with various certificates, our tool streamlines your workflow instantly in your browser.
                        </p>

                        <h3>Why Merge PDF Files?</h3>
                        <p>
                            Merging PDFs is essential for better document management and sharing. Here&apos;s why you should use our tool:
                        </p>
                        <ul>
                            <li><strong>Unified Sharing:</strong> Send one professional file instead of cluttering your recipient&apos;s inbox with multiple attachments.</li>
                            <li><strong>Better Organization:</strong> Keep related documents together. Combine invoices, receipts, or project files into one master document for easier archiving.</li>
                            <li><strong>Enhanced Readability:</strong> Create a seamless reading experience by merging different sections or chapters into a continuous flow.</li>
                            <li><strong>Print Ready:</strong> Simplify the printing process by sending a single file to the printer, ensuring all pages are in the correct order.</li>
                        </ul>

                        <h3>Key Features</h3>
                        <ul>
                            <li><strong>Simple Drag & Drop:</strong> Our interface is designed for ease of use. Just drag your files into the tool, rearrange them as needed, and merge.</li>
                            <li><strong>Client-Side Security:</strong> Your privacy matters. We process files locally on your device, meaning your sensitive documents are never uploaded to our servers.</li>
                            <li><strong>Fast & Efficient:</strong> No need to wait for uploads or downloads. The merging process leverages your browser&apos;s speed for near-instant results.</li>
                            <li><strong>No File Limits:</strong> Merge as many PDFs as you need. We don&apos;t artificially restrict the number of files you can combine in a single session.</li>
                            <li><strong>Cross-Platform:</strong> Works perfectly on Windows, Mac, Linux, and mobile devices directly through your web browser.</li>
                        </ul>

                        <h3>How to Merge PDFs</h3>
                        <ol>
                            <li><strong>Select Files:</strong> Click &quot;Choose Files&quot; or drag and drop the PDFs you want to combine.</li>
                            <li><strong>Reorder Pages:</strong> Use our visual interface to drag and drop the files into your desired order.</li>
                            <li><strong>Merge:</strong> Click the &quot;Merge PDF&quot; button to combine them.</li>
                            <li><strong>Download:</strong> Your newly created single PDF file is ready for instant download.</li>
                        </ol>

                        <p>
                            Take control of your documents today. Experience the convenience of a clutter-free digital workspace with our fast and secure PDF merger.
                        </p>
                    </>
                }
                faqs={[
                    {
                        question: "Is it free to merge PDF files?",
                        answer: "Yes, our PDF merger is completely free to use. You can combine as many files as you like without any hidden costs or subscriptions."
                    },
                    {
                        question: "How many files can I combine at once?",
                        answer: "You can upload and merge multiple files in a single go. While browser memory is the only real limit, our tool handles typical batches of documents with ease and speed."
                    },
                    {
                        question: "Are my documents secure?",
                        answer: "Absolutely. We prioritize your privacy by using client-side processing. Your files never leave your computer and are not stored on any external servers."
                    },
                    {
                        question: "Can I change the order of the files?",
                        answer: "Yes! Before finalizing the merge, you can easily drag and drop the file thumbnails to arrange them in the exact order you want them to appear in the final document."
                    },
                    {
                        question: "Do I need to install software?",
                        answer: "No installation is needed. Our tool works entirely in your web browser, compatible with all major operating systems and devices."
                    },
                    {
                        question: "Will the quality of my PDF be reduced?",
                        answer: "No, our tool preserves the original quality of your documents. Text, images, and formatting remain intact in the merged file."
                    }
                ]}
            />
        </ToolWrapper>
    );
}
