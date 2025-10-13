"use client";

import LoadingDownload from "@/src/components/LoadingDownload";
import ProcessComplete from "@/src/components/ProcessComplete";
import { Button } from "@/src/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setAlredyMergePdf } from "@/src/lib/redux/generalSlice";
import { PdfMeta } from "@/src/types/pdf";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

interface PdfActionButtonProps {
    pdfs: PdfMeta[];
    setPdfs: React.Dispatch<React.SetStateAction<PdfMeta[]>>;
    setProgress: React.Dispatch<React.SetStateAction<any>>;
    handleButtonAction: () => void;
    loading?: any
    progress?: any
    messages?: any
    beforActionButtonLable?: any
    completeButtonLable?: any
    completeTitle?: any
    completedMessage?: any
}

export const PdfActionButton = ({
    pdfs,
    setPdfs,
    setProgress,
    handleButtonAction,
    loading,
    progress,
    messages,
    beforActionButtonLable,
    completeTitle,
    completeButtonLable,
    completedMessage
}: PdfActionButtonProps) => {

    const alredyMergePdf = useAppSelector((state) => state.general.alredyMergePdf);

    return (
        <div className="flex sm:flex-row flex-col justify-center items-center gap-3 mt-28">
            {!loading && !alredyMergePdf && (
                <Button
                    onClick={handleButtonAction}
                    className="bg-[#4f3df7] hover:bg-[#4f3df7]/90 rounded-lg text-white"
                >
                    {beforActionButtonLable}
                </Button>
            )}

            {loading &&
                <LoadingDownload progress={progress} messages={messages} />
            }

            {alredyMergePdf && !loading && (
                <ProcessComplete
                    message={completedMessage}
                    title={completeTitle}
                    onDownload={handleButtonAction}
                    buttonLabel={completeButtonLable}
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
