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
                title="Convert Images to PDF Online"
                description="Easily combine multiple JPG, PNG, or WEBP images into a single, organized PDF file. Fast, free, and secure."
                toolName="JPG to PDF Converter"
                toolPath="/jpg-to-pdf"
                content={
                    <>
                        <p>
                            Our <strong>JPG to PDF</strong> tool offers a quick and easy way to compile your images into a professional PDF document. Whether you are archiving receipts, organizing photos, or creating a portfolio, our converter helps you get the job done efficiently.
                        </p>
                        <h3>Key Features</h3>
                        <ul>
                            <li><strong>Multi-Format Support:</strong> Convert JPG, PNG, and WEBP images seamlessly. mixing different formats in a single PDF is fully supported.</li>
                            <li><strong>Drag & Drop Interface:</strong> Easily arrange your images in the desired order before conversion details.</li>
                            <li><strong>Privacy First:</strong> Your personal photos and documents are processed entirely in your browser. We never access or store your files.</li>
                            <li><strong>No Limits:</strong> Combine as many images as you need into a single PDF file without hitting paywalls or file size caps.</li>
                        </ul>
                        <h3>How to Convert JPG to PDF</h3>
                        <p>
                            Start by selecting or dragging and dropping your images into the tool. You can reorder them by simply dragging the thumbnails. Once you&apos;re happy with the arrangement, click &quot;Convert to PDF&quot; and your document will be ready for download instantly.
                        </p>
                        <p>
                            This tool is perfect for students, professionals, and anyone needing to present multiple images in a single, universally compatible file format.
                        </p>
                    </>
                }
                faqs={[
                    {
                        question: "Can I convert other formats besides JPG?",
                        answer: "Yes! Our tool supports JPG, JPEG, PNG, and WEBP images. You can even mix different formats in the same PDF document."
                    },
                    {
                        question: "Is there a limit to how many images I can upload?",
                        answer: "We strive to offer unlimited usage. While browser performance may vary with extremely large batches, you can typically combine dozens of images without issue."
                    },
                    {
                        question: "Can I rearrange the images before converting?",
                        answer: "Absolutely. Our interactive list view allows you to drag and drop images to set the perfect page order for your PDF."
                    },
                    {
                        question: "Is this tool safe to use with private photos?",
                        answer: "Yes, security is our top priority. Since the conversion happens locally on your device (client-side), your photos are never sent to a remote server."
                    }
                ]}
            />
        </ToolWrapper>
    );
}
