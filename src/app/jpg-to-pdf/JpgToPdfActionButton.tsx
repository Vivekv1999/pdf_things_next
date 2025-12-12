"use client";

import LoadingDownload from "@/src/components/LoadingDownload";
import ProcessComplete from "@/src/components/ProcessComplete";
import { Button } from "@/src/components/ui/button";
import { downloadPdf } from "@/src/utils/downloadFile";
import { Download, RotateCcw } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";

interface JpgToPdfActionButtonProps {
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    isConverting: boolean;
    setIsConverting: React.Dispatch<React.SetStateAction<boolean>>;
    convertedPdf: Blob | null;
    setConvertedPdf: React.Dispatch<React.SetStateAction<Blob | null>>;
}

export const JpgToPdfActionButton = ({
    images,
    setImages,
    isConverting,
    setIsConverting,
    convertedPdf,
    setConvertedPdf,
    onComplete,
}: JpgToPdfActionButtonProps & { onComplete?: () => void }) => {
    const [progress, setProgress] = useState(0);

    const messages = [
        "Processing your images 🖼️",
        "Creating PDF document 📄",
        "Embedding images ✨",
        "Almost there… 🚀",
    ];

    useEffect(() => {
        if (images?.length && convertedPdf) {
            setConvertedPdf(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);

    const getImageType = (buffer: ArrayBuffer) => {
        const arr = new Uint8Array(buffer).subarray(0, 4);
        const header = arr.reduce((acc, byte) => acc + byte.toString(16).padStart(2, "0"), "");
        if (header.startsWith("ffd8")) return "jpg";
        if (header.startsWith("89504e47")) return "png";
        return null;
    };

    const convertToPdf = async () => {
        if (images.length === 0) return;

        setIsConverting(true);
        setProgress(0);

        try {
            const pdfDoc = await PDFDocument.create();
            const totalImages = images.length;

            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                const arrayBuffer = await file.arrayBuffer();
                const type = getImageType(arrayBuffer);
                let image;

                try {
                    if (type === "jpg") {
                        image = await pdfDoc.embedJpg(arrayBuffer);
                    } else if (type === "png") {
                        image = await pdfDoc.embedPng(arrayBuffer);
                    } else {
                        if (file.type === "image/jpeg") image = await pdfDoc.embedJpg(arrayBuffer);
                        else if (file.type === "image/png") image = await pdfDoc.embedPng(arrayBuffer);
                        else throw new Error("Unknown format");
                    }
                } catch (e) {
                    console.warn(`Failed to embed ${file.name}, trying fallback...`, e);
                    try {
                        image = await pdfDoc.embedJpg(arrayBuffer);
                    } catch {
                        try {
                            image = await pdfDoc.embedPng(arrayBuffer);
                        } catch {
                            console.error(`Skipping ${file.name}: Could not embed.`);
                            continue;
                        }
                    }
                }

                if (!image) continue;

                const { width, height } = image.scale(1);
                const page = pdfDoc.addPage([width, height]);
                page.drawImage(image, { x: 0, y: 0, width, height });

                // Update progress
                setProgress(Math.round(((i + 1) / totalImages) * 100));
            }

            const pdfBytes = await pdfDoc.save() as any;
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            setConvertedPdf(blob);

            if (onComplete) onComplete();

            // Auto download
            downloadPdf(pdfBytes as any, "converted-images");
        } catch (error) {
            console.error("Error converting images to PDF:", error);
            alert("Failed to convert images. Please ensure they are valid JPG or PNG files.");
        } finally {
            setIsConverting(false);
            setProgress(0);
        }
    };

    const handleDownload = () => {
        if (convertedPdf) {
            convertedPdf.arrayBuffer().then((buffer) => {
                downloadPdf(buffer as any, "converted-images");
            });
        }
    };

    return (
        <div className="flex sm:flex-row flex-col justify-center items-center gap-3">
            {!isConverting && !convertedPdf && (
                <Button
                    onClick={convertToPdf}
                    className="bg-[#4f3df7] hover:bg-[#4f3df7]/90 rounded-lg text-white"
                >
                    Convert to PDF
                    <Download className="w-5 h-5 ml-2" />
                </Button>
            )}

            {isConverting && <LoadingDownload progress={progress} messages={messages} />}

            {convertedPdf && !isConverting && (
                <ProcessComplete
                    message="Conversion Complete"
                    title={`${images.length} image${images.length > 1 ? 's' : ''} converted successfully`}
                    onDownload={handleDownload}
                    buttonLabel="Download PDF"
                />
            )}

            <Button
                variant="outline"
                className="hover:bg-red-50 border-red-300 rounded-lg text-red-500 hover:text-red-600"
                onClick={() => {
                    setImages([]);
                    setConvertedPdf(null);
                    setProgress(0);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            >
                <RotateCcw className="size-4" />
                Reset
            </Button>
        </div>
    );
};
