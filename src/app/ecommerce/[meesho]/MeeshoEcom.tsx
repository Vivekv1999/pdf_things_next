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
                                <PdfPageHeader
                                    title="Meesho Seller Tools"
                                    description="Merge and sort all your Meesho invoices by SKU and generate account labels instantly — all free and online."
                                />

                                <DragAndDropInput
                                    handleFileChange={handleFiles}
                                />
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
            {/* <MeeshoEcomWorkflowSteps /> */}
        </>
    )
}

export default MeeshoEcom
