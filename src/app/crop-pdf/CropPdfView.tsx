"use client"

import { PdfActionButton } from "@/src/components/pdf/PdfActionButton";
import useCropPdf from "@/src/hooks/useCropPdf";
import useDragSelectCrop from "@/src/hooks/useCropSelection";
import { PDFPageProxy } from "pdfjs-dist";
import { RenderParameters } from "pdfjs-dist/types/src/display/api";
import { useEffect, useRef, useState } from "react";

interface CropBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface CanvasSize {
    width: number;
    height: number;
}

const messages = [
    "Reading your PDF 📖",
    "Finding edges to crop ✂️",
    "Trimming unwanted areas 🧩",
    "Almost done cropping 🚀",
];


const CropPdfView = ({
    pdfDoc,
    totalPages,
    pdfBytes,
    setPdfDoc
}: any) => {

    const [pageNum, setPageNum] = useState<number>(1);
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cropBoxRef = useRef<HTMLDivElement | null>(null);

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);


    const {
        containerRef,
        cropBox,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    } = useDragSelectCrop();

    const { cropPdf } = useCropPdf();

    useEffect(() => {
        renderPage(pageNum);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pdfDoc, pageNum]);

    // Render PDF page
    const renderPage = async (num: number) => {
        if (!pdfDoc || !canvasRef.current) return;

        try {
            const page: PDFPageProxy = await pdfDoc.getPage(num);
            const viewport = page.getViewport({ scale: 1 });

            const canvas = canvasRef.current;
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            setCanvasSize({ width: viewport.width, height: viewport.height });

            const context = canvas.getContext("2d");
            if (context) {
                await page.render({ canvasContext: context, viewport } as RenderParameters).promise;
            }

        } catch (error) {
            console.error("Error rendering page:", error);
        }
    };

    const goToPrevPage = () => setPageNum((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setPageNum((prev) => Math.min(prev + 1, totalPages));

    const handleCrop = async () => {
        if (!pdfDoc || !cropBox) return;

        setLoading(true);
        setProgress(0);

        try {
            const croppedBytes = await cropPdf(pdfBytes, cropBox, canvasSize, (p) => {
                setProgress(p);
            });

            setProgress(100);
            const blob = new Blob([croppedBytes] as any, { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
        } catch (err) {
            console.error("Crop failed:", err);
        } finally {
            setLoading(false);
        }
    };




    return (
        <>
            {pdfDoc && (
                <div
                    ref={containerRef}
                    className="relative flex justify-center select-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <canvas ref={canvasRef} className="border-2 w-auto h-auto" />
                    {cropBox && (
                        <div
                            ref={cropBoxRef}
                            className="absolute bg-[rgba(219,234,254,0.5)] border-2 border-blue-500 hover:border-blue-700 border-dashed cursor-move"
                            style={{
                                left: `${cropBox.x}px`,
                                top: `${cropBox.y}px`,
                                width: `${cropBox.width}px`,
                                height: `${cropBox.height}px`,
                            }}
                        >
                            {/* <div className="right-0 bottom-0 absolute bg-blue-500 hover:bg-blue-700 rounded-sm w-5 h-5 cursor-se-resize" />
                            <div className="top-0 left-0 absolute bg-blue-500 hover:bg-blue-700 rounded-sm w-5 h-5 cursor-nw-resize" /> */}
                        </div>
                    )}
                </div >
            )}

            {
                pdfDoc && (
                    <div className="flex flex-col justify-center items-center">
                        <div className="space-x-2">
                            <button
                                onClick={goToPrevPage}
                                disabled={pageNum <= 1}
                                className="bg-gray-200 disabled:opacity-50 px-4 py-2 rounded"
                            >
                                Previous
                            </button>
                            <button
                                onClick={goToNextPage}
                                disabled={pageNum >= totalPages}
                                className="bg-gray-200 disabled:opacity-50 px-4 py-2 rounded"
                            >
                                Next
                            </button>
                            <span>
                                Page {pageNum} of {totalPages}
                            </span>
                        </div>
                    </div>
                )
            }
            <PdfActionButton
                setPdfs={setPdfDoc}
                setProgress={setProgress}
                handleButtonAction={handleCrop}
                loading={loading}
                progress={progress}
                messages={messages}
                beforActionButtonLable={"Crop & Download"}
                completedMessage="PDF cropping complete ✂️"
                completeTitle="Your PDF pages were cropped successfully!"
                completeButtonLable="Download Cropped PDF"
                pdfs={pdfDoc}
            />

        </>
    )
}

export default CropPdfView
