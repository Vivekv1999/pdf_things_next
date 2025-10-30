// hooks/useCropPdf.ts
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
        pageNumber: number,
        canvasSize?: { width: number; height: number }
    ) => {
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const page = pdfDoc.getPage(pageNumber - 1); // pdf-lib is 0-indexed
        console.log(cropBox, "cropBpdfBytesox", pdfBytes);

        const { width: pdfWidth, height: pdfHeight } = page.getSize();

        // Calculate scale (canvas vs actual PDF size)
        const scaleX = pdfWidth / canvasSize?.width;
        const scaleY = pdfHeight / canvasSize?.height;

        // Convert coordinates to PDF space (Y-axis flipped)
        const x = cropBox.x * scaleX;
        const y = pdfHeight - (cropBox.y + cropBox.height) * scaleY;
        const width = cropBox.width * scaleX;
        const height = cropBox.height * scaleY;

        // Apply crop
        page.setCropBox(x, y, width, height);
        page.setMediaBox(x, y, width, height);

        const newPdfBytes = await pdfDoc.save();
        return newPdfBytes;
    };

    return { cropPdf };
}
