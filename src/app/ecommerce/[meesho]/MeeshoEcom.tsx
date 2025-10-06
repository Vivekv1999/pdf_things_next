"use client";

import DragAndDropInput from "@/src/components/DragAndDropInput";
import { ProcessPdf } from "@/src/components/ProcessPdf";
import useFileHandler from "@/src/hooks/useFileHandler";
import PdfPageHeader from "@/src/layout/PdfPageHeader";
import { PdfMeta, ProgressUpdate } from "@/src/types/pdf";
import { useEffect, useState } from "react";
import MeeshoEcomList from "./MeeshoEcomList";

const MeeshoEcom = () => {

    const [pdfs, setPdfs] = useState<PdfMeta[]>([]);
    const [progress, setProgress] = useState<ProgressUpdate | null>(null);


    useEffect(() => {
        if (!pdfs.length) {
            setProgress(null);
        }
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
                                    description="Merge and sort your Meesho invoices by SKU or product labels, and generate account labels instantly — all free and online."
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
                )}

        </>
    )
}

export default MeeshoEcom
