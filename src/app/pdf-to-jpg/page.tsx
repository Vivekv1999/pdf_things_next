import ContentSection from "@/src/components/ContentSection";
import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import PdfToJpgClient from "./PdfToJpgClient";

export const metadata: Metadata = {
    title: "PDF to JPG Converter | Free Online Tool",
    description: "Convert PDF pages to high-quality JPG images for free. Fast, secure, and easy to use.",
    keywords: [
        "pdf to jpg",
        "convert pdf to image",
        "pdf converter",
        "free pdf tool",
        "online pdf to jpg",
        "extract images from pdf"
    ],
    openGraph: {
        title: "PDF to JPG Converter | Free Online Tool",
        description: "Convert PDF pages to high-quality JPG images for free. Fast, secure, and easy to use.",
        url: `${siteConfig.url}/pdf-to-jpg`,
        siteName: siteConfig.name,
        type: "website",
    },
    alternates: {
        canonical: `${siteConfig.url}/pdf-to-jpg`,
    },
};

export default function Page() {
    return (
        <ToolWrapper>
            <PdfToJpgClient />
            <ContentSection
                title="Convert PDF to JPG Online for Free"
                description="The best online tool to convert PDF documents to high-quality JPG images. Secure, fast, and easy to use with no file size limits."
                toolName="PDF to JPG Converter"
                toolPath="/pdf-to-jpg"
                content={
                    <>
                        <p>
                            In the digital age, flexibility with document formats is increasing in demand. Our <strong>PDF to JPG converter</strong> provides an efficient, seamless, and secure way to transform your PDF documents into high-quality image files. Whether you need to extract specific pages for a presentation, share a document on social media where PDFs aren&apos;t supported, or simply archive pages as images, our tool handles it all directly in your browser without the need for cumbersome software installations.
                        </p>

                        <h3>Why Convert PDF to JPG?</h3>
                        <p>
                            PDFs are great for maintaining formatting, but they aren&apos;t always the best choice for sharing or editing visual content. Converting your PDF to JPG offers several advantages:
                        </p>
                        <ul>
                            <li><strong>Easy Sharing:</strong> Images are universally visible on all devices and platforms, including those that might struggle with PDF viewers.</li>
                            <li><strong>Social Media Ready:</strong> Most social media platforms allow image uploads but not PDFs. Converting your pages lets you share your content instantly.</li>
                            <li><strong>Editable Assets:</strong> Once converted to an image, you can easily edit, crop, or filter the content using any standard photo editor.</li>
                            <li><strong>Reduced File Size:</strong> In some cases, converting specific pages to JPG can help in reducing the overall storage needed for archiving.</li>
                        </ul>

                        <h3>Key Features of Our Tool</h3>
                        <ul>
                            <li><strong>High-Resolution Output:</strong> We prioritize quality. Your resulting JPG images will retain clarity and detail, making them perfect for professional use.</li>
                            <li><strong>100% Secure & Private:</strong> Security is our top priority. Unlike other online converters that upload your sensitive documents to a server, our tool processes files locally on your device. Your data never leaves your computer.</li>
                            <li><strong>Lightning Fast:</strong> By leveraging your browser&apos;s processing power, we eliminate upload and download times for a near-instant conversion experience.</li>
                            <li><strong>No Limits:</strong> Convert as many files as you need. We don&apos;t impose daily limits, file size restrictions (within browser memory limits), or watermarks.</li>
                            <li><strong>Cross-Platform Compatibility:</strong> Whether you&apos;re on Windows, macOS, Linux, Android, or iOS, our tool works flawlessly across all modern browsers.</li>
                        </ul>

                        <h3>How to Convert PDF to JPG Online</h3>
                        <p>
                            We&apos;ve designed our interface to be intuitive and user-friendly. Follow these simple steps:
                        </p>
                        <ol>
                            <li><strong>Upload Your PDF:</strong> Click the &quot;Choose File&quot; button or drag and drop your PDF directly into the designated area.</li>
                            <li><strong>Preview Pages:</strong> Once loaded, you&apos;ll see a preview of all the pages in your document.</li>
                            <li><strong>Convert:</strong> Our tool processes the file instantly. You can then choose to download specific pages or grab them all at once as a ZIP file.</li>
                            <li><strong>Save:</strong> The high-quality images are saved directly to your device, ready for use.</li>
                        </ol>

                        <p>
                            Experience the freedom of versatile document management today with our free PDF to JPG converter. It&apos;s the smart, secure, and fast solution for all your conversion needs.
                        </p>
                    </>
                }
                faqs={[
                    {
                        question: "Is this PDF to JPG converter really free?",
                        answer: "Yes, it is 100% free. We believe in providing accessible tools for everyone. You won't find any hidden paywalls, premium-only features, or subscription requirements here."
                    },
                    {
                        question: "Is it safe to convert sensitive documents?",
                        answer: "Absolutely. We utilize advanced client-side technology, which means the conversion process happens entirely within your browser. detailed. Your confidential files are never uploaded to our servers, significantly reducing the risk of data breaches."
                    },
                    {
                        question: "Does the quality of the image decrease after conversion?",
                        answer: "We strive to maintain the highest possible fidelity. Our converter renders pages at high resolution to ensuring that test, graphics, and fine details usually remain crisp and clear in the resulting JPG files."
                    },
                    {
                        question: "Can I use this tool on my mobile phone?",
                        answer: "Yes! Our tool is fully responsive and compatible with mobile browsers on both iOS and Android. You can convert PDFs to images on the go without needing to install specific apps."
                    },
                    {
                        question: "Is there a limit to the file size I can upload?",
                        answer: "Since the processing happens on your device, the limit is largely determined by your browser's available memory. For most standard documents, you won't face any issues, though extremely large or complex files might take a bit longer to process."
                    },
                    {
                        question: "Can I convert multiple PDF files at the same time?",
                        answer: "To ensure optimal performance and stability within the browser environment, we currently support processing one file at a time. However, the process is so quick that you can sequentially convert multiple files in just a few moments."
                    }
                ]}
            />
        </ToolWrapper>
    );
}
