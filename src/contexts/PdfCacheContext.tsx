"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

interface LoadRequest {
    pageIndex: number;
    priority: number; // Lower number = higher priority
    callback: (dataUrl: string) => void;
}

interface PdfCacheContextType {
    getPdfDocument: (file: File) => Promise<PDFDocumentProxy>;
    requestPageLoad: (file: File, pageIndex: number, priority: number, callback: (dataUrl: string) => void) => void;
    updatePriority: (pageIndex: number, newPriority: number) => void;
}

const PdfCacheContext = createContext<PdfCacheContextType | null>(null);

export const usePdfCache = () => {
    const context = useContext(PdfCacheContext);
    if (!context) {
        throw new Error("usePdfCache must be used within PdfCacheProvider");
    }
    return context;
};

export const PdfCacheProvider = ({ children }: { children: ReactNode }) => {
    const [pdfCache, setPdfCache] = useState<Map<string, PDFDocumentProxy>>(new Map());
    const loadQueueRef = useRef<LoadRequest[]>([]);
    const isProcessingRef = useRef(false);
    const currentFileRef = useRef<File | null>(null);

    const getPdfDocument = async (file: File): Promise<PDFDocumentProxy> => {
        const cacheKey = `${file.name}-${file.size}-${file.lastModified}`;

        if (pdfCache.has(cacheKey)) {
            return pdfCache.get(cacheKey)!;
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdfjsLib = (await import("@/src/lib/pdfWorker")).default;
        const typedarray = new Uint8Array(arrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

        setPdfCache(prev => new Map(prev).set(cacheKey, pdf));
        return pdf;
    };

    const processQueue = useCallback(async () => {
        if (isProcessingRef.current || loadQueueRef.current.length === 0) return;

        isProcessingRef.current = true;

        while (loadQueueRef.current.length > 0) {
            // Sort by priority (lower number = higher priority)
            loadQueueRef.current.sort((a, b) => a.priority - b.priority);

            // Get highest priority request
            const request = loadQueueRef.current.shift();
            if (!request || !currentFileRef.current) continue;

            try {
                const pdf = await getPdfDocument(currentFileRef.current);
                const page = await pdf.getPage(request.pageIndex + 1);
                const viewport = page.getViewport({ scale: 1 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                if (context) {
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    await page.render({ canvasContext: context, viewport, canvas }).promise;
                    request.callback(canvas.toDataURL());
                }
            } catch (error) {
                console.error("Error loading page:", error);
            }

            // Small delay to allow UI updates
            await new Promise(resolve => setTimeout(resolve, 10));
        }

        isProcessingRef.current = false;
    }, [getPdfDocument]);

    const requestPageLoad = useCallback((
        file: File,
        pageIndex: number,
        priority: number,
        callback: (dataUrl: string) => void
    ) => {
        currentFileRef.current = file;

        // Check if already in queue
        const existingIndex = loadQueueRef.current.findIndex(r => r.pageIndex === pageIndex);

        if (existingIndex !== -1) {
            // Update priority if already in queue
            loadQueueRef.current[existingIndex].priority = priority;
        } else {
            // Add new request
            loadQueueRef.current.push({ pageIndex, priority, callback });
        }

        processQueue();
    }, [processQueue]);

    const updatePriority = useCallback((pageIndex: number, newPriority: number) => {
        const request = loadQueueRef.current.find(r => r.pageIndex === pageIndex);
        if (request) {
            request.priority = newPriority;
            // Re-sort queue
            loadQueueRef.current.sort((a, b) => a.priority - b.priority);
        }
    }, []);

    return (
        <PdfCacheContext.Provider value={{ getPdfDocument, requestPageLoad, updatePriority }}>
            {children}
        </PdfCacheContext.Provider>
    );
};
