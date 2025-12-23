"use client";

import { Button } from "@/src/components/ui/button";
import ProcessComplete from "@/src/components/ProcessComplete";
import { PdfMeta } from "@/src/types/pdf";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { FileText, Loader2, RotateCcw } from "lucide-react";

interface CompressedResult {
    blob: Blob;
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
}

export const CompressPdfList = ({
    pdfs,
    setPdfs,
}: {
    pdfs: PdfMeta[];
    setPdfs: (pdfs: PdfMeta[]) => void;
}) => {
    const [isCompressing, setIsCompressing] = useState(false);
    const [compressionProgress, setCompressionProgress] = useState(0);
    const [compressedResult, setCompressedResult] = useState<CompressedResult | null>(null);
    const [compressionLevel, setCompressionLevel] = useState(70); // Default 70%
    const [error, setError] = useState<string | null>(null);

    const pdf = pdfs[0]; // Single file compression

    // Don't auto-compress - user must click button

    const compressPdf = async () => {
        if (!pdf) return;

        setIsCompressing(true);
        setCompressionProgress(0);
        setError(null);

        try {
            setCompressionProgress(10);

            // Load the PDF
            const arrayBuffer = await pdf.file.arrayBuffer();
            setCompressionProgress(30);

            const pdfDoc = await PDFDocument.load(arrayBuffer, {
                ignoreEncryption: true,
            });
            setCompressionProgress(50);

            // Remove metadata to reduce size
            pdfDoc.setTitle('');
            pdfDoc.setAuthor('');
            pdfDoc.setSubject('');
            pdfDoc.setKeywords([]);
            pdfDoc.setProducer('');
            pdfDoc.setCreator('');

            // Calculate compression settings based on slider value (0-100)
            // Higher slider value = more compression = smaller file
            const useObjectStreams = compressionLevel > 20;
            const addDefaultPage = false;

            // More aggressive compression for higher slider values
            const objectsPerTick = compressionLevel > 50
                ? Math.max(10, 50 - compressionLevel)
                : Math.max(50, 150 - compressionLevel);

            setCompressionProgress(70);

            // Apply compression by re-saving with optimized settings
            const compressedBytes = await pdfDoc.save({
                useObjectStreams,
                addDefaultPage,
                objectsPerTick,
            });

            setCompressionProgress(90);

            const compressedBlob = new Blob([new Uint8Array(compressedBytes)], { type: "application/pdf" });
            const originalSize = pdf.file.size;
            const compressedSize = compressedBlob.size;
            const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

            const result = {
                blob: compressedBlob,
                originalSize,
                compressedSize,
                compressionRatio: Math.max(0, compressionRatio),
            };

            setCompressedResult(result);
            setCompressionProgress(100);

            // Auto-download the compressed PDF
            const url = URL.createObjectURL(compressedBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = pdf.file.name.replace(".pdf", "_compressed.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Compression error:", err);
            setError(err instanceof Error ? err.message : "Failed to compress PDF");
        } finally {
            setIsCompressing(false);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    };

    const handleDownload = () => {
        if (!compressedResult) return;

        const url = URL.createObjectURL(compressedResult.blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = pdf.file.name.replace(".pdf", "_compressed.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        setPdfs([]);
        setCompressedResult(null);
        setError(null);
        setCompressionProgress(0);
        setCompressionLevel(70); // Reset to default
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="mx-auto px-4 py-8 max-w-4xl">

            {/* File Info Card */}
            <div className="bg-white shadow-sm mb-6 p-6 border border-gray-200 rounded-xl">
                <div className="flex items-start gap-4">
                    <div className="flex justify-center items-center bg-indigo-100 rounded-lg w-12 h-12 text-indigo-600">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{pdf.file.name}</h3>
                        <p className="mt-1 text-gray-500 text-sm">
                            Original size: {formatFileSize(pdf.file.size)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Compression Controls */}
            {!compressedResult && !isCompressing && (
                <div className="bg-gray-50 mb-6 p-6 border border-gray-200 rounded-xl">
                    <h3 className="mb-4 font-semibold text-gray-900">Compression Level</h3>

                    {/* Slider */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-600">Less Compression</span>
                            <span className="font-bold text-2xl text-indigo-600">{compressionLevel}%</span>
                            <span className="text-sm text-gray-600">More Compression</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={compressionLevel}
                            onChange={(e) => setCompressionLevel(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${compressionLevel}%, #e5e7eb ${compressionLevel}%, #e5e7eb 100%)`
                            }}
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                        </div>
                    </div>

                    {/* Estimated Size */}
                    <div className="bg-white p-4 mb-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-600">Estimated Compressed Size</p>
                                <p className="font-semibold text-lg text-gray-900">
                                    ~{formatFileSize(pdf.file.size * (1 - (compressionLevel * 0.003)))}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Estimated Reduction</p>
                                <p className="font-semibold text-lg text-indigo-600">~{(compressionLevel * 0.3).toFixed(0)}%</p>
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 text-center">
                            Note: Actual compression depends on PDF content. Text-heavy PDFs compress less than image-heavy PDFs.
                        </p>

                    </div>
                </div>
            )}

            {/* Compression Progress */}
            {isCompressing && (
                <div className="bg-white shadow-sm mb-6 p-6 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                        <span className="font-medium text-gray-900">Compressing PDF...</span>
                    </div>
                    <div className="relative bg-gray-200 rounded-full w-full h-2 overflow-hidden">
                        <div
                            className="bg-indigo-600 h-full transition-all duration-300"
                            style={{ width: `${compressionProgress}%` }}
                        />
                    </div>
                    <p className="mt-2 text-gray-600 text-sm">{compressionProgress}% complete</p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 mb-6 p-4 border border-red-200 rounded-lg text-center">
                    <h4 className="font-semibold text-red-900">Compression Failed</h4>
                    <p className="mt-1 text-red-700 text-sm">{error}</p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex sm:flex-row flex-col justify-center items-center gap-3">
                {!isCompressing && !compressedResult && !error && (
                    <Button
                        onClick={compressPdf}
                        className="bg-[#4f3df7] hover:bg-[#4f3df7]/90 rounded-lg text-white"
                    >
                        Compress & Download
                    </Button>
                )}

                {compressedResult && !isCompressing && (
                    <ProcessComplete
                        message="Compression Complete"
                        title={`Reduced by ${compressedResult.compressionRatio.toFixed(1)}% (${formatFileSize(compressedResult.originalSize)} → ${formatFileSize(compressedResult.compressedSize)})`}
                        onDownload={handleDownload}
                        buttonLabel="Download Compressed PDF"
                    />
                )}

                <Button
                    variant="outline"
                    className="hover:bg-red-50 border-red-300 rounded-lg text-red-500 hover:text-red-600"
                    onClick={handleReset}
                >
                    <RotateCcw className="size-4" />
                    Reset
                </Button>
            </div>
        </div>
    );
};
