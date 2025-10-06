// app/merge/page.tsx (Next.js App Router)
"use client";

import DragAndDropInput from "@/src/components/DragAndDropInput";
import { ProcessPdf } from "@/src/components/ProcessPdf";
import useFileHandler from "@/src/hooks/useFileHandler";
import PdfPageHeader from "@/src/layout/PdfPageHeader";
import { PdfMeta, ProgressUpdate } from "@/src/types/pdf";
import { useEffect, useState } from "react";
import { MergeActionButton } from "./MergeActionButton";
import { MergePdfList } from "./MergePdfList";

const MergePdf = () => {
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
        (update: ProgressUpdate | null) => setProgress(update),
        { needPreview: true }
    );

    return (
        <>
            {pdfs.length === 0 ? (
                <>
                    {progress ? (
                        <div className="mt-48">
                            <ProcessPdf progress={progress} />
                        </div>
                    ) : (
                        <>
                            <PdfPageHeader
                                title="Merge PDFs"
                                description="Combine multiple PDFs into a single file."
                            />
                            <DragAndDropInput handleFileChange={handleFiles} />
                        </>
                    )}
                </>
            ) : (
                <>
                    {!alredyMergePdf && (
                        <MergePdfList
                            pdfs={pdfs}
                            setPdfs={setPdfs}
                            handleFiles={handleFiles}
                            progress={progress}
                        />
                    )}

                    <MergeActionButton
                        pdfs={pdfs}
                        setPdfs={setPdfs}
                        setProgress={setProgress}
                        alredyMergePdf={alredyMergePdf}
                        setAlredyMergePdf={setAlredyMergePdf}
                    />
                </>
            )}
        </>
    );
};

export default MergePdf;
