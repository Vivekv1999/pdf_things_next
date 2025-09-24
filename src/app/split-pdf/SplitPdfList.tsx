"use client"

import { PdfPreview } from "@/src/components/pdf/PdfPreview";
import { PdfMeta } from "@/src/types/pdf";

interface SplitPdfListProps {
    pdfs: PdfMeta[];
    setPdfs: React.Dispatch<React.SetStateAction<PdfMeta[]>>;
}

const SplitPdfList = ({
    pdfs,
    setPdfs
}: SplitPdfListProps) => {

    const handleRemove = (id: string) => {
        setPdfs((prev) => prev.filter((pdf) => pdf.id !== id));
    }

    return (
        <PdfPreview
            pdfs={pdfs}
            showAllPages={true}
            handleRemove={handleRemove}
        />
    )
}


export default SplitPdfList
