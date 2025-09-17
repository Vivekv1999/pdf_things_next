// hooks/useMergePdfs.ts
import { PDFDocument } from "pdf-lib";
import { useState } from "react";
import { APP_NAME } from "../constants/appConstants";

export interface PdfFile {
    name: string;
    bytes: Uint8Array;
}

export interface MergeResult {
    blob: Blob;
    url: string;
    download: () => void;
}

export default function useMergePdfs() {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState<number>(0);
    const [result, setResult] = useState<MergeResult | null>(null);

    const mergePdfs = async (pdfs: PdfFile[]): Promise<MergeResult | null> => {
        if (!pdfs || pdfs.length === 0) return null;

        setLoading(true);
        setProgress(0);
        setResult(null);

        const merged = await PDFDocument.create();

        for (let i = 0; i < pdfs.length; i++) {
            const pdf = pdfs[i];
            const srcDoc = await PDFDocument.load(pdf.bytes);
            const copied = await merged.copyPages(srcDoc, srcDoc.getPageIndices());
            copied.forEach((page) => merged.addPage(page));

            // update progress
            setProgress(Math.round(((i + 0.8) / pdfs.length) * 100));
        }

        const mergedBytes = await merged.save();
        const blob = new Blob([mergedBytes], { type: "application/pdf" });
        const objectUrl = URL.createObjectURL(blob);

        const download = () => {
            const link = document.createElement("a");
            link.href = objectUrl;
            link.download = `${APP_NAME}-merged.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up for Safari/Firefox
            setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
        };

        const resultObj: MergeResult = { blob, url: objectUrl, download };
        setResult(resultObj);

        return resultObj;
    };

    return { mergePdfs, loading, progress, result, setLoading };
}
