"use client";

import DragAndDropInput from "@/src/components/DragAndDropInput";
import PdfPageHeader from "@/src/layout/PdfPageHeader";
import * as pdfjsLib from "pdfjs-dist";
import { ChangeEvent, useCallback, useState } from "react";
import { PdfToJpgActionButton } from "./PdfToJpgActionButton";
import { PdfToJpgFileCard } from "./PdfToJpgFileCard";
import { PdfToJpgImageList } from "./PdfToJpgImageList";

// Initialize worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

import { SimpleToast } from "@/src/components/ui/simple-toast";

const PdfToJpg = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [convertedImages, setConvertedImages] = useState<string[]>([]);
    const [showToast, setShowToast] = useState(false);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const f = files[0];
            if (f && f.type === "application/pdf") {
                setFile(f);
                setConvertedImages([]);
                setProgress(0);
            }
        }
    }, []);

    return (
        <>
            <SimpleToast
                message="PDF Converted Successfully!"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />

            {!file ? (
                <div className="h-screen">
                    <PdfPageHeader
                        title="PDF to JPG"
                        description="Convert PDF pages to high-quality JPG images."
                    />
                    <DragAndDropInput
                        handleFileChange={handleFileChange}
                        multiFile={false}
                    />
                </div>
            ) : (
                <>
                    {convertedImages.length === 0 && (
                        <div className="flex flex-col gap-6 mt-8 items-center justify-center">
                            <PdfToJpgFileCard
                                file={file}
                                setFile={setFile}
                                isConverting={isConverting}
                            />

                            <PdfToJpgActionButton
                                file={file}
                                isConverting={isConverting}
                                setIsConverting={setIsConverting}
                                progress={progress}
                                setProgress={setProgress}
                                setConvertedImages={setConvertedImages}
                                onComplete={() => setShowToast(true)}
                            />
                        </div>
                    )}

                    {convertedImages.length > 0 && (
                        <PdfToJpgImageList
                            convertedImages={convertedImages}
                            file={file}
                            setFile={setFile}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default PdfToJpg;
