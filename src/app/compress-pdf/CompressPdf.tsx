"use client"

import DragAndDropInput from "@/src/components/DragAndDropInput";
import { ProcessPdf } from "@/src/components/ProcessPdf";
import useFileHandler from "@/src/hooks/useFileHandler";
import PdfPageHeader from "@/src/layout/PdfPageHeader";
import { PdfMeta, ProgressUpdate } from "@/src/types/pdf";
import React, { useEffect, useState } from "react";
import { CompressPdfList } from "./CompressPdfList";

export const CompressPdf = () => {
    const [pdfs, setPdfs] = useState<PdfMeta[]>([]);
    const [progress, setProgress] = useState<ProgressUpdate | null>(null);
    const [alredyMergePdf, setAlredyMergePdf] = useState<Blob | null>(null);

    // reset progress when pdf list becomes empty
    useEffect(() => {
        if (!pdfs.length) {
            setProgress(null);
        }
    }, [pdfs]);

    const handleFiles = useFileHandler(
        (files: PdfMeta[]) => {
            setPdfs((prev) => [...prev, ...files]);
        },
        (update: ProgressUpdate | null) => setProgress(update)
    );

    return (
        <>
            {pdfs.length === 0 ? (
                <>
                    {progress ? (
                        <div className="mt-48">
                            <ProcessPdf progress={{ ...progress, percent: 50 }} />
                        </div>
                    ) : (
                        <>
                            <PdfPageHeader
                                title="Compress PDF"
                                description="Upload a single PDF file to reduce its size."
                            />
                            <DragAndDropInput
                                handleFileChange={handleFiles}
                                multiFile={false}
                            />
                        </>
                    )}
                </>
            ) : (
                <CompressPdfList
                    pdfs={pdfs}
                    setPdfs={setPdfs}
                />
            )}
        </>
    );
};
