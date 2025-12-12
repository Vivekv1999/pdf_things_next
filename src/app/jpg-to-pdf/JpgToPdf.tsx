"use client";

import DragAndDropInput from "@/src/components/DragAndDropInput";
import PdfPageHeader from "@/src/layout/PdfPageHeader";
import { ChangeEvent, useCallback, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { SimpleToast } from "@/src/components/ui/simple-toast";
import { downloadPdf } from "@/src/utils/downloadFile";
import { Download, RotateCcw } from "lucide-react";
import { JpgToPdfActionButton } from "./JpgToPdfActionButton";
import { JpgToPdfList } from "./JpgToPdfList";

const JpgToPdf = () => {
    const [images, setImages] = useState<File[]>([]);
    const [isConverting, setIsConverting] = useState(false);
    const [convertedPdf, setConvertedPdf] = useState<Blob | null>(null);
    const [showToast, setShowToast] = useState(false);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).filter(
                (file) => file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg"
            );
            setImages((prev) => [...prev, ...newFiles]);
        }
    }, []);

    const handleDownload = () => {
        if (convertedPdf) {
            convertedPdf.arrayBuffer().then((buffer) => {
                downloadPdf(buffer as any, "converted-images");
            });
        }
    };

    const handleReset = () => {
        setImages([]);
        setConvertedPdf(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <SimpleToast
                message="PDF Created Successfully!"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />

            <PdfPageHeader
                title="JPG to PDF"
                description="Convert your images to a single PDF document in seconds."
            />

            {images.length === 0 ? (
                <DragAndDropInput
                    handleFileChange={handleFileChange}
                    multiFile={true}
                    accept="image/jpeg, image/png, image/jpg"
                />
            ) : (
                <>
                    {convertedPdf && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            {/* Intentionally left empty or removed header to focus on Success Card */}
                        </div>
                    ) ? null : null}

                    {!convertedPdf && (
                        <JpgToPdfList
                            images={images}
                            setImages={setImages}
                            handleFileChange={handleFileChange}
                        />
                    )}

                    <JpgToPdfActionButton
                        images={images}
                        setImages={setImages}
                        isConverting={isConverting}
                        setIsConverting={setIsConverting}
                        convertedPdf={convertedPdf}
                        setConvertedPdf={setConvertedPdf}
                        onComplete={() => setShowToast(true)}
                    />
                </>
            )}
        </>
    );
};

export default JpgToPdf;
