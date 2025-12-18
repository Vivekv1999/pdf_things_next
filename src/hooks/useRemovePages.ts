import { PDFDocument } from "pdf-lib";
import { useState } from "react";

export default function useRemovePages(
    pdf: { bytes: Uint8Array; pageCount: number },
    pagesToRemove: number[],
    setProgress?: (value: number) => void
) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Blob | null>(null);

    const removePages = async () => {
        setLoading(true);
        setProgress?.(0);
        try {
            const srcDoc = await PDFDocument.load(pdf.bytes);
            const indices = srcDoc.getPageIndices();
            
            // Filter out pages to remove (convert to Set for faster lookup)
            const toRemove = new Set(pagesToRemove);
            const pagesToKeep = indices.filter((index) => !toRemove.has(index));

            setProgress?.(30);

            // Create new document with only the pages we want to keep
            const newDoc = await PDFDocument.create();
            const copied = await newDoc.copyPages(srcDoc, pagesToKeep);
            copied.forEach((page) => newDoc.addPage(page));

            setProgress?.(70);

            const newBytes = await newDoc.save() as Uint8Array<ArrayBuffer>;
            const blob = new Blob([newBytes], { type: "application/pdf" });

            setResult(blob);
            setProgress?.(100);

            return newBytes;
        } catch (error) {
            console.error("Error removing pages:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { removePages, loading, result };
}
