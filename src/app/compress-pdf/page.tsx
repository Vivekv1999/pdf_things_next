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
    alternates: {
        canonical: `${siteConfig.url}/compress-pdf`,
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
                            Dealing with large PDF files can be frustrating, especially when you hit email attachment limits or struggle with slow upload speeds. Our <strong>Compress PDF tool</strong> is the perfect solution to significantly reduce your file size without compromising on readability. Whether you&apos;re a student submitting an assignment, a professional sharing a presentation, or simply trying to save storage space, our optimizer makes it happen instantly.
                        </p>

                        <h3>Why Choose Our Browser-Based Compressor?</h3>
                        <p>
                            Unlike traditional online PDF compressors that upload your files to remote servers, our tool operates <strong>entirely in your browser</strong>. This means:
                        </p>
                        <ul>
                            <li><strong>Zero Server Upload:</strong> Your PDF never leaves your device. The compression happens locally using advanced JavaScript technology, ensuring complete privacy.</li>
                            <li><strong>No Data Storage:</strong> We don&apos;t store, copy, or even see your files. Once you close the browser tab, everything is gone from memory.</li>
                            <li><strong>Works Offline:</strong> After the initial page load, you can compress PDFs even without an internet connection (in supported browsers).</li>
                            <li><strong>Instant Processing:</strong> No waiting for uploads or downloads from servers. Compression starts immediately after you select your file.</li>
                            <li><strong>Unlimited File Size:</strong> Since processing happens on your device, there are no arbitrary file size limits imposed by server constraints.</li>
                        </ul>

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
                            <li><strong>100% Private & Secure:</strong> Privacy is our priority. The compression process happens entirely in your browser using client-side technology. Your file is never uploaded to a server, never stored, and never seen by anyone.</li>
                            <li><strong>Instant Results:</strong> No waiting for uploads or server processing. The shrinkage happens right on your device in seconds.</li>
                            <li><strong>Free & Unlimited:</strong> Compress as many files as you need. There are no daily limits, hidden costs, or watermarks.</li>
                            <li><strong>Cross-Platform:</strong> Works on Windows, Mac, Linux, Android, and iOS. Any device with a modern browser can compress PDFs.</li>
                        </ul>

                        <h3>How to Compress a PDF</h3>
                        <ol>
                            <li><strong>Upload PDF:</strong> Click &quot;Select PDF&quot; or drag and drop your file into the designated area. Your file stays on your device.</li>
                            <li><strong>Adjust Compression:</strong> Use the slider to choose your desired compression level. See real-time estimates of the final file size.</li>
                            <li><strong>Compress & Download:</strong> Click the button to start compression. The optimized PDF downloads automatically to your device.</li>
                        </ol>

                        <p>
                            Don&apos;t let large files slow you down. Try our free, privacy-focused PDF Compressor today and experience the speed of lighter, more efficient documents — all without uploading your files to any server.
                        </p>
                    </>
                }
                faqs={[
                    {
                        question: "Is this PDF compressor free?",
                        answer: "Yes, it is completely free to use with no hidden costs. You can compress as many PDFs as you want, with no daily limits, no watermarks, and no registration required. Since everything runs in your browser, we don't have server costs to pass on to you."
                    },
                    {
                        question: "How is this different from other online PDF compressors?",
                        answer: "Unlike traditional online compressors that upload your files to their servers, our tool works entirely in your browser. Your PDF never leaves your device, ensuring complete privacy. There's no waiting for uploads/downloads, no file size limits, and you can even use it offline after the initial page load."
                    },
                    {
                        question: "How much will my file size be reduced?",
                        answer: "The reduction depends on the content of your PDF. Files with many high-resolution images can often be reduced by 50% or more, while text-heavy documents may see a smaller but still significant reduction. Our smart compression slider lets you control the balance between file size and quality."
                    },
                    {
                        question: "Will the quality of my PDF get worse?",
                        answer: "Our smart compression balances size and quality. While there might be a slight reduction in image resolution (which is usually unnoticeable on screens), text quality remains 100% sharp. You can adjust the compression level using the slider to find the perfect balance for your needs."
                    },
                    {
                        question: "Is it safe to compress sensitive documents?",
                        answer: "Absolutely. This is the safest way to compress PDFs online. We use client-side compression, meaning your file stays on your device throughout the entire process. We never see, copy, store, or upload your documents to any server. Once you close the browser tab, everything is gone from memory. Perfect for confidential business documents, personal files, or sensitive information."
                    },
                    {
                        question: "Do I need to install software?",
                        answer: "No installation is required. Our tool works directly in your web browser on Windows, Mac, Linux, Android, and iOS. Just visit the page and start compressing. After the initial page load, you can even use it offline in supported browsers."
                    }
                ]}
            />
        </ToolWrapper>
    );
}
