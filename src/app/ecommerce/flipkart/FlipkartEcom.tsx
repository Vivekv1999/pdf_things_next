"use client";

import DragAndDropInput from "@/src/components/DragAndDropInput";
import { ProcessPdf } from "@/src/components/ProcessPdf";
import useFileHandler from "@/src/hooks/useFileHandler";
import PdfPageHeader from "@/src/layout/PdfPageHeader";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setAlredyMergePdf } from "@/src/lib/redux/generalSlice";
import { PdfMeta, ProgressUpdate } from "@/src/types/pdf";
import React, { useEffect, useState } from "react";
import FlipkartEcomList from "./FlipkartEcomList";
import FlipkartProblemSolution from "./FlipkartProblemSolution";
import FlipkartKeyFeatures from "./FlipkartKeyFeatures";
import FlipkartStats from "./FlipkartStats";
import FlipkartWorkflowSteps from "./FlipkartWorkflowSteps";

const FlipkartEcom = () => {
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
                            <>
                                <div className="h-screen">
                                    <PdfPageHeader
                                        title="Flipkart Seller Tools"
                                        description="Upload Flipkart labels from all your accounts. We'll auto-crop to perfect size, sort by SKU, and merge everything — all in one click!"
                                    />

                                    <DragAndDropInput
                                        handleFileChange={handleFiles}
                                    />
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <FlipkartEcomList
                        pdfs={pdfs}
                        setPdfs={setPdfs}
                    />
                )
            }

            {/* Showcase sections - always visible */}
            <div className="mt-36">
                <FlipkartProblemSolution />
                <FlipkartKeyFeatures />
                <FlipkartStats />
                <FlipkartWorkflowSteps />
            </div>
        </>
    );
};

export default FlipkartEcom

