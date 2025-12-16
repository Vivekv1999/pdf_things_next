"use client";

import DragAndDropInput from "@/src/components/DragAndDropInput";
import { ProcessPdf } from "@/src/components/ProcessPdf";
import useFileHandler from "@/src/hooks/useFileHandler";
import PdfPageHeader from "@/src/layout/PdfPageHeader";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setAlredyMergePdf } from "@/src/lib/redux/generalSlice";
import { PdfMeta, ProgressUpdate } from "@/src/types/pdf";
import { useEffect, useState } from "react";
import SplitPdfList from "./SplitPdfList";

const SplitPdf = () => {
    console.log("split pdf");

    const [pdfs, setPdfs] = useState<PdfMeta[]>([]);
    const [progress, setProgress] = useState<ProgressUpdate | null>(null);
    const dispatch = useAppDispatch();
    const alredyMergePdf = useAppSelector((state) => state.general.alredyMergePdf);

    useEffect(() => {
        if (!pdfs.length) {
            setProgress(null);
        }

        return () => {
            if (alredyMergePdf) {
                dispatch(setAlredyMergePdf(null))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pdfs]);

    const handleFiles = useFileHandler(
        (files: PdfMeta[]) => {
            setPdfs((prev) => [...prev, ...files]);
        },
        (update: ProgressUpdate | null) => setProgress(update),
    );

    return (
        <>
            {
                pdfs.length === 0 ? (
                    <>
                        {progress ? (
                            <div className="mt-48">
                                <ProcessPdf progress={progress} />
                            </div>
                        ) : (
                            <div className="h-screen">
                                <PdfPageHeader
                                    title="Split PDF"
                                    description="Extract single pages or separate your PDF into multiple files."
                                />
                                <DragAndDropInput
                                    multiFile={false}
                                    handleFileChange={handleFiles}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <SplitPdfList
                        pdfs={pdfs}
                        setPdfs={setPdfs}
                    />
                )}
        </>
    );
}
export default SplitPdf;