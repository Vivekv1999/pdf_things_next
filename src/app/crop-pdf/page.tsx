import ContentSection from "@/src/components/ContentSection";
import ToolWrapper from "@/src/components/ToolWrapper";
import { siteConfig } from "@/src/constants/appConstants";
import type { Metadata } from "next";
import CropPdfClient from "./CropPdfClient";

export const metadata: Metadata = {
    title: "Crop PDF Online | Free & Fast",
    description:
        "Crop PDF pages to remove unwanted areas. Free, secure, and instant.",
    keywords: [
        "crop pdf",
        "pdf cropper",
        "online pdf tools",
        "crop pdf free",
        "crop pdf fast",
        "trim pdf pages",
        "remove pdf margins",
        "pdf page cutter",
        "resize pdf pages",
        "edit pdf online"
    ],
    openGraph: {
        title: "Crop PDF Online | Free & Fast",
        description:
            "Crop PDF pages to remove unwanted areas. Free, secure, and instant.",
        url: `${siteConfig.url}/crop-pdf`,
        siteName: siteConfig.name,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Crop PDF Online | Free & Fast",
        description:
            "Crop PDF pages to remove unwanted areas. Free, secure, and instant.",
    },
};

export default function Page() {
    return (
        <ToolWrapper>
            <CropPdfClient />
            <ContentSection
                title="Crop PDF Files Online for Free"
                description="The ultimate tool to crop margins, adjust layouts, and trim pages in your PDF files. Fast, precise, and secure."
                toolName="Crop PDF"
                toolPath="/crop-pdf"
                content={
                    <>
                        <p>
                            Sometimes specific parts of a PDF page are all you need, or maybe you need to remove unsightly margins to unclutter your document. Our <strong>Crop PDF tool</strong> allows you to select exactly which area of a page you want to keep and discards the rest. Whether you are resizing a document for printing, removing header/footer information, or focusing on a specific table or chart, our intuitive cropper makes it simple.
                        </p>

                        <h3>Why Crop PDF Files?</h3>
                        <p>
                            Cropping is more than just trimming edges; it's about refining your document's presentation:
                        </p>
                        <ul>
                            <li><strong>Cleaner Presentation:</strong> Remove scanning artifacts, dark borders, or unnecessary white space to make your document look professional.</li>
                            <li><strong>Focus on Content:</strong> Highlight specific areas like receipts, graphs, or text blocks by cropping out everything else.</li>
                            <li><strong>Print Optimization:</strong> Adjust page sizes to fit specific printing requirements, such as printing a label or a card on standard paper.</li>
                            <li><strong>Consistent Layout:</strong> Apply the same crop area to all pages to ensure uniformity across your entire document.</li>
                        </ul>

                        <h3>Key Features</h3>
                        <ul>
                            <li><strong>Visual Selection:</strong> Use our interactive box to draw exactly where you want to crop. What you see is what you get.</li>
                            <li><strong>Auto-Cropping:</strong> Apply your selection to a single page or automatically apply the same crop box to all pages in the document.</li>
                            <li><strong>Privacy Guaranteed:</strong> Because we use client-side processing, your files remain on your device. We never upload your sensitive data to any server.</li>
                            <li><strong>Precision Control:</strong> Adjust the crop box coordinates for pixel-perfect accuracy if visual dragging isn't enough.</li>
                            <li><strong>Free & Unlimited:</strong> Crop as many files as you need. There are no limits on usage or file size (within browser capabilities).</li>
                        </ul>

                        <h3>How to Crop a PDF</h3>
                        <ol>
                            <li><strong>Upload PDF:</strong> Click "Select PDF" or drag and drop your file to open it in the cropper.</li>
                            <li><strong>Select Area:</strong> Draw a box over the area you want to keep. Everything outside this box will be removed.</li>
                            <li><strong>Apply Crop:</strong> Choose to crop the current page or all pages, then click "Crop PDF".</li>
                            <li><strong>Download:</strong> Your newly cropped PDF will be generated instantly and ready for download.</li>
                        </ol>

                        <p>
                            Refine your documents with precision. Try our free Crop PDF tool today and give your files the polished look they deserve.
                        </p>
                    </>
                }
                faqs={[
                    {
                        question: "Is this PDF cropper free?",
                        answer: "Yes, our Crop PDF tool is completely free. You can use it as often as you like without any hidden costs."
                    },
                    {
                        question: "Can I undo a crop if I make a mistake?",
                        answer: "Since the cropping happens in steps, you can simply reset the crop box or re-upload your file if you aren't happy with the selection before downloading."
                    },
                    {
                        question: "Does it affect the text quality?",
                        answer: "No, cropping only changes the visible page area (media box). The underlying resolution of the text and images inside the crop area remains unchanged."
                    },
                    {
                        question: "Is it safe to use?",
                        answer: "Absolutely. We prioritize your security by processing files locally on your computer. Your documents are never transmitted to us."
                    },
                    {
                        question: "Can I crop multiple pages at once?",
                        answer: "Yes! You can define a crop area on one page and choose to apply that same crop to every page in the document with a single click."
                    },
                    {
                        question: "Do I need to install anything?",
                        answer: "No software installation is needed. Our tool runs entirely in your web browser and works on Windows, Mac, Linux, and mobile."
                    }
                ]}
            />
        </ToolWrapper>
    );
}
