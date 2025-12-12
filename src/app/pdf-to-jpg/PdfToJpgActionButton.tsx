"use client";

import LoadingDownload from "@/src/components/LoadingDownload";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

interface PdfToJpgActionButtonProps {
    file: File | null;
    isConverting: boolean;
    setIsConverting: React.Dispatch<React.SetStateAction<boolean>>;
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    setConvertedImages: React.Dispatch<React.SetStateAction<string[]>>;
    onComplete?: () => void;
}

export const PdfToJpgActionButton = ({
    file,
    isConverting,
    setIsConverting,
    progress,
    setProgress,
    setConvertedImages,
    onComplete,
}: PdfToJpgActionButtonProps) => {
    const messages = [
        "Loading PDF pages 📄",
        "Rendering images 🖼️",
        "Optimizing quality ✨",
        "Almost there… 🚀",
    ];

    const convertPdfToJpg = async () => {
        if (!file) return;

        setIsConverting(true);
        setProgress(0);
        setConvertedImages([]);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const numPages = pdf.numPages;
            const images: string[] = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 }); // High quality
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                if (!context) continue;

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({
                    canvas: canvas,
                    canvasContext: context,
                    viewport: viewport,
                }).promise;

                const imgData = canvas.toDataURL("image/jpeg", 0.8);
                images.push(imgData);
                setProgress(Math.round((i / numPages) * 100));
            }

            setConvertedImages(images);
            if (onComplete) onComplete();
        } catch (error) {
            console.error("Error converting PDF:", error);
            alert("Failed to convert PDF. Please try again.");
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="flex sm:flex-row flex-col justify-center items-center gap-3">
            {isConverting ? (
                <LoadingDownload progress={progress} messages={messages} />
            ) : (
                <Button
                    onClick={convertPdfToJpg}
                    className="bg-[#4f3df7] hover:bg-[#4f3df7]/90 rounded-lg text-white"
                    disabled={isConverting}
                >
                    Convert to JPG
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            )}
        </div>
    );
};
