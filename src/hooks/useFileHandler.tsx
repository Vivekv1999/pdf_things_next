// hooks/useFileHandler.ts
import pdfjsLib from "@/src/lib/pdfWorker";
import { PDFDocument } from "pdf-lib";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { PdfMeta, ProgressUpdate } from "../types/pdf";

type OnLoadFn = (files: PdfMeta[]) => void;
type OnProgressFn = (update: ProgressUpdate | null) => void;

export default function useFileHandler(
    onLoad?: OnLoadFn,
    onProgress?: OnProgressFn,
    previeAllPages: boolean = false
) {
    const loadPdfMeta = async (file: File): Promise<Omit<PdfMeta, "id" | "file">> => {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pageCount = doc.getPageCount();

        const previews = previeAllPages ?
            await Promise.all(
                Array.from({ length: pageCount }, (_, i) => renderPdfPagePreview(file, i + 1))
            ) :
            [await renderPdfPagePreview(file, 1)];

        return { pageCount, bytes, previews };
    };

    const renderPdfPagePreview = async (
        file: File,
        pageNumber: number
    ): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const typedarray = new Uint8Array(reader.result as ArrayBuffer);
                    const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
                    const page = await pdf.getPage(pageNumber);
                    const viewport = page.getViewport({ scale: 1 });
                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    if (!context) {
                        resolve(null);
                        return;
                    }
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    await page.render({ canvasContext: context, viewport, canvas }).promise;
                    resolve(canvas.toDataURL());
                } catch (error) {
                    console.error("Preview error:", error);
                    resolve(null);
                }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    };

    const handleAllPdfAtOnce = async (
        fileList: File[],
        totalFiles: number,
        completed: number
    ): Promise<void> => {
        const promises = fileList.map((file) =>
            loadPdfMeta(file).then((meta) => {
                completed++;

                if (onProgress) {
                    onProgress({
                        fileName: file.name,
                        completed,
                        totalFiles,
                        stage: "done",
                        percent: Math.round((completed / totalFiles) * 100),
                    });
                }

                return {
                    id: uuidv4(),
                    file,
                    ...meta,
                } as PdfMeta;
            })
        );

        const enriched = await Promise.all(promises);

        if (onLoad) onLoad(enriched);
    };

    return useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {

            // const allFileArr = isMultiFile ? Array.from(e.target.files || []) : [e.target.files?.[0]]
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
                    stage: "done",
                    percent: 0,
                });
            }

            const start = performance.now();
            await handleAllPdfAtOnce(fileList, totalFiles, completed);
            if (onProgress) onProgress(null);
            const end = performance.now();
            console.log(`Merging took ${(end - start).toFixed(2)} ms`);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onLoad, onProgress]
    );
}
