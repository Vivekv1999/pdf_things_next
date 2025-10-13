import useMergePdfs from '@/src/hooks/useMergePdfs';
import useSort from '@/src/hooks/useSortPdf';
import { PdfMeta } from '@/src/types/pdf';
import React, { useState } from 'react';
import SplitActionButton from '../../split-pdf/SplitActionButton';
import { downloadPdf } from '@/src/utils/downloadFile';
import LoadingDownload from '@/src/components/LoadingDownload';
import { randomIntBetween } from '@/src/utils/randomNumberBetween';
import { MeeshoSortLabelActionButton } from './MeeshoSortLabelActionButton';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import { setAlredyMergePdf } from '@/src/lib/redux/generalSlice';
import PdfPagePreview from '@/src/components/pdf/PdfPagePreview';
import MeeshoEcomWorkflowSteps from './MeeshoEcomWorkflowSteps';


interface MeeshoPdfListProps {
    pdfs: PdfMeta[] | any;
    setPdfs: React.Dispatch<React.SetStateAction<PdfMeta[]>>;
}

const messages: string[] = [
    "Gathering all labels for sorting...📄",
    "Checking for unwanted pages to remove...🔎",
    "Your label is sorted by SKU ✅",
    "Preparing your file for download... ⏳",
];

const MeeshoEcomList = ({
    pdfs,
    setPdfs
}: MeeshoPdfListProps) => {
    const alredyMergePdf = useAppSelector((state) => state.general.alredyMergePdf);
    const [progress, setProgress] = useState(0)
    const { mergePdfs, result, loading, setLoading } = useMergePdfs();
    const { reorderPdf } = useSort();
    const dispatch = useAppDispatch();


    const meregeAndSortBySKU = async () => {
        const start = performance.now();

        if (alredyMergePdf) {
            downloadPdf(alredyMergePdf, "Meesho sku sorted")
        } else {
            setProgress(randomIntBetween(10, 15))
            const mergeResult = await mergePdfs(pdfs);
            if (!mergeResult) return;

            setProgress(randomIntBetween(45, 55))
            const mergedArrayBuffer = await mergeResult.blob.arrayBuffer();

            setProgress(randomIntBetween(58, 81))
            const sortedBytes = await reorderPdf(mergedArrayBuffer) as Uint8Array<ArrayBuffer>
            if (!sortedBytes) return;
            dispatch(setAlredyMergePdf(sortedBytes))


            setProgress(randomIntBetween(92, 99))
            downloadPdf(sortedBytes, "Meesho sku sorted")
            setLoading(false)
        }
        const end = performance.now();
        console.log(`SORTING took ${(end - start).toFixed(2)} ms`);
    };

    return (
        <>

            {!alredyMergePdf &&
                <PdfPagePreview
                    pdfPage={pdfs}
                />
            }

            <MeeshoSortLabelActionButton
                pdfs={pdfs}
                setPdfs={setPdfs}
                setProgress={setProgress}
                handleButtonAction={meregeAndSortBySKU}
                loading={loading}
                progress={progress}
                messages={messages}
            />
        </>
    )
}

export default MeeshoEcomList
