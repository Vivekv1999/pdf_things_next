"use client"

import { PdfActionButton } from "@/src/components/pdf/PdfActionButton";
import { Button } from "@/src/components/ui/button";
import useRemovePages from "@/src/hooks/useRemovePages";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setAlredyMergePdf } from "@/src/lib/redux/generalSlice";
import { PdfMeta } from "@/src/types/pdf";
import { downloadPdf } from "@/src/utils/downloadFile";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import LazyPdfPage from "@/src/components/LazyPdfPage";
import { PdfCacheProvider } from "@/src/contexts/PdfCacheContext";

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
    const alredyMergePdf = useAppSelector((state) => state.general.alredyMergePdf);
    const dispatch = useAppDispatch();
    const totalPages = pdfs?.[0]?.pageCount;
    const pdfFile = pdfs?.[0]?.file;

    const { removePages, loading } = useRemovePages(pdfs?.[0], removedIndexes, setProgress);

    const handleRemove = async () => {
        if (alredyMergePdf?.length) {
            downloadPdf(alredyMergePdf?.[0], "Removed");
            setProgress(100);
            return;
        }

        const resultBytes = await removePages();
        if (resultBytes) {
            // Auto-download the PDF
            downloadPdf(resultBytes, "Removed");
            dispatch(setAlredyMergePdf([resultBytes]));
        }
    };

    const togglePage = (pageIndex: number) => {
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

    const selectOddPages = () => {
        const oddPages = Array.from({ length: totalPages }, (_, i) => i).filter(i => (i + 1) % 2 === 1);
        setRemovedIndexes(oddPages);
    };

    const selectEvenPages = () => {
        const evenPages = Array.from({ length: totalPages }, (_, i) => i).filter(i => (i + 1) % 2 === 0);
        setRemovedIndexes(evenPages);
    };

    return (
        <div className="mb-40">
            {!alredyMergePdf && (
                <>
                    {/* Sticky action bar */}
                    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md mb-6">
                        <div className="max-w-7xl mx-auto px-4 py-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={selectAll}
                                        className="text-sm"
                                    >
                                        Select All ({totalPages})
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={selectOddPages}
                                        className="text-sm"
                                    >
                                        Select Odd Pages
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={selectEvenPages}
                                        className="text-sm"
                                    >
                                        Select Even Pages
                                    </Button>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={deselectAll}
                                        className="text-sm"
                                    >
                                        Reset Selection
                                    </Button>
                                    <Button
                                        onClick={handleRemove}
                                        disabled={loading || removedIndexes.length === 0}
                                        className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Remove {removedIndexes.length > 0 ? `${removedIndexes.length} Page${removedIndexes.length !== 1 ? 's' : ''}` : 'Pages'}
                                    </Button>
                                </div>
                            </div>

                            {removedIndexes.length > 0 && (
                                <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <div className="flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
                                        <Trash2 className="w-4 h-4" />
                                        <span className="font-medium">
                                            {removedIndexes.length} page{removedIndexes.length !== 1 ? 's' : ''} selected for removal
                                        </span>
                                        <span className="text-red-600 dark:text-red-500">•</span>
                                        <span>
                                            {totalPages - removedIndexes.length} page{totalPages - removedIndexes.length !== 1 ? 's' : ''} will remain
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="my-6 space-y-4">
                        <div>
                            <label className="block mb-2 font-medium text-sm">Enter Page Ranges (Optional)</label>
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
                    </div>

                    {/* Grid of lazy-loaded pages */}
                    <PdfCacheProvider>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-10">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <LazyPdfPage
                                    key={index}
                                    file={pdfFile}
                                    pageIndex={index}
                                    isSelected={removedIndexes.includes(index)}
                                    onToggle={togglePage}
                                />
                            ))}
                        </div>
                    </PdfCacheProvider>
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
