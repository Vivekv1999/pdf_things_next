import DragAndDropInput from "@/src/components/DragAndDropInput";
import { ProcessPdf } from "@/src/components/ProcessPdf";
import PdfPageHeader from "@/src/layout/PdfPageHeader";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import pdfjsLib from "@/src/lib/pdfWorker";
import { setAlredyMergePdf } from "@/src/lib/redux/generalSlice";
import { PdfMeta, ProgressUpdate } from "@/src/types/pdf";
import { useEffect, useState } from "react";
import CropPdfView from "./CropPdfView";

// const ME1 = {
//     height: 418,
//     width: 595,
//     x: 0,
//     y: 0
// }

const pdfProgress: ProgressUpdate = {
    fileName: "",
    completed: 0,
    totalFiles: 1,
    stage: "init",
    percent: 10
}

const CropPdf = () => {
    const [progress, setProgress] = useState<ProgressUpdate | null>(pdfProgress);
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pdfs, setPdfs] = useState<PdfMeta[]>([]); //use foe only reset and view ing condition of cnavas onlcik rese apply same action accross all conpnoet sop add this
    const [totalPages, setTotalPages] = useState(0);
    const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);

    const dispatch = useAppDispatch();
    const alredyMergePdf = useAppSelector((state) => state.general.alredyMergePdf);

    useEffect(() => {
        if (!pdfs.length) {
            setProgress(pdfProgress);
        }
        // dispatch(resetGeneral())

        return () => {
            if (alredyMergePdf) {
                dispatch(setAlredyMergePdf(null))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pdfs]);

    const handleFiles = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;
        setPdfs((prev) => [...prev, e]);

        setProgress((prev): any => ({ ...prev, fileName: file.name, stage: "processing", percent: 30 }));

        try {
            // ✅ Read file as array buffer
            const arrayBuffer = await file.arrayBuffer();

            // ✅ Clone it safely (important)
            const pdfBytes = new Uint8Array(arrayBuffer.slice(0));

            setProgress((prev): any => ({ ...prev, percent: 50 }));

            // ✅ Use a separate copy for PDF.js
            const loadingTask = pdfjsLib.getDocument({ data: pdfBytes.slice(0) });
            const pdf = await loadingTask.promise as any;

            setProgress((prev): any => ({ ...prev, percent: 90 }));

            // ✅ Keep your own pdfBytes copy for pdf-lib cropping
            setPdfBytes(pdfBytes);
            setPdfDoc(pdf);
            setTotalPages(pdf.numPages);

            setProgress((prev): any => ({ ...prev, percent: 100 }));
        } catch (error) {
            console.error('Error loading PDF:', error);
            alert('Failed to load PDF. Please try another file.');
        }
    };


    console.log(progress, "pppppppp");


    return (
        <>
            {
                pdfs.length === 0 ? (
                    <>
                        {progress?.stage !== "init" ? (
                            <div className="mt-48">
                                <ProcessPdf progress={progress} />
                            </div>
                        ) : (
                            <>
                                <PdfPageHeader
                                    title="Crop PDF"
                                    description="Trim or remove unwanted areas from your PDF pages easily and quickly."
                                />

                                <DragAndDropInput
                                    multiFile={false}
                                    handleFileChange={handleFiles}
                                />
                            </>
                        )}
                    </>
                ) : (
                    <CropPdfView
                        pdfDoc={pdfDoc}
                        totalPages={totalPages}
                        pdfBytes={pdfBytes}
                        setPdfs={setPdfs}
                        pdfs={pdfs}
                    />
                )}

        </>
    )
}

export default CropPdf
