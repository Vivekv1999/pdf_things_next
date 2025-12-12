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
                            Our <strong>PDF to JPG</strong> converter provides a seamless way to transform your PDF documents into high-quality image files. Whether you need to extract specific pages or convert an entire document, our tool handles it all directly in your browser.
                        </p>
                        <h3>Why Use Our PDF to JPG Tool?</h3>
                        <ul>
                            <li><strong>High Quality:</strong> We ensure your images retain their original resolution and clarity during conversion.</li>
                            <li><strong>Secure & Private:</strong> Your files are processed locally in your browser and are never uploaded to our servers, ensuring 100% privacy.</li>
                            <li><strong>Instant Conversion:</strong> No waiting queues or slow uploads. The conversion happens instantly using your device&apos;s processing power.</li>
                            <li><strong>Free & Unlimited:</strong> Use the tool as many times as you like without any hidden costs or watermarks.</li>
                        </ul>
                        <h3>How it Works</h3>
                        <p>
                            Using our tool is incredibly simple. Just drag and drop your PDF file into the upload area, and we&apos;ll automatically process it. You can see a preview of the converted pages and choose to download them individually or as a ZIP archive.
                        </p>
                        <p>
                            Compatible with all major platforms including Windows, Mac, Linux, iOS, and Android, our PDF to JPG converter is the ultimate solution for your document conversion needs.
                        </p>
                    </>
                }
                faqs={[
                    {
                        question: "Is this PDF to JPG converter free?",
                        answer: "Yes, our tool is completely free to use. There are no hidden charges, subscriptions, or limits on the number of files you can process."
                    },
                    {
                        question: "Are my files secure?",
                        answer: "Absolutely. We use client-side processing, which means your files never leave your device. They are processed directly in your browser, ensuring maximum privacy and security."
                    },
                    {
                        question: "Can I convert multiple PDFs at once?",
                        answer: "Currently, we support processing one PDF file at a time to ensure the highest quality and browser performance. You can reset and process new files instantly."
                    },
                    {
                        question: "Do I need to install any software?",
                        answer: "No installation is required. Our tool works entirely in your web browser, so you can use it on any device with an internet connection."
                    }
                ]}
            />
        </ToolWrapper>
    );
}
