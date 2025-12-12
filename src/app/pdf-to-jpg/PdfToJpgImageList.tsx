"use client";

import ProcessComplete from "@/src/components/ProcessComplete";
import { Button } from "@/src/components/ui/button";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { Download, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface PdfToJpgImageListProps {
    convertedImages: string[];
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const PdfToJpgImageList = ({
    convertedImages,
    file,
    setFile,
}: PdfToJpgImageListProps) => {
    const [showPreview, setShowPreview] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const hasDownloaded = useRef(false);

    const downloadAll = useCallback(async () => {
        if (convertedImages.length === 0) return;

        try {
            setIsDownloading(true);
            // Allow state to update and UI to render before starting heavy ZIP operation
            await new Promise((resolve) => setTimeout(resolve, 100));

            if (convertedImages.length === 1) {
                saveAs(convertedImages[0], `${file?.name.replace(".pdf", "")}-page-1.jpg`);
                return;
            }

            const zip = new JSZip();
            convertedImages.forEach((img, idx) => {
                const base64Data = img.replace(/^data:image\/jpeg;base64,/, "");
                zip.file(`${file?.name.replace(".pdf", "")}-page-${idx + 1}.jpg`, base64Data, { base64: true });
            });

            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, `${file?.name.replace(".pdf", "")}-images.zip`);
        } catch (error) {
            console.error("Download failed:", error);
        } finally {
            setIsDownloading(false);
        }
    }, [convertedImages, file]);

    useEffect(() => {
        if (!hasDownloaded.current && convertedImages.length > 0) {
            downloadAll();
            hasDownloaded.current = true;
        }

    }, [convertedImages, downloadAll]);

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full my-8 gap-4">
                <ProcessComplete
                    message="Conversion Complete"
                    title={`${convertedImages.length} image${convertedImages.length > 1 ? 's' : ''} extracted successfully`}
                    onDownload={downloadAll}
                    buttonLabel={`Download All ${convertedImages.length > 1 ? "(ZIP)" : ""}`}
                    loading={isDownloading}
                />

                <div className="flex gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => setShowPreview(!showPreview)}
                        className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                    >
                        {showPreview ? "Hide Preview" : "Show Preview"}
                    </Button>
                    <Button
                        variant="outline"
                        className="hover:bg-red-50 border-red-300 rounded-lg text-red-500 hover:text-red-600"
                        onClick={() => {
                            setFile(null);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    >
                        <RotateCcw className="size-4 mr-2" />
                        Reset
                    </Button>
                </div>
            </div>

            {showPreview && (
                <div className="gap-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pb-24 animate-in fade-in slide-in-from-top-4 duration-500">
                    {convertedImages.map((img, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-white hover:bg-gray-50 shadow p-2 border border-gray-300 rounded-xl min-w-[100px] transition-colors"
                        >
                            <div className="relative">
                                <img
                                    src={img}
                                    alt={`Page ${idx + 1}`}
                                    className="mb-2 rounded w-full h-48 object-contain"
                                />
                                <span className="top-1 left-[-4px] absolute bg-indigo-600 px-2 py-1 rounded font-semibold text-white text-xs">
                                    {String(idx + 1).padStart(2, "0")}
                                </span>
                            </div>
                            <p className="mb-1 text-gray-800 text-xs truncate">
                                Page {idx + 1}
                            </p>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 rounded-xl">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => saveAs(img, `${file?.name.replace(".pdf", "")}-page-${idx + 1}.jpg`)}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Save
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
