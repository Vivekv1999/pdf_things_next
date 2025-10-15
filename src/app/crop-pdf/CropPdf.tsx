import DragAndDropInput from "@/src/components/DragAndDropInput";
import { ProcessPdf } from "@/src/components/ProcessPdf";
import PdfPageHeader from "@/src/layout/PdfPageHeader";
import { useAppDispatch } from "@/src/lib/hooks";
import pdfjsLib from "@/src/lib/pdfWorker";
import { resetGeneral } from "@/src/lib/redux/generalSlice";
import { ProgressUpdate } from "@/src/types/pdf";
import { useEffect, useState } from "react";
import CropPdfView from "./CropPdfView";

const ME1 = {
    height: 418,
    width: 595,
    x: 0,
    y: 0
}

const pdfProgress: ProgressUpdate = {
    fileName: "",
    completed: 0,
    totalFiles: 0,
    stage: "init",
    percent: 10
}

const CropPdf = () => {
    const [progress, setProgress] = useState<ProgressUpdate | null>(pdfProgress);
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    // const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!pdfDoc) {
            setProgress(pdfProgress);
        }
        dispatch(resetGeneral())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pdfDoc]);

    const handleFiles = async (e: any) => {
        const file = e.target.files[0];
        console.log(file, "0000000");
        setProgress((prev): any => ({ ...prev, fileName: file.name, stage: "processing", percent: 30 }))
        if (!file) return;

        try {
            const arrayBuffer = await file.arrayBuffer();
            setProgress((prev): any => ({ ...prev, fileName: file.name, stage: "processing", percent: 50 }))
            const pdfJsBuffer = arrayBuffer.slice(0);
            setProgress((prev): any => ({ ...prev, fileName: file.name, stage: "processing", percent: 90 }))
            const pdf = await pdfjsLib.getDocument(pdfJsBuffer).promise as any;
            setPdfDoc(pdf);
            setPdfFile(file);
            setTotalPages(pdf.numPages);
            setProgress((prev): any => ({ ...prev, fileName: file.name, stage: "processing", percent: 100 }))
        } catch (error) {
            console.error('Error loading PDF:', error);
            alert('Failed to load PDF. Please try another file.');
        }
    };

    console.log(progress, "pppppppp");


    return (
        <>
            {
                pdfDoc === null ? (
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
                        pdfFile={pdfFile}
                    />
                )}

        </>
    )
}

export default CropPdf
