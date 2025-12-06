"use client";

import DragAndDropInput from "@/src/components/DragAndDropInput";
import { ProcessPdf } from "@/src/components/ProcessPdf";
import useFileHandler from "@/src/hooks/useFileHandler";
import PdfPageHeader from "@/src/layout/PdfPageHeader";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setAlredyMergePdf } from "@/src/lib/redux/generalSlice";
import { PdfMeta, ProgressUpdate } from "@/src/types/pdf";
import { useEffect, useState } from "react";
import MeeshoEcomList from "./MeeshoEcomList";
import MeeshoProblemSolution from "./MeeshoProblemSolution";
import MeeshoKeyFeatures from "./MeeshoKeyFeatures";
import MeeshoStats from "./MeeshoStats";
import MeeshoEcomWorkflowSteps from "./MeeshoEcomWorkflowSteps";

const MeeshoEcom = () => {
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
                                        title="Meesho Seller Tools"
                                        description="Upload labels from all your Meesho accounts. We'll automatically sort by SKU and merge them into one organized PDF — saving you hours of manual work."
                                    />

                                    <DragAndDropInput
                                        handleFileChange={handleFiles}
                                    />
                                </div>

                            </>
                        )}
                    </>
                ) : (
                    <MeeshoEcomList
                        pdfs={pdfs}
                        setPdfs={setPdfs}
                    />
                )
            }

            {/* Showcase sections - always visible */}
            <div className="mt-36">
                <MeeshoProblemSolution />
                <MeeshoKeyFeatures />
                <MeeshoStats />
                <MeeshoEcomWorkflowSteps />
            </div>
        </>
    )
}

export default MeeshoEcom

