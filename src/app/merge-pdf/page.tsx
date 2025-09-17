// app/merge/page.tsx (Next.js App Router)
"use client";

import DragAndDropInput from "@/src/components/DragAndDropInput";
import useFileHandler, { ProgressUpdate } from "@/src/hooks/useFileHandler";
import PdfPageHeader from "@/src/layout/PdfPageHeader";
import { useEffect, useState } from "react";
import { MergeActionButton } from "./MergeActionButton";
import { MergePdfList } from "./MergePdfList";
import ProcessMergePdf from "./ProcessMergePdf";

export interface PdfMeta {
    id: string;
    file: File;
    pageCount: number;
    bytes: ArrayBuffer;
    previews: (string | null)[];
}

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
        (update: ProgressUpdate | null) => setProgress(update)
    );

    return (
        <div className="mx-auto p-6 max-w-7xl">
            {pdfs.length === 0 ? (
                <>
                    {progress ? (
                        <div className="mt-48">
                            <ProcessMergePdf progress={progress} />
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
        </div>
    );
};

export default MergePdf;
