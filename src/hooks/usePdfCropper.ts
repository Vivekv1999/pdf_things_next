import { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs`;

const DEFAULT_CROP = { x: 0, y: 0, width: 200, height: 200 };

export const usePdfCropper = () => {
    const [pdfDoc, setPdfDoc] = useState<any>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [cropBox, setCropBox] = useState(DEFAULT_CROP);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const cropBoxRef = useRef<HTMLDivElement | null>(null);

    // Load PDF
    const loadPdf = async (file: File) => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        setPdfDoc(pdf);
        setPdfFile(file);
        setTotalPages(pdf.numPages);
        setPageNum(1);
    };

    // Render PDF page
    const renderPage = async (num: number) => {
        if (!pdfDoc || !canvasRef.current) return;

        const page = await pdfDoc.getPage(num);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        setCanvasSize({ width: viewport.width, height: viewport.height });

        const context = canvas.getContext('2d')!;
        await page.render({ canvasContext: context, viewport }).promise;
    };

    useEffect(() => {
        renderPage(pageNum);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pdfDoc, pageNum]);

    // Crop PDF
    const cropPdfFile = async () => {
        if (!pdfFile) return null;

        const pdfBytes = await pdfFile.arrayBuffer();
        const pdfDocLib = await PDFDocument.load(pdfBytes);
        const pages = pdfDocLib.getPages();

        pages.forEach((page) => {
            const { height } = page.getSize();
            page.setCropBox(cropBox.x, height - cropBox.y - cropBox.height, cropBox.width, cropBox.height);
        });

        return pdfDocLib.save();
    };

    // Page navigation
    const nextPage = () => setPageNum((p) => Math.min(p + 1, totalPages));
    const prevPage = () => setPageNum((p) => Math.max(p - 1, 1));

    return {
        canvasRef,
        cropBoxRef,
        cropBox,
        setCropBox,
        canvasSize,
        pageNum,
        totalPages,
        pdfFile,
        loadPdf,
        nextPage,
        prevPage,
        cropPdfFile,
    };
};
