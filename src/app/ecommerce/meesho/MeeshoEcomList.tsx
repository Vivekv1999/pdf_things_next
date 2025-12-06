import { PdfActionButton } from '@/src/components/pdf/PdfActionButton';
import PdfPagePreview from '@/src/components/pdf/PdfPagePreview';
import useMergePdfs from '@/src/hooks/useMergePdfs';
import useSort from '@/src/hooks/useSortPdf';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import { setAlredyMergePdf } from '@/src/lib/redux/generalSlice';
import { PdfMeta } from '@/src/types/pdf';
import { downloadPdf } from '@/src/utils/downloadFile';
import { randomIntBetween } from '@/src/utils/randomNumberBetween';
import React, { useState } from 'react';


interface MeeshoPdfListProps {
    pdfs: PdfMeta[] | any;
    setPdfs: React.Dispatch<React.SetStateAction<PdfMeta[]>>;
}

const messages: string[] = [
    "Gathering all labels for sorting...📄",
    "Checking for unwanted pages to remove...🔎",
    "Your label is being sorted by SKU ✅",
    "Preparing your file for download... ⏳",
];

const MeeshoEcomList = ({
    pdfs,
    setPdfs
}: MeeshoPdfListProps) => {
    const alredyMergePdf = useAppSelector((state) => state.general.alredyMergePdf);
    const [progress, setProgress] = useState(0)
    const { mergePdfs, loading, setLoading, progress: mergingProgress } = useMergePdfs();
    const { reorderPdf } = useSort("MEESHO");
    const dispatch = useAppDispatch();


    const mergeAndSortBySKU = async () => {
        try {
            setLoading(true);
            setProgress(0);

            const start = performance.now();

            if (alredyMergePdf) {
                downloadPdf(alredyMergePdf, "Meesho sku sorted");
                setProgress(100);
                setLoading(false);
                return;
            }

            // --- STEP 1: Merging PDFs (0–50%)
            setProgress(5);

            const mergeInterval = setInterval(() => {
                // merge progress smoothly between 5–50%
                setProgress(prev => {
                    const mergePercent = Math.min(50, (mergingProgress || prev + 1));
                    return mergePercent;
                });
            }, 200);

            const mergeResult = await mergePdfs(pdfs);
            clearInterval(mergeInterval);
            if (!mergeResult) {
                setLoading(false);
                setProgress(0);
                return;
            }

            // setProgress(55);
            setProgress(randomIntBetween(50, 55))

            const mergedArrayBuffer = await mergeResult.blob.arrayBuffer();

            const sortedBytes = await reorderPdf(mergedArrayBuffer, (p) => {
                setProgress(Math.floor(55 + (p / 100) * 45));
            }) as Uint8Array<ArrayBuffer>;

            if (!sortedBytes) {
                setLoading(false);
                setProgress(0);
                return;
            }

            dispatch(setAlredyMergePdf(sortedBytes));

            // --- STEP 3: Download + Finalize
            setProgress(100);
            downloadPdf(sortedBytes, "Meesho sku sorted");
            setLoading(false);

            const end = performance.now();
            console.log(`Merge + Sort took ${(end - start).toFixed(2)} ms`);
        } catch (err) {
            console.error("Error during merge/sort:", err);
            setLoading(false);
            setProgress(0);
        }
    };


    return (
        <>

            {!alredyMergePdf &&
                <PdfPagePreview
                    pdfPage={pdfs}
                />
            }

            <PdfActionButton
                setPdfs={setPdfs}
                setProgress={setProgress}
                handleButtonAction={mergeAndSortBySKU}
                loading={loading}
                progress={progress}
                messages={messages}
                beforActionButtonLable={
                    pdfs.length > 1 ?
                        "Merge & Sort by SKU label" :
                        "Sort By SKU & Download"
                }
                completedMessage="Meesho lable sorting Complete"
                completeTitle={`${pdfs.length} files sorted by SKU successfully`}
                completeButtonLable="Download Sorted PDF"
            />
        </>
    )
}

export default MeeshoEcomList
