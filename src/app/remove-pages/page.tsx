import ContentSection from "@/src/components/ContentSection";
import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import RemovePagesClient from "./RemovePagesClient";

export const metadata: Metadata = {
    title: "Remove PDF Pages Online | Free & Fast",
    description:
        "Remove unwanted pages from your PDF documents. Free, secure, and instant page deletion tool.",
    keywords: [
        "remove pdf pages",
        "delete pdf pages",
        "pdf page remover",
        "online pdf tools",
        "remove pages from pdf",
        "delete pages pdf free",
        "pdf page deletion",
        "remove blank pages pdf",
        "extract pdf pages",
        "pdf editor online"
    ],
    openGraph: {
        title: "Remove PDF Pages Online | Free & Fast",
        description:
            "Remove unwanted pages from your PDF documents. Free, secure, and instant page deletion tool.",
        url: `${siteConfig.url}/remove-pages`,
        siteName: siteConfig.name,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Remove PDF Pages Online | Free & Fast",
        description:
            "Remove unwanted pages from your PDF documents. Free, secure, and instant page deletion tool.",
    },
};

export default function Page() {
    return (
        <ToolWrapper>
            <RemovePagesClient />
            <ContentSection
                title="Remove PDF Pages Online for Free"
                description="Easily delete unwanted pages from your PDF documents. Select specific pages to remove and download your cleaned PDF instantly."
                toolName="Remove PDF Pages"
                toolPath="/remove-pages"
                content={
                    <>
                        <p>
                            Sometimes PDF documents contain unnecessary pages that clutter your files or include sensitive information you need to remove. Our <strong>Remove PDF Pages tool</strong> gives you complete control to delete any unwanted pages from your documents quickly and securely. Whether you need to remove blank pages, delete confidential sections, or simply clean up a document, our tool makes it effortless. All processing happens directly in your browser, ensuring your privacy and security.
                        </p>

                        <h3>Why Remove PDF Pages?</h3>
                        <p>
                            Removing pages from PDFs is essential for creating clean, professional documents:
                        </p>
                        <ul>
                            <li><strong>Privacy Protection:</strong> Delete pages containing sensitive or confidential information before sharing documents with others.</li>
                            <li><strong>File Size Reduction:</strong> Remove unnecessary pages to reduce file size, making documents easier to email and faster to upload.</li>
                            <li><strong>Professional Presentation:</strong> Eliminate blank pages, cover sheets, or irrelevant content to create polished, focused documents.</li>
                            <li><strong>Document Organization:</strong> Clean up scanned documents by removing duplicate pages, separator sheets, or scanning artifacts.</li>
                            <li><strong>Compliance Requirements:</strong> Remove specific pages to meet regulatory or contractual requirements for document sharing.</li>
                        </ul>

                        <h3>Key Features</h3>
                        <ul>
                            <li><strong>Visual Page Selection:</strong> See thumbnail previews of every page and select exactly which ones to remove with simple checkboxes.</li>
                            <li><strong>Flexible Selection Options:</strong> Choose individual pages, select page ranges, or use &quot;Select All&quot; for quick bulk operations.</li>
                            <li><strong>100% Private & Secure:</strong> We use client-side processing technology. Your PDF files never leave your device and are never uploaded to any server.</li>
                            <li><strong>Instant Processing:</strong> Because everything happens locally in your browser, page removal is completed in seconds, even for large documents.</li>
                            <li><strong>Free & Unlimited:</strong> Remove pages from as many PDFs as you need at no cost. No registration, no limits, no hidden fees.</li>
                            <li><strong>Quality Preservation:</strong> The remaining pages maintain their original quality, formatting, and resolution after removal.</li>
                        </ul>

                        <h3>How to Remove Pages from a PDF</h3>
                        <ol>
                            <li><strong>Upload PDF:</strong> Click &quot;Select PDF&quot; or drag and drop your file into the tool to get started.</li>
                            <li><strong>Select Pages to Remove:</strong> View all pages as thumbnails and check the boxes next to pages you want to delete. You can also enter page ranges or use selection shortcuts.</li>
                            <li><strong>Remove Pages:</strong> Once you&apos;ve selected all unwanted pages, click the &quot;Remove Pages&quot; button to process your document.</li>
                            <li><strong>Download:</strong> Your cleaned PDF will be ready for download instantly, containing only the pages you want to keep.</li>
                        </ol>

                        <p>
                            Take control of your PDF documents with precision. Try our free Remove PDF Pages tool today and create cleaner, more professional files in seconds.
                        </p>
                    </>
                }
                faqs={[
                    {
                        question: "Is this PDF page removal tool free?",
                        answer: "Yes, our Remove PDF Pages tool is completely free to use. You can remove pages from unlimited PDF files without any charges, registration, or hidden fees."
                    },
                    {
                        question: "Are my files safe and private?",
                        answer: "Absolutely. We prioritize your security by using client-side processing. Your PDF files are processed entirely within your browser and never uploaded to our servers or any third party. Your documents remain completely private."
                    },
                    {
                        question: "Can I remove multiple pages at once?",
                        answer: "Yes! You can select and remove as many pages as you want in a single operation. Use checkboxes to select individual pages, enter page ranges like '1-5, 8, 10-12', or use 'Select All' to quickly choose multiple pages."
                    },
                    {
                        question: "Will removing pages affect the quality of my PDF?",
                        answer: "No, the remaining pages in your PDF will maintain their original quality, resolution, and formatting. We only remove the selected pages without modifying or compressing the content you keep."
                    },
                    {
                        question: "Can I remove pages from a password-protected PDF?",
                        answer: "To remove pages from a password-protected PDF, you will first need to provide the password to unlock the document. Once unlocked, you can select and remove pages just like any other PDF file."
                    },
                    {
                        question: "Is there a limit to the file size or number of pages?",
                        answer: "Since processing happens locally in your browser, the limit depends on your device's capabilities. Our tool can handle most standard and large PDF documents with ease, though extremely large files may take a bit longer to process."
                    }
                ]}
            />
        </ToolWrapper>
    );
}
