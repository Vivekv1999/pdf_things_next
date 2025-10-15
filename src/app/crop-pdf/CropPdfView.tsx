"use client"

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

const CropPdfView = ({
    pdfDoc,
    totalPages
}: any) => {

    const [pageNum, setPageNum] = useState<number>(1);
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cropBoxRef = useRef<HTMLDivElement | null>(null);

    const {
        containerRef,
        cropBox,
        setCropBox,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    } = useDragSelectCrop();

    useEffect(() => {
        renderPage(pageNum);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pdfDoc, pageNum]);

    // useEffect(() => {
    //     const cropBoxElement = cropBoxRef.current;
    //     const canvasElement = canvasRef.current;

    //     if (!cropBoxElement || !canvasElement) return;

    //     // Clean up any previous instance
    //     interact(cropBoxElement).unset();

    //     const { width: canvasWidth, height: canvasHeight } = canvasSize;

    //     const instance = interact(cropBoxElement)
    //         .draggable({
    //             modifiers: [
    //                 interact.modifiers.restrictRect({
    //                     restriction: 'parent',
    //                     endOnly: false,
    //                 }),
    //             ],
    //             listeners: {
    //                 move(event) {
    //                     setCropBox((prev): any => {
    //                         let newX = prev?.x + event.dx;
    //                         let newY = prev?.y + event.dy;
    //                         newX = Math.max(0, Math.min(newX, canvasWidth - (prev?.width || 0)));
    //                         newY = Math.max(0, Math.min(newY, canvasHeight - (prev?.height || 0)));
    //                         return { ...prev, x: newX, y: newY };
    //                     });
    //                 },
    //             },
    //         })
    //         .resizable({
    //             edges: { left: true, right: true, bottom: true, top: true },
    //             modifiers: [
    //                 interact.modifiers.restrictSize({
    //                     min: { width: 20, height: 20 },
    //                     max: { width: canvasWidth, height: canvasHeight },
    //                 }),
    //                 interact.modifiers.restrictRect({
    //                     restriction: 'parent',
    //                 }),
    //             ],
    //             listeners: {
    //                 move(event) {
    //                     const rect = event.rect;
    //                     const canvasRect = canvasElement.getBoundingClientRect();
    //                     setCropBox({
    //                         x: rect.left - canvasRect.left,
    //                         y: rect.top - canvasRect.top,
    //                         width: rect.width,
    //                         height: rect.height,
    //                     });
    //                 },
    //             },
    //         });

    //     // Full cleanup (important)
    //     return () => {
    //         instance.unset();
    //     };
    // }, [canvasRef, cropBoxRef, canvasSize.width, canvasSize.height]);


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

    return (
        <>
            {pdfDoc && (
                <div
                    ref={containerRef}
                    className="inline-block relative select-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <canvas ref={canvasRef} className="w-auto h-auto" />
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
                        <button
                            onClick={() => { }}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                        >
                            Crop PDF
                        </button>
                    </div>
                )
            }

        </>
    )
}

export default CropPdfView
