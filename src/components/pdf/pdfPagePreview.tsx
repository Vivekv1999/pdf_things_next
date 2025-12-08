interface PdfPagePreviewProps {
    pdfPage: any;
    handleRemove?: (id: string) => void;
    removedIndexes?: any,
    showRemovedIcon?: boolean
}

const PdfPagePreview = ({ pdfPage, handleRemove, removedIndexes, showRemovedIcon = false }: PdfPagePreviewProps) => {

    return (
        <div className="flex flex-wrap justify-center gap-4 mx-auto p-4 max-w-7xl">
            {pdfPage?.map((pdfUrl: any, idx: any) => {
                const isRemoved = showRemovedIcon && removedIndexes?.includes(idx);
                return (
                    <div
                        key={idx}
                        className="relative bg-white hover:bg-gray-50 shadow p-2 border rounded-xl w-[18%] min-w-[11rem] sm:min-w-[12rem] md:min-w-[13rem] max-w-[14rem] sm:max-w-[15rem] md:max-w-[16rem] h-60 md:h-64 transition"
                        onClick={() => handleRemove && handleRemove(idx)}
                    >
                        {/* Remove / Undo button */}
                        <button
                            type="button"
                            className={`top-1.5 right-1.5 z-20 absolute shadow-md p-1 rounded-full transition-colors ${isRemoved
                                ? "bg-green-500 text-white hover:bg-green-600" // Undo = green
                                : "bg-white/80 hover:bg-red-500 text-gray-600 hover:text-white" // Remove = red on hover
                                }`}
                            title={isRemoved ? "Undo remove" : "Remove page"}
                            aria-label={`${isRemoved ? "Undo remove" : "Remove"} page ${idx}`}
                        >
                            {isRemoved ? (
                                // Undo icon ↺
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 10h7V3m0 0L3 10m7-7a9 9 0 11-3.8 16.2"
                                    />
                                </svg>
                            ) : (
                                // Remove icon X
                                showRemovedIcon &&
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>

                        {/* Page content */}
                        <div className="relative mb-2 rounded-lg">
                            <img
                                key={pdfUrl?.id}
                                src={pdfUrl?.previews?.[0] || "/placeholder.png"}
                                alt={`PDF ${idx + 1} page ${idx + 1}`}
                                className={`mb-2 rounded w-full h-36 sm:h-40 md:h-44 object-contain transition ${isRemoved ? "opacity-40" : ""
                                    }`}
                                loading="lazy"
                            />
                            <span className="top-1 left-[-4px] absolute bg-indigo-600 px-2 py-1 rounded font-semibold text-white text-xs">
                                {String(idx + 1).padStart(2, "0")}
                            </span>

                            {/* Big ❌ overlay when removed */}
                            {isRemoved && (
                                <div
                                    className="absolute inset-0 flex justify-center items-center"
                                >
                                    <span className="font-bold text-red-600 text-6xl pointer-events-none">
                                        ✕
                                    </span>
                                </div>
                            )}
                        </div>
                        <p className="mb-1 text-gray-800 text-xs truncate">{pdfUrl.file.name}</p>
                        <p className="text-gray-500 text-xs">
                            {pdfUrl.pageCount} page{pdfUrl.pageCount > 1 ? "s" : ""}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};
export default PdfPagePreview;

