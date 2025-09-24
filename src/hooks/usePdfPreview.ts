// hooks/usePdfPreview.ts
import pdfjsLib from "@/src/lib/pdfWorker";
import { PDFDocument } from "pdf-lib";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { PdfMeta, ProgressUpdate } from "../types/pdf";

type OnLoadFn = (files: PdfMeta[]) => void;
type OnProgressFn = (update: ProgressUpdate | null) => void;

export default function usePdfPreview(
    onLoad?: OnLoadFn,
    onProgress?: OnProgressFn
) {
    const loadPdfMeta = async (file: File): Promise<Omit<PdfMeta, "id" | "file">> => {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pageCount = doc.getPageCount();

        // Previews start as empty, lazy-loaded later
        const previews: (string | null)[] = Array(pageCount).fill(null);

        return { pageCount, bytes, previews };
    };

    const renderPdfPagePreview = async (
        file: File,
        pageNumber: number,
        scale = 1
    ): Promise<string | null> => {
        try {
            const typedarray = new Uint8Array(await file.arrayBuffer());
            const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
            const page = await pdf.getPage(pageNumber);
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (!context) return null;

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;
            return canvas.toDataURL();
        } catch (err) {
            console.error("Preview error:", err);
            return null;
        }
    };

    const handleAllPdfAtOnce = async (
        fileList: File[],
        totalFiles: number,
        completed: number
    ): Promise<void> => {
        const promises = fileList.map(async (file) => {
            const meta = await loadPdfMeta(file);
            completed++;

            if (onProgress) {
                onProgress({
                    fileName: file.name,
                    completed,
                    totalFiles,
                    stage: "meta-loaded",
                    percent: Math.round((completed / totalFiles) * 100),
                });
            }

            return {
                id: uuidv4(),
                file,
                ...meta,
            } as PdfMeta;
        });

        const enriched = await Promise.all(promises);

        if (onLoad) onLoad(enriched);
    };

    return useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const fileList = Array.from(e.target.files || []).filter(
                (f) => f.type === "application/pdf"
            );

            const totalFiles = fileList.length;
            const completed = 0;

            if (onProgress) {
                onProgress({
                    fileName: "loading...",
                    completed: 0,
                    totalFiles,
                    stage: "init",
                    percent: 0,
                });
            }

            const start = performance.now();
            await handleAllPdfAtOnce(fileList, totalFiles, completed);
            if (onProgress) onProgress(null);
            const end = performance.now();
            console.log(`Loading took ${(end - start).toFixed(2)} ms`);
        },
        [onLoad, onProgress]
    );
}
