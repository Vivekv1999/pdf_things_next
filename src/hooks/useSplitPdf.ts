import { PDFDocument } from "pdf-lib";
import { useState } from "react";

export type RemoveOption = "odd" | "even" | "custom";

export default function useSplitPdf(
    pdf: { bytes: Uint8Array; pageCount: number },
    removeOption: RemoveOption,
    customPages?: string,
     setProgress?: (value: number) => void
) {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Blob | null>(null);

    const getPagesToRemove = (): number[] => {
        const totalPages = pdf.pageCount;

        // if (removeOption === "all") {
        //     return removedPages || [];
        // }

        if (removeOption === "odd") {
            return Array.from({ length: totalPages }, (_, i) => (i % 2 === 1 ? i : -1)).filter(i => i >= 0);
        }

        if (removeOption === "even") {
            return Array.from({ length: totalPages }, (_, i) => (i % 2 === 0 ? i : -1)).filter(i => i >= 0);
        }

        if (removeOption === "custom" && customPages) {
            const input = customPages.replace(/\s+/g, "");
            const pages = new Set<number>();

            input.split(",").forEach((part) => {
                if (part.includes("-")) {
                    let [start, end] = part.split("-").map((n) => parseInt(n, 10));
                    if (isNaN(start) || isNaN(end)) return;

                    if (end < start) [start, end] = [end, start]; // auto-fix reversed range
                    if (start < 1) start = 1;
                    if (end > totalPages) end = totalPages;

                    for (let i = start; i <= end; i++) {
                        pages.add(i - 1);
                    }
                } else {
                    const page = parseInt(part, 10);
                    if (!isNaN(page) && page >= 1 && page <= totalPages) {
                        pages.add(page - 1);
                    }
                }
            });

            return Array.from(pages);
        }

        return [];
    };

    const parseCustomRanges = (customPages: string, totalPages: number): number[][] => {
        const input = customPages.replace(/\s+/g, "");
        const groups: number[][] = [];

        input.split(",").forEach((part) => {
            const pages: number[] = [];

            if (part.includes("-")) {
                let [start, end] = part.split("-").map((n) => parseInt(n, 10));
                if (isNaN(start) || isNaN(end)) return;

                if (end < start) [start, end] = [end, start];
                if (start < 1) start = 1;
                if (end > totalPages) end = totalPages;

                for (let i = start; i <= end; i++) {
                    pages.push(i - 1); // convert to 0-index
                }
            } else {
                const page = parseInt(part, 10);
                if (!isNaN(page) && page >= 1 && page <= totalPages) {
                    pages.push(page - 1);
                }
            }

            if (pages.length) groups.push(pages);
        });

        return groups;
    };

    const splitPdf = async () => {
        setLoading(true);
        setProgress?.(0);
        try {
            const srcDoc = await PDFDocument.load(pdf.bytes);

            if (removeOption === "custom" && customPages) {
                // Multiple PDFs
                const groups = parseCustomRanges(customPages, pdf.pageCount);
                const totalGroups = groups.length;

                for (let idx = 0; idx < groups.length; idx++) {
                    const newDoc = await PDFDocument.create();
                    const copied = await newDoc.copyPages(srcDoc, groups[idx]);
                    copied.forEach((p) => newDoc.addPage(p));

                    const newBytes = await newDoc.save() as Uint8Array<ArrayBuffer>;
                    const blob = new Blob([newBytes], { type: "application/pdf" });

                    // auto-download
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `split_part_${idx + 1}.pdf`;
                    link.click();
                    URL.revokeObjectURL(url);

                      const percent = Math.round(((idx + 1) / totalGroups) * 100);
                    setProgress?.(percent);
                }
            } else {
                // Original remove-based splitting (odd/even/all)
                const indices = srcDoc.getPageIndices();
                const toRemove = new Set(getPagesToRemove());
                console.log('toRemove', toRemove)
                const pagesToKeep = indices.filter((index) => !toRemove.has(index));

                const newDoc = await PDFDocument.create();
                const copied = await newDoc.copyPages(srcDoc, pagesToKeep);
                copied.forEach((page) => newDoc.addPage(page));

                const newBytes = await newDoc.save() as Uint8Array<ArrayBuffer>
                const blob = new Blob([newBytes], { type: "application/pdf" });
                setResult(blob);

                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "split.pdf";
                link.click();
                URL.revokeObjectURL(url);
            }
        } finally {
            setLoading(false);
        }
    };

    return { splitPdf, loading, result };
}
