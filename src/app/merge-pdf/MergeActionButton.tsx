"use client";

import LoadingDownload from "@/src/components/LoadingDownload";
import useMergePdfs from "@/src/hooks/useMergePdfs";
import { CheckCircle, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import ProcessComplete from "@/src/components/ProcessComplete";
import { PdfMeta } from "@/src/types/pdf";

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
                <ProcessComplete
                    message="Merge Complete"
                    title={`${pdfs.length} files merged successfully`}
                    onDownload={handleMergePdfs}
                    buttonLabel=" Download Merged PDF"
                />
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
