import ContentSection from "@/src/components/ContentSection";
import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import JpgToPdfClient from "./JpgToPdfClient";

export const metadata: Metadata = {
    title: "JPG to PDF Converter | Free Online Tool",
    description: "Convert JPG, PNG, and other images to PDF. Combine multiple images into a single document for free.",
    keywords: [
        "jpg to pdf",
        "image to pdf",
        "convert images to pdf",
        "png to pdf",
        "combine images to pdf",
        "image combiner"
    ],
    openGraph: {
        title: "JPG to PDF Converter | Free Online Tool",
        description: "Convert JPG, PNG, and other images to PDF. Combine multiple images into a single document for free.",
        url: `${siteConfig.url}/jpg-to-pdf`,
        siteName: siteConfig.name,
        type: "website",
    },
};

export default function Page() {
    return (
        <ToolWrapper>
            <JpgToPdfClient />
            <ContentSection
                title="Convert JPG to PDF Online for Free"
                description="Easily combine multiple JPG, PNG, or WEBP images into a single, organized PDF file. Fast, free, and secure client-side conversion."
                toolName="JPG to PDF Converter"
                toolPath="/jpg-to-pdf"
                content={
                    <>
                        <p>
                            Managing scattered image files can be a hassle, especially when you need to share them as a single collection. Our <strong>JPG to PDF converter</strong> offers the perfect solution by allowing you to merge multiple images into one professional, easy-to-share PDF document. Whether you're a student compiling lecture notes, a professional organizing receipts for an expense report, or an artist creating a digital portfolio, our tool streamlines the process securely in your browser.
                        </p>

                        <h3>Why Convert Images to PDF?</h3>
                        <p>
                            PDFs are the global standard for document sharing. Converting your images to PDF provides numerous benefits:
                        </p>
                        <ul>
                            <li><strong>Unified Organization:</strong> Instead of sending a dozen separate image attachments, combine them into a single, orderly file.</li>
                            <li><strong>Universal Compatibility:</strong> PDFs look the same on every device, ensuring your recipient sees exactly what you intended.</li>
                            <li><strong>Reduced Clutter:</strong> Keep your digital workspace tidy by consolidating related images into one accessible document.</li>
                            <li><strong>Professional Presentation:</strong> A multi-page PDF looks much more polished and professional than a zipped folder of random image files.</li>
                        </ul>

                        <h3>Key Features of Our Tool</h3>
                        <ul>
                            <li><strong>Multi-Format Support:</strong> We don't just stop at JPGs. You can upload and combine PNG, WEBP, and JPEG files seamlessly into a single PDF.</li>
                            <li><strong>Smart Ordering:</strong> Our intuitive drag-and-drop interface lets you arrange your images in the exact order you want them to appear in the final document.</li>
                            <li><strong>100% Secure & Private:</strong> Security is paramount. Our tool processes your files client-side, meaning your personal photos and sensitive documents never leave your device.</li>
                            <li><strong>High-Quality Output:</strong> We maintain the visual quality of your original images, ensuring your PDF looks crisp and clear.</li>
                            <li><strong>Instant Processing:</strong> Without the need to upload files to a server, the conversion happens almost instantly, saving you valuable time.</li>
                        </ul>

                        <h3>How to Convert JPG to PDF</h3>
                        <p>
                            Creating a PDF from your images is a breeze with our user-friendly tool:
                        </p>
                        <ol>
                            <li><strong>Upload Images:</strong> Click "Select Images" or drag and drop your photos directly into the tool. You can select multiple files at once.</li>
                            <li><strong>Arrange Order:</strong> Drag the image thumbnails to reorder them. The first image will be page one, and so on.</li>
                            <li><strong>Convert:</strong> Once satisfied with the arrangement, click the "Convert to PDF" button.</li>
                            <li><strong>Download:</strong> Your new PDF file will be generated instantly and ready for download to your device.</li>
                        </ol>

                        <p>
                            Simplify your digital life today. Try our robust, secure, and free JPG to PDF converter and experience the convenience of organized document management.
                        </p>
                    </>
                }
                faqs={[
                    {
                        question: "Can I convert other formats besides JPG?",
                        answer: "Yes! Our tool is versatile and supports JPG, JPEG, PNG, and WEBP images. You can even mix and match these different formats in the same PDF document without any issues."
                    },
                    {
                        question: "Is there a limit to how many images I can upload?",
                        answer: "We aim to provide unlimited flexibility. While extreme numbers might depend on your browser's memory, you can typically combine dozens of images into a single PDF without any problems."
                    },
                    {
                        question: "Can I rearrange the images before converting?",
                        answer: "Absolutely. We understand that order matters. Our interactive interface allows you to simply drag and drop image thumbnails to set the perfect page sequence before you finalize the conversion."
                    },
                    {
                        question: "Is this tool safe to use with private photos?",
                        answer: "Yes, your privacy is our top priority. Since we use client-side processing technology, your photos are never uploaded to a server. The conversion happens entirely on your own device."
                    },
                    {
                        question: "Does the tool add watermarks to the PDF?",
                        answer: "No. We believe in providing a clean, professional tool. Your converted PDFs will be completely free of any watermarks or branding."
                    },
                    {
                        question: "Do I need an internet connection to use this?",
                        answer: "While you need internet to load the page initially, the actual conversion process runs in your browser. This means it's fast and efficient, utilizing your device's power rather than relying on server speeds."
                    }
                ]}
            />
        </ToolWrapper>
    );
}
