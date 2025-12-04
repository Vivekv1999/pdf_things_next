"use client"

import { PdfActionButton } from "@/src/components/pdf/PdfActionButton";
import { Button } from "@/src/components/ui/button";
import useCropPdf from "@/src/hooks/useCropPdf";
import useDragSelectCrop from "@/src/hooks/useCropSelection";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setAlredyMergePdf } from "@/src/lib/redux/generalSlice";
import { downloadPdf } from "@/src/utils/downloadFile";
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
    setPdfs,
    pdfs
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
        handleMouseUp
    } = useDragSelectCrop();

    const dispatch = useAppDispatch();
    const { cropPdf } = useCropPdf();
    const alredyMergePdf = useAppSelector((state) => state.general.alredyMergePdf);

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
            }) as Uint8Array<ArrayBuffer>;

            setProgress(100);
            dispatch(setAlredyMergePdf(croppedBytes))
            downloadPdf(croppedBytes, "Crop pdf")
        } catch (err) {
            console.error("Crop failed:", err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-8 w-full ${alredyMergePdf ? "justify-center" : "lg:justify-between"}`}>

                {!alredyMergePdf && (
                    <div
                        ref={containerRef}
                        className="inline-block relative select-none w-full max-w-3xl"
                        onMouseDown={(e) => handleMouseDown(e)}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                    >
                        <canvas ref={canvasRef} className="max-w-full h-auto" />

                        {cropBox && (
                            <>
                                {/* Crop area border */}
                                <div
                                    className="absolute border-2 border-blue-500"
                                    style={{
                                        left: cropBox.x,
                                        top: cropBox.y,
                                        width: cropBox.width,
                                        height: cropBox.height,
                                    }}
                                />

                                {/* Resize handles */}
                                {[
                                    "top-left",
                                    "top-right",
                                    "bottom-left",
                                    "bottom-right",
                                    "left",
                                    "right",
                                    "top",
                                    "bottom",
                                ].map((handle) => {
                                    const size = 10;
                                    const style: React.CSSProperties = {
                                        position: "absolute",
                                        width: size,
                                        height: size,
                                        background: "white",
                                        border: "2px solid #2563eb",
                                        cursor:
                                            handle.includes("left") || handle.includes("right")
                                                ? "ew-resize"
                                                : handle.includes("top") || handle.includes("bottom")
                                                    ? "ns-resize"
                                                    : "nwse-resize",
                                    };

                                    // Position handles
                                    switch (handle) {
                                        case "top-left":
                                            style.left = cropBox.x - size / 2;
                                            style.top = cropBox.y - size / 2;
                                            break;
                                        case "top-right":
                                            style.left = cropBox.x + cropBox.width - size / 2;
                                            style.top = cropBox.y - size / 2;
                                            break;
                                        case "bottom-left":
                                            style.left = cropBox.x - size / 2;
                                            style.top = cropBox.y + cropBox.height - size / 2;
                                            break;
                                        case "bottom-right":
                                            style.left = cropBox.x + cropBox.width - size / 2;
                                            style.top = cropBox.y + cropBox.height - size / 2;
                                            break;
                                        case "left":
                                            style.left = cropBox.x - size / 2;
                                            style.top = cropBox.y + cropBox.height / 2 - size / 2;
                                            break;
                                        case "right":
                                            style.left = cropBox.x + cropBox.width - size / 2;
                                            style.top = cropBox.y + cropBox.height / 2 - size / 2;
                                            break;
                                        case "top":
                                            style.left = cropBox.x + cropBox.width / 2 - size / 2;
                                            style.top = cropBox.y - size / 2;
                                            break;
                                        case "bottom":
                                            style.left = cropBox.x + cropBox.width / 2 - size / 2;
                                            style.top = cropBox.y + cropBox.height - size / 2;
                                            break;
                                    }

                                    return (
                                        <div
                                            key={handle}
                                            style={style}
                                            onMouseDown={(e) =>
                                                handleMouseDown(e, handle as any)
                                            }
                                        />
                                    );
                                })}
                            </>
                        )}

                        <div className="flex justify-center mt-4 md:mt-6">
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 w-full">
                                <Button
                                    variant="outline"
                                    onClick={goToPrevPage}
                                    disabled={pageNum <= 1}
                                    className="hover:bg-gray-100 disabled:opacity-50 px-3 sm:px-5 py-2 border-gray-300 font-medium text-gray-700 hover:text-gray-900 text-xs sm:text-sm transition-all disabled:cursor-not-allowed w-full sm:w-auto"
                                >
                                    ← Previous
                                </Button>

                                <div className="text-sm sm:text-base font-medium text-gray-700 px-3 py-1">
                                    Page {pageNum} of {totalPages}
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={goToNextPage}
                                    disabled={pageNum >= totalPages}
                                    className="hover:bg-gray-100 disabled:opacity-50 px-3 sm:px-5 py-2 border-gray-300 font-medium text-gray-700 hover:text-gray-900 text-xs sm:text-sm transition-all w-full sm:w-auto"
                                >
                                    Next →
                                </Button>
                            </div>

                        </div>
                    </div>
                )
                }

                <div className="w-full lg:w-auto">
                    <PdfActionButton
                        setPdfs={setPdfs}
                        setProgress={setProgress}
                        handleButtonAction={handleCrop}
                        loading={loading}
                        progress={progress}
                        messages={messages}
                        beforActionButtonLable={"Crop & Download"}
                        completedMessage="PDF cropping complete ✂️"
                        completeTitle="Your PDF pages were cropped successfully!"
                        completeButtonLable="Download Cropped PDF"
                    />
                </div>
            </div>
        </>
    )
}

export default CropPdfView
