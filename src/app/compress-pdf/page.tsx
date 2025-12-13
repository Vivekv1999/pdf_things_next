import ContentSection from "@/src/components/ContentSection";
import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import CompressPdfClient from "./CompressPdfClient";

export const metadata: Metadata = {
    title: "Compress PDF Online | Reduce PDF File Size Free",
    description:
        "Shrink your PDF file size by optimizing content. Free, secure, and works instantly — no signup required.",
    keywords: ["compress pdf", "reduce pdf size", "pdf optimizer", "pdf tools"],
    openGraph: {
        title: "Compress PDF Online | Reduce PDF File Size Free",
        description:
            "Optimize your PDF file size easily in the browser. Free, secure, and instant.",
        url: `${siteConfig.url}/compress-pdf`,
        siteName: siteConfig.name,
        type: "website",
    },
};

export default function Page() {
    return (
        <ToolWrapper>
            <CompressPdfClient />
            <ContentSection
                title="Compress PDF File Size Online"
                description="Easily reduce the size of your PDF documents while maintaining quality. Fast, free, and secure compression directly in your browser."
                toolName="Compress PDF"
                toolPath="/compress-pdf"
                content={
                    <>
                        <p>
                            Dealing with large PDF files can be frustrating, especially when you hit email attachment limits or struggle with slow upload speeds. Our <strong>Compress PDF tool</strong> is the perfect solution to significantly reduce your file size without compromising on readability. Whether you're a student submitting an assignment, a professional sharing a presentation, or simply trying to save storage space, our optimizer makes it happen instantly.
                        </p>

                        <h3>Why Compress Your PDF?</h3>
                        <p>
                            Optimizing your PDF documents offers several practical benefits:
                        </p>
                        <ul>
                            <li><strong>Easier Sharing:</strong> Smaller files are faster to email, upload, and share via messaging apps.</li>
                            <li><strong>Faster Loading:</strong> Compressed PDFs load quicker on websites and mobile devices, improving the viewing experience for your audience.</li>
                            <li><strong>Storage Savings:</strong> Reduce the clutter on your device or cloud storage by keeping your documents lean and efficient.</li>
                            <li><strong>Compliance:</strong> Meet strict file size requirements for online application portals, government forms, and submission systems.</li>
                        </ul>

                        <h3>Key Features</h3>
                        <ul>
                            <li><strong>Smart Compression:</strong> We use advanced algorithms to remove redundant data and optimize images, ensuring the smallest possible size with the best possible quality.</li>
                            <li><strong>Quality Retention:</strong> Your text remains pin-sharp. We focus on optimizing the elements that bloat file size (like high-res images) while keeping essential content clear.</li>
                            <li><strong>100% Secure:</strong> Privacy is key. The compression process happens entirely in your browser using client-side technology. Your file is never uploaded to a server.</li>
                            <li><strong>Instant Results:</strong> No waiting for uploads or server processing. The shrinkage happens right on your device in seconds.</li>
                            <li><strong>Free & Unlimited:</strong> Compress as many files as you need. There are no daily limits, hidden costs, or watermarks.</li>
                        </ul>

                        <h3>How to Compress a PDF</h3>
                        <ol>
                            <li><strong>Upload PDF:</strong> Click "Select PDF" or drag and drop your file into the designated area.</li>
                            <li><strong>Compress:</strong> The tool will automatically analyze and compress your document.</li>
                            <li><strong>Download:</strong> Once finished, you'll see the new file size. Click "Download" to save your optimized PDF.</li>
                        </ol>

                        <p>
                            Don't let large files slow you down. Try our free PDF Compressor today and experience the speed of lighter, more efficient documents.
                        </p>
                    </>
                }
                faqs={[
                    {
                        question: "Is this PDF compressor free?",
                        answer: "Yes, it is completely free to use. You can compress as many PDFs as you want without any charges."
                    },
                    {
                        question: "How much will my file size be reduced?",
                        answer: "The reduction depends on the content of your PDF. Files with many high-resolution images can often be reduced by 50% or more, while text-heavy documents may see a smaller but still significant reduction."
                    },
                    {
                        question: "Will the quality of my PDF get worse?",
                        answer: "Our smart compression balances size and quality. While there might be a slight reduction in image resolution (which is usually unnoticeable on screens), text quality remains 100% sharp."
                    },
                    {
                        question: "Is it safe to compress sensitive documents?",
                        answer: "Absolutely. We use client-side compression, meaning your file stays on your device throughout the entire process. We never see, copy, or store your documents."
                    },
                    {
                        question: "Can I compress multiple files at once?",
                        answer: "Currently, we focus on compressing one file at a time to ensure maximum browser performance and the best results for each individual document."
                    },
                    {
                        question: "Do I need to install software?",
                        answer: "No installation is required. Our tool works in your web browser on Windows, Mac, Linux, and mobile devices."
                    }
                ]}
            />
        </ToolWrapper>
    );
}
