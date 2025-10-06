import useMergePdfs from '@/src/hooks/useMergePdfs';
import useSort from '@/src/hooks/useSortPdf';
import { PdfMeta } from '@/src/types/pdf';
import React from 'react';
import SplitActionButton from '../../split-pdf/SplitActionButton';


interface MeeshoPdfListProps {
    pdfs: PdfMeta[];
    setPdfs: React.Dispatch<React.SetStateAction<PdfMeta[]>>;
}

const MeeshoEcomList = ({
    pdfs,
    setPdfs
}: MeeshoPdfListProps) => {

    const { mergePdfs, result, loading, progress, setLoading } = useMergePdfs();
    console.log(result, "result----111");
    const { reorderPdf } = useSort(pdfs?.[0]?.bytes);


    const meregeAndSortBySKU = async () => {
        // 1️⃣ Merge all PDFs first
        const mergeResult = await mergePdfs(pdfs);
        if (!mergeResult) return;

        // 2️⃣ Convert merged blob to ArrayBuffer for sorting
        const mergedArrayBuffer = await mergeResult.blob.arrayBuffer();
        console.log(mergedArrayBuffer, "mergedArrayBuffer");


        // 3️⃣ Create a sorter for the merged PDF
        // const { reorderPdf } = useSort(mergedArrayBuffer);

        // 4️⃣ Run the sorting
        const sortedBytes = await reorderPdf();
        if (!sortedBytes) return;

        // 5️⃣ Download the final sorted PDF
        const blob = new Blob([sortedBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "merged-sorted.pdf";
        a.click();

        URL.revokeObjectURL(url);
    };


    return (
        <>
            <SplitActionButton
                splitPdf={meregeAndSortBySKU}
                setPdfs={setPdfs}
            />
        </>
    )
}

export default MeeshoEcomList
