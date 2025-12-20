"use client";

import { useState, useEffect, useRef } from "react";
import { usePdfCache } from "@/src/contexts/PdfCacheContext";

interface LazyPdfPageProps {
    file: File;
    pageIndex: number;
    isSelected: boolean;
    onToggle: (index: number) => void;
}

const LazyPdfPage = ({ file, pageIndex, isSelected, onToggle }: LazyPdfPageProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { requestPageLoad, updatePriority } = usePdfCache();
    const hasRequestedRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Intersection Observer to detect when page is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const wasVisible = isVisible;
                    const nowVisible = entry.isIntersecting;

                    setIsVisible(nowVisible);

                    if (nowVisible && !preview && !hasRequestedRef.current) {
                        // Clear any existing timeout
                        if (scrollTimeoutRef.current) {
                            clearTimeout(scrollTimeoutRef.current);
                        }

                        // Wait 600ms after scrolling stops before loading
                        scrollTimeoutRef.current = setTimeout(() => {
                            setIsLoading(true);
                            hasRequestedRef.current = true;
                            // Priority = pageIndex for sequential loading (page 0 first, then 1, then 2, etc.)
                            requestPageLoad(file, pageIndex, pageIndex, (dataUrl) => {
                                setPreview(dataUrl);
                                setIsLoading(false);
                            });
                        }, 600);
                    } else if (!nowVisible && wasVisible && isLoading) {
                        // Page scrolled out of view while loading - very low priority
                        updatePriority(pageIndex, 999999);

                        // Clear timeout if scrolling away
                        if (scrollTimeoutRef.current) {
                            clearTimeout(scrollTimeoutRef.current);
                        }
                    } else if (nowVisible && isLoading) {
                        // Page came back into view while still loading - restore priority based on page number
                        updatePriority(pageIndex, pageIndex);
                    }
                });
            },
            {
                rootMargin: "200px",
                threshold: 0.01,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
            // Clear timeout on unmount
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [file, pageIndex, preview, isLoading, isVisible, requestPageLoad, updatePriority]);

    return (
        <div
            ref={containerRef}
            className="relative group cursor-pointer"
            onClick={() => onToggle(pageIndex)}
        >
            <div className="border-2 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg"
                style={{
                    borderColor: isSelected ? "#ef4444" : "#e5e7eb",
                    backgroundColor: isSelected ? "#fee2e2" : "white"
                }}
            >
                <div className="aspect-[1/1.414] bg-gray-100 flex items-center justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
                            <span className="text-xs text-gray-500">Loading...</span>
                        </div>
                    ) : preview ? (
                        <img
                            src={preview}
                            alt={`Page ${pageIndex + 1}`}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <div className="text-gray-400 text-sm">Page {pageIndex + 1}</div>
                    )}
                </div>

                {/* Page number badge */}
                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded shadow text-xs font-medium z-10">
                    {pageIndex + 1}
                </div>

                {/* Big diagonal cross when selected - 35% size, centered */}
                {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <svg className="w-[35%] h-[35%]" viewBox="0 0 100 100">
                            <line x1="10" y1="10" x2="90" y2="90" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
                            <line x1="90" y1="10" x2="10" y2="90" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LazyPdfPage;
