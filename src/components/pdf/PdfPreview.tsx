"use client";

import { PdfMeta } from "@/src/types/pdf";

interface PdfPreviewProps {
    pdfs: PdfMeta[];
    showAllPages?: boolean;
    handleRemove?: (id: string) => void;
}

export const PdfPreview = ({
    pdfs,
    showAllPages = false,
    handleRemove
}: PdfPreviewProps) => {

    function formatFileSize(bytes: number) {
        if (bytes < 1024) return `${bytes} B`;
        else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 mx-auto p-4 max-w-7xl">
            {pdfs?.map((pdf, idx) => (
                <div
                    key={pdf.id}
                    className="bg-white hover:bg-gray-50 shadow p-2 border border-gray-300 rounded-xl w-[18%] min-w-[11rem] sm:min-w-[12rem] md:min-w-[13rem] max-w-[14rem] sm:max-w-[15rem] md:max-w-[16rem] h-60 md:h-64"
                >
                    {handleRemove && (
                        <button
                            type="button"
                            onClick={() => handleRemove(pdf.id)}
                            className="top-1.5 right-1.5 z-10 absolute bg-white/80 hover:bg-red-500 shadow-md p-1 rounded-full text-gray-600 hover:text-white transition-colors"
                            title="Remove PDF"
                            aria-label={`Remove ${pdf.file.name}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}

                    <div className="relative mb-2">
                        {(showAllPages ? pdf.previews : [pdf.previews?.[0] || ""]).map((src, pageIdx) => (
                            <img
                                key={pageIdx}
                                src={src || "/placeholder.png"}
                                alt={`PDF ${idx + 1} page ${pageIdx + 1}`}
                                className="mb-2 rounded w-full h-36 sm:h-40 md:h-44 object-contain"
                                loading="lazy"
                            />
                        ))}
                        <span className="top-1 left-[-4px] absolute bg-indigo-600 px-2 py-1 rounded font-semibold text-white text-xs">
                            {String(idx + 1).padStart(2, "0")}
                        </span>
                    </div>

                    <p className="mb-1 text-gray-800 text-xs truncate">{pdf.file.name}</p>
                    <p className="flex justify-between text-gray-500 text-xs">
                        <span>
                            {pdf.pageCount} page{pdf.pageCount > 1 ? "s" : ""}
                        </span>
                        <span>
                            {formatFileSize(pdf.file.size)}
                        </span>
                    </p>
                </div>
            ))}
        </div>
    );
};