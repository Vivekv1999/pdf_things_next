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
    setPdfs
}: any) => {

    const [pageNum, setPageNum] = useState<number>(1);
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    // const cropBoxRef = useRef<HTMLDivElement | null>(null);

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const [manualLeft, setManualLeft] = useState<string>("");
    const [manualRight, setManualRight] = useState<string>("");
    const [manualTop, setManualTop] = useState<string>("");
    const [manualBottom, setManualBottom] = useState<string>("");

    // Crop mode: 'all' or 'single'
    const [cropMode, setCropMode] = useState<'all' | 'single'>('all');

    // Jump to page input
    const [jumpToPageInput, setJumpToPageInput] = useState<string>("");

    // Load saved crop mode preference from localStorage
    useEffect(() => {
        const savedMode = localStorage.getItem('pdfCropMode');
        if (savedMode === 'all' || savedMode === 'single') {
            setCropMode(savedMode);
        }
    }, []);

    const {
        containerRef,
        cropBox,
        setCropBox,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
    } = useDragSelectCrop(canvasSize);

    const dispatch = useAppDispatch();
    const { cropPdf } = useCropPdf();
    const alredyMergePdf = useAppSelector((state) => state.general.alredyMergePdf);

    useEffect(() => {
        renderPage(pageNum);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pdfDoc, pageNum]);

    // Sync manual inputs with cropBox changes (from visual dragging)
    useEffect(() => {
        if (cropBox && canvasSize.width > 0) {
            setManualLeft(Math.round(cropBox.x).toString());
            setManualTop(Math.round(cropBox.y).toString());
            setManualRight(Math.round(cropBox.x + cropBox.width).toString());
            setManualBottom(Math.round(cropBox.y + cropBox.height).toString());
        }
    }, [cropBox, canvasSize]);

    // Render PDF page
    const renderPage = async (num: number) => {
        if (!pdfDoc || !canvasRef.current) return;

        try {
            const page: PDFPageProxy = await pdfDoc.getPage(num);

            // Get viewport at scale 1 to get original dimensions
            const originalViewport = page.getViewport({ scale: 1 });

            // Calculate scale to ensure good UI appearance
            // Minimum display width: 250px, Maximum display width: 300px
            const minWidth = 350;
            const maxWidth = 400;

            let scale;
            if (originalViewport.width < minWidth) {
                // Scale up small PDFs to minimum width
                scale = minWidth / originalViewport.width;
            } else if (originalViewport.width > maxWidth) {
                // Scale down large PDFs to maximum width
                scale = maxWidth / originalViewport.width;
            } else {
                // Keep original size for PDFs in the ideal range
                scale = 1;
            }

            // Get scaled viewport
            const viewport = page.getViewport({ scale });

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

    // Jump to specific page
    const handleJumpToPage = () => {
        const targetPage = parseInt(jumpToPageInput);
        if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
            setPageNum(targetPage);
            setJumpToPageInput(""); // Clear input after jump
        }
    };

    const handleJumpInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleJumpToPage();
        }
    };

    // Apply manual crop values automatically
    const handleManualInputChange = (field: 'left' | 'right' | 'top' | 'bottom', value: string) => {
        // Update the state first
        switch (field) {
            case 'left':
                setManualLeft(value);
                break;
            case 'right':
                setManualRight(value);
                break;
            case 'top':
                setManualTop(value);
                break;
            case 'bottom':
                setManualBottom(value);
                break;
        }

        // Calculate new crop box
        const left = field === 'left' ? (parseInt(value) || 0) : (parseInt(manualLeft) || 0);
        const top = field === 'top' ? (parseInt(value) || 0) : (parseInt(manualTop) || 0);
        const right = field === 'right' ? (parseInt(value) || canvasSize.width) : (parseInt(manualRight) || canvasSize.width);
        const bottom = field === 'bottom' ? (parseInt(value) || canvasSize.height) : (parseInt(manualBottom) || canvasSize.height);

        // Validate and clamp values
        const clampedLeft = Math.max(0, Math.min(left, canvasSize.width));
        const clampedTop = Math.max(0, Math.min(top, canvasSize.height));
        const clampedRight = Math.max(clampedLeft, Math.min(right, canvasSize.width));
        const clampedBottom = Math.max(clampedTop, Math.min(bottom, canvasSize.height));

        const width = clampedRight - clampedLeft;
        const height = clampedBottom - clampedTop;

        if (width > 0 && height > 0) {
            setCropBox({
                x: clampedLeft,
                y: clampedTop,
                width,
                height
            });
        }
    };

    // Handle crop mode change and save to localStorage
    const handleCropModeChange = (mode: 'all' | 'single') => {
        setCropMode(mode);
        localStorage.setItem('pdfCropMode', mode);
    };

    const handleCrop = async () => {
        if (!pdfDoc || !cropBox) return;
        if (alredyMergePdf) {
            downloadPdf(alredyMergePdf, "Crop pdf")
            return
        }

        setLoading(true);
        setProgress(0);

        try {
            // Pass pageIndex only if cropMode is 'single'
            const pageIndex = cropMode === 'single' ? pageNum - 1 : undefined;

            const croppedBytes = await cropPdf(pdfBytes, cropBox, canvasSize, (p) => {
                setProgress(p);
            }, pageIndex) as Uint8Array<ArrayBuffer>;

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
                    <div className="flex-1 lg:sticky lg:top-4 lg:self-start">
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
                                    {/* Backdrop overlays - darken areas outside crop box */}
                                    {/* Top overlay */}
                                    <div
                                        className="absolute bg-black/50 pointer-events-none"
                                        style={{
                                            left: 0,
                                            top: 0,
                                            width: canvasSize.width,
                                            height: cropBox.y,
                                        }}
                                    />

                                    {/* Bottom overlay */}
                                    <div
                                        className="absolute bg-black/50 pointer-events-none"
                                        style={{
                                            left: 0,
                                            top: cropBox.y + cropBox.height,
                                            width: canvasSize.width,
                                            height: canvasSize.height - (cropBox.y + cropBox.height),
                                        }}
                                    />

                                    {/* Left overlay */}
                                    <div
                                        className="absolute bg-black/50 pointer-events-none"
                                        style={{
                                            left: 0,
                                            top: cropBox.y,
                                            width: cropBox.x,
                                            height: cropBox.height,
                                        }}
                                    />

                                    {/* Right overlay */}
                                    <div
                                        className="absolute bg-black/50 pointer-events-none"
                                        style={{
                                            left: cropBox.x + cropBox.width,
                                            top: cropBox.y,
                                            width: canvasSize.width - (cropBox.x + cropBox.width),
                                            height: cropBox.height,
                                        }}
                                    />

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
                        </div>

                        <div className="flex justify-start mt-2 md:mt-3">
                            <div className="bg-white rounded-lg shadow-md px-4 py-3 border border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3">
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
                    </div>
                )}

                <div className="w-full lg:w-auto flex flex-col gap-4">
                    {/* Jump to Page */}
                    {!alredyMergePdf && (
                        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Jump to Page
                            </h3>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    min="1"
                                    max={totalPages}
                                    value={jumpToPageInput}
                                    onChange={(e) => setJumpToPageInput(e.target.value)}
                                    onKeyPress={handleJumpInputKeyPress}
                                    placeholder="Enter page number"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <Button
                                    variant="outline"
                                    onClick={handleJumpToPage}
                                    disabled={!jumpToPageInput || parseInt(jumpToPageInput) < 1 || parseInt(jumpToPageInput) > totalPages}
                                    className="px-4 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Go
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Page {pageNum} of {totalPages}</p>
                        </div>
                    )}

                    {/* Crop Mode Selection */}
                    {!alredyMergePdf && (
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-4 border border-blue-200">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Crop Mode
                            </h3>
                            <div className="flex flex-col gap-2.5">
                                <label className="flex items-center gap-3 p-2.5 rounded-md hover:bg-white/60 transition-colors cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="cropMode"
                                        value="all"
                                        checked={cropMode === 'all'}
                                        onChange={() => handleCropModeChange('all')}
                                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700">Crop all pages</span>
                                        <span className="text-xs text-gray-500">Apply to entire PDF</span>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-2.5 rounded-md hover:bg-white/60 transition-colors cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="cropMode"
                                        value="single"
                                        checked={cropMode === 'single'}
                                        onChange={() => handleCropModeChange('single')}
                                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700">Current page only</span>
                                        <span className="text-xs text-gray-500">Page {pageNum} of {totalPages}</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Manual Crop Input Section */}
                    {!alredyMergePdf && (
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-md p-4 border border-indigo-200">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                                Manual Crop Area (pixels)
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Left (L)</label>
                                    <input
                                        type="number"
                                        value={manualLeft}
                                        onChange={(e) => handleManualInputChange('left', e.target.value)}
                                        placeholder="0"
                                        className="w-full px-3 py-2 border border-indigo-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Right (R)</label>
                                    <input
                                        type="number"
                                        value={manualRight}
                                        onChange={(e) => handleManualInputChange('right', e.target.value)}
                                        placeholder={canvasSize.width.toString()}
                                        className="w-full px-3 py-2 border border-indigo-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Top (T)</label>
                                    <input
                                        type="number"
                                        value={manualTop}
                                        onChange={(e) => handleManualInputChange('top', e.target.value)}
                                        placeholder="0"
                                        className="w-full px-3 py-2 border border-indigo-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Bottom (B)</label>
                                    <input
                                        type="number"
                                        value={manualBottom}
                                        onChange={(e) => handleManualInputChange('bottom', e.target.value)}
                                        placeholder={canvasSize.height.toString()}
                                        className="w-full px-3 py-2 border border-indigo-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
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
