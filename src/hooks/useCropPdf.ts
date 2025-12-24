import { PDFDocument } from "pdf-lib";

interface CropBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export default function useCropPdf() {
    const cropPdf = async (
        pdfBytes: Uint8Array,
        cropBox: CropBox,
        canvasSize: { width: number; height: number },
        onProgress?: (percent: number) => void,
        pageIndex?: number // Optional: if provided, crop only this page (0-based index)
    ) => {
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();
        const total = pages.length;

        // Determine which pages to crop
        const pagesToCrop = pageIndex !== undefined ? [pageIndex] : Array.from({ length: total }, (_, i) => i);

        for (let idx = 0; idx < pagesToCrop.length; idx++) {
            const i = pagesToCrop[idx];
            const page = pages[i];
            const { width: pdfWidth, height: pdfHeight } = page.getSize();

            const scaleX = pdfWidth / canvasSize.width;
            const scaleY = pdfHeight / canvasSize.height;

            const x = cropBox.x * scaleX;
            const y = pdfHeight - (cropBox.y + cropBox.height) * scaleY;
            const width = cropBox.width * scaleX;
            const height = cropBox.height * scaleY;

            page.setCropBox(x, y, width, height);
            page.setMediaBox(x, y, width, height);

            // 💡 Update progress
            if (onProgress) {
                const percent = Math.round(((idx + 1) / pagesToCrop.length) * 100);
                onProgress(percent);
            }

            // Optional: yield to UI to keep it responsive
            await new Promise((r) => setTimeout(r, 20));
        }

        const newPdfBytes = await pdfDoc.save();
        return newPdfBytes;
    };

    return { cropPdf };
}
