"use client";

import LoadingDownload from "@/src/components/LoadingDownload";
import ProcessComplete from "@/src/components/ProcessComplete";
import { Button } from "@/src/components/ui/button";
import useMergePdfs from "@/src/hooks/useMergePdfs";
import { PdfMeta } from "@/src/types/pdf";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

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
                <Button
                    onClick={handleMergePdfs}
                    className="bg-[#4f3df7] hover:bg-[#4f3df7]/90 rounded-lg text-white"
                >
                    Merge & Download
                </Button>
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

            <Button
                variant="outline"
                className="hover:bg-red-50 border-red-300 rounded-lg text-red-500 hover:text-red-600"
                onClick={() => {
                    setPdfs([]);
                    setProgress(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            >
                <RotateCcw className="size-4" />
                Reset
            </Button>
        </div>
    );
};
