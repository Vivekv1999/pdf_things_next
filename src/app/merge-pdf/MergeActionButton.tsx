"use client";

import LoadingDownload from "@/src/components/LoadingDownload";
import useMergePdfs from "@/src/hooks/useMergePdfs";
import { CheckCircle, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { PdfMeta } from "./page";

interface MergeActionButtonProps {
    pdfs: PdfMeta[];
    setPdfs: React.Dispatch<React.SetStateAction<PdfMeta[]>>;
    setProgress: React.Dispatch<React.SetStateAction<any>>;
    alredyMergePdf: any;
    setAlredyMergePdf: any;
}

export const MergeActionButton = ({
    pdfs,
    setPdfs,
    setProgress,
    alredyMergePdf,
    setAlredyMergePdf,
}: MergeActionButtonProps) => {
    const { mergePdfs, loading, progress, setLoading } = useMergePdfs();

    const messages = [
        "Gathering your pages 📄",
        "Merging like a pro 🔗",
        "Compressing bits & bytes ⚡",
        "Almost there… 🚀",
    ];

    useEffect(() => {
        if (pdfs?.length && alredyMergePdf) {
            setAlredyMergePdf(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pdfs]);

    const handleMergePdfs = async () => {
        const start = performance.now();

        if (alredyMergePdf) {
            alredyMergePdf.download();
        } else {
            const result = await mergePdfs(pdfs);
            setAlredyMergePdf(result);
            if (result) {
                result.download();
                setLoading(false);
            }
        }

        const end = performance.now();
        console.log(`Merging took ${(end - start).toFixed(2)} ms`);
    };

    return (
        <div className="flex sm:flex-row flex-col justify-center items-center gap-3 mt-28">
            {!loading && !alredyMergePdf && (
                <button
                    onClick={handleMergePdfs}
                    className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl w-full sm:w-auto font-semibold text-white transition-colors cursor-pointer"
                >
                    Merge & Download
                </button>
            )}

            {loading && <LoadingDownload progress={progress} messages={messages} />}

            {alredyMergePdf && !loading && (
                <div className="p-6 rounded-2xl w-full max-w-md text-center">
                    <CheckCircle className="mx-auto mb-3 w-12 h-12 text-green-600" />
                    <h3 className="mb-2 font-semibold text-gray-800 text-xl">
                        Merge Complete
                    </h3>
                    <p className="mb-4 text-gray-500">
                        {pdfs.length} files merged successfully
                    </p>
                    <button
                        onClick={handleMergePdfs}
                        className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-2xl w-full font-semibold text-white text-lg transition-colors cursor-pointer"
                    >
                        Download Merged PDF
                    </button>
                </div>
            )}

            <button
                onClick={() => {
                    setPdfs([]);
                    setProgress(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex justify-center items-center gap-2 hover:bg-red-100 px-6 py-3 border border-red-300 rounded-xl w-full sm:w-auto font-medium text-red-600 transition-colors cursor-pointer"
            >
                <RotateCcw className="w-4 h-4" />
                Reset
            </button>
        </div>
    );
};
