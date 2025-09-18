import { PDFDocument } from "pdf-lib";
import { useState } from "react";

export default function useSplitPdf() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Blob | null>(null);

    const splitPdf = async (file: File, ranges: string) => {
        setLoading(true);
        try {
            const pdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const totalPages = pdfDoc.getPageCount();

            // Parse ranges like "1-3,5,7-8"
            const pageGroups = ranges.split(",").map(r => {
                if (r.includes("-")) {
                    const [start, end] = r.split("-").map(Number);
                    return Array.from({ length: end - start + 1 }, (_, i) => start + i - 1);
                }
                return [Number(r) - 1];
            });

            const newDocs: Blob[] = [];

            for (const group of pageGroups) {
                const newPdf = await PDFDocument.create();
                const copiedPages = await newPdf.copyPages(pdfDoc, group);
                copiedPages.forEach((p) => newPdf.addPage(p));
                const newBytes = await newPdf.save();
                newDocs.push(new Blob([newBytes], { type: "application/pdf" }));
            }

            setResult(newDocs[0]); // return first by default
            return newDocs;
        } catch (err) {
            console.error("Error splitting PDF:", err);
        } finally {
            setLoading(false);
        }
    };

    return { splitPdf, result, loading };
}
