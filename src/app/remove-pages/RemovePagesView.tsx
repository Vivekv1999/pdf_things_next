"use client"

import { PdfActionButton } from "@/src/components/pdf/PdfActionButton";
import PdfPagePreview from "@/src/components/PdfPagePreview";
import { Button } from "@/src/components/ui/button";
import useRemovePages from "@/src/hooks/useRemovePages";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setAlredyMergePdf } from "@/src/lib/redux/generalSlice";
import { PdfMeta } from "@/src/types/pdf";
import { downloadPdf } from "@/src/utils/downloadFile";
import { Trash2 } from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";

interface RemovePagesViewProps {
    pdfs: PdfMeta[] | any;
    setPdfs: React.Dispatch<React.SetStateAction<PdfMeta[]>>;
}

const messages = [
    "Analyzing your PDF pages 🔍",
    "Removing selected pages 🗑️",
    "Rebuilding your document 📄",
    "Almost there… finishing touches 🚀",
];

const RemovePagesView = ({
    pdfs,
    setPdfs
}: RemovePagesViewProps) => {
    const [removedIndexes, setRemovedIndexes] = useState<number[]>([]);
    const [customPages, setCustomPages] = useState("");
    const [progress, setProgress] = useState(0);
    const [visiblePages, setVisiblePages] = useState(50); // Start with 50 pages
    const alredyMergePdf = useAppSelector((state) => state.general.alredyMergePdf);
    const dispatch = useAppDispatch();
    const totalPages = pdfs?.[0]?.pageCount;

    // Transform PDF data to show all pages individually
    const allPagesData = useMemo(() => {
        if (!pdfs?.[0]) return [];
        const pdf = pdfs[0];
        return pdf.previews?.map((preview: string, index: number) => ({
            id: `${pdf.id}-page-${index}`,
            file: pdf.file,
            pageCount: pdf.pageCount,
            previews: [preview], // Single preview for this page
        })) || [];
    }, [pdfs]);

    // Get only visible pages for rendering
    const visiblePagesData = useMemo(() => {
        return allPagesData.slice(0, visiblePages);
    }, [allPagesData, visiblePages]);

    // Infinite scroll handler
    const handleScroll = useCallback(() => {
        if (visiblePages >= totalPages) return; // All pages already loaded

        const scrollPosition = window.innerHeight + window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;

        // Load more when user is 200px from bottom
        if (documentHeight - scrollPosition < 200) {
            setVisiblePages(prev => Math.min(prev + 50, totalPages));
        }
    }, [visiblePages, totalPages]);

    // Set up scroll listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const { removePages, loading } = useRemovePages(pdfs?.[0], removedIndexes, setProgress);

    const handleRemove = async () => {
        if (alredyMergePdf?.length) {
            downloadPdf(alredyMergePdf?.[0], "Removed");
            setProgress(100);
            return;
        }

        const resultBytes = await removePages();
        if (resultBytes) {
            dispatch(setAlredyMergePdf([resultBytes]));
        }
    };

    const togglePage = (idx: string) => {
        const pageIndex = parseInt(idx);
        setRemovedIndexes(prev => {
            if (prev.includes(pageIndex)) {
                return prev.filter(i => i !== pageIndex);
            } else {
                return [...prev, pageIndex];
            }
        });
    };

    const selectAll = () => {
        const allPages = Array.from({ length: totalPages }, (_, i) => i);
        setRemovedIndexes(allPages);
    };

    const deselectAll = () => {
        setRemovedIndexes([]);
    };

    const parsePageRanges = (input: string) => {
        const pages: number[] = [];
        input.split(",").forEach((part) => {
            const trimmed = part.trim();
            if (trimmed.includes("-")) {
                let [start, end] = trimmed.split("-").map((n) => parseInt(n, 10));
                if (isNaN(start) || isNaN(end)) return;

                if (end < start) [start, end] = [end, start];
                if (start < 1) start = 1;
                if (end > totalPages) end = totalPages;

                for (let i = start; i <= end; i++) {
                    pages.push(i - 1); // Convert to 0-indexed
                }
            } else {
                const page = parseInt(trimmed, 10);
                if (!isNaN(page) && page >= 1 && page <= totalPages) {
                    pages.push(page - 1); // Convert to 0-indexed
                }
            }
        });
        return pages;
    };

    const applyCustomPages = () => {
        if (customPages) {
            const pages = parsePageRanges(customPages);
            setRemovedIndexes(pages);
        }
    };

    return (
        <div className="mb-40">
            {!alredyMergePdf && (
                <>
                    <div className="my-6 space-y-4">
                        <div>
                            <label className="block mb-2 font-medium">Select Pages to Remove</label>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    variant="outline"
                                    onClick={selectAll}
                                    className="text-sm"
                                >
                                    Select All ({totalPages})
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={deselectAll}
                                    className="text-sm"
                                >
                                    Deselect All
                                </Button>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-sm">Or Enter Page Ranges</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="e.g. 1-3, 5, 7-10"
                                    value={customPages}
                                    onChange={(e) => {
                                        const filtered = e.target.value.replace(/[^0-9,-\s]/g, "");
                                        setCustomPages(filtered);
                                    }}
                                    className="px-3 py-2 border rounded flex-1 text-sm"
                                />
                                <Button
                                    onClick={applyCustomPages}
                                    variant="default"
                                    className="text-sm text-white"
                                >
                                    Apply
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Enter page numbers separated by commas. Use hyphens for ranges.
                            </p>
                        </div>

                        {removedIndexes.length > 0 && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center gap-2 text-red-700">
                                    <Trash2 className="w-5 h-5" />
                                    <span className="font-medium">
                                        {removedIndexes.length} page{removedIndexes.length !== 1 ? 's' : ''} selected for removal
                                    </span>
                                </div>
                                <p className="text-sm text-red-600 mt-1">
                                    {totalPages - removedIndexes.length} page{totalPages - removedIndexes.length !== 1 ? 's' : ''} will remain in the final PDF
                                </p>
                            </div>
                        )}
                    </div>

                    <PdfPagePreview
                        pdfPage={visiblePagesData}
                        handleRemove={togglePage}
                        removedIndexes={removedIndexes}
                        showRemovedIcon={true}
                    />

                    {/* Loading indicator when more pages are available */}
                    {visiblePages < totalPages && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-sm">
                                Showing {visiblePages} of {totalPages} pages. Scroll down to load more...
                            </p>
                        </div>
                    )}
                </>
            )}

            <PdfActionButton
                setPdfs={setPdfs}
                setProgress={setProgress}
                handleButtonAction={handleRemove}
                loading={loading}
                progress={progress}
                messages={messages}
                beforActionButtonLable={`Remove ${removedIndexes.length} Page${removedIndexes.length !== 1 ? 's' : ''}`}
                completeTitle={`Successfully removed ${removedIndexes.length} page${removedIndexes.length !== 1 ? 's' : ''} from your PDF`}
                completeButtonLable={"Download PDF"}
                completedMessage={"Pages Removed"}
            />
        </div>
    );
}

export default RemovePagesView;
