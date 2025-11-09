import { PdfActionButton } from "@/src/components/pdf/PdfActionButton";
import PdfPagePreview from "@/src/components/pdf/PdfPagePreview";
import useCropPdf from "@/src/hooks/useCropPdf";
import useMergePdfs from "@/src/hooks/useMergePdfs";
import useSort from "@/src/hooks/useSortPdf";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setAlredyMergePdf } from "@/src/lib/redux/generalSlice";
import { PdfMeta } from "@/src/types/pdf";
import { downloadPdf } from "@/src/utils/downloadFile";
import { randomIntBetween } from "@/src/utils/randomNumberBetween";
import { useState } from "react";

interface FlipkartEcomListProps {
    pdfs: PdfMeta[] | any;
    setPdfs: React.Dispatch<React.SetStateAction<PdfMeta[]>>;
}

const messages: string[] = [
    "Merging all Flipkart labels into one file...📄",
    "Cropping labels to the correct size...✂️",
    "Sorting your labels by SKU...✅",
    "Preparing your final PDF for download...⏳",
];


const FlipkartEcomList = ({
    pdfs,
    setPdfs
}: FlipkartEcomListProps) => {
    const alredyMergePdf = useAppSelector((state) => state.general.alredyMergePdf);
    const [progress, setProgress] = useState(0)
    const { mergePdfs, loading, setLoading, progress: mergingProgress } = useMergePdfs();
    const { reorderPdf, progress: sortingProgress } = useSort("FLIPKART");
    const dispatch = useAppDispatch();

    const { cropPdf } = useCropPdf();

    const mergeCropAndSortBySKU = async () => {
        try {
            setLoading(true);
            setProgress(0);

            const start = performance.now();

            if (alredyMergePdf) {
                downloadPdf(alredyMergePdf, "Flipkart label");
                setProgress(100);
                setLoading(false);
                return;
            }

            // --- STEP 1: Merge PDFs (0–40%)
            setProgress(5);
            const mergeInterval = setInterval(() => {
                setProgress(prev => Math.min(40, prev + 1));
            }, 200);

            const mergedResult = await mergePdfs(pdfs);
            clearInterval(mergeInterval);

            if (!mergedResult) throw new Error("Merging failed");
            setProgress(randomIntBetween(40, 45));

            const mergedArrayBuffer = await mergedResult.blob.arrayBuffer();
            const pdfBytes = new Uint8Array(mergedArrayBuffer.slice(0));

            // --- STEP 2: Crop merged PDF (45–70%)
            const croppedBytes = await cropPdf(
                new Uint8Array(pdfBytes),
                {
                    "x": 182,
                    "y": 20,
                    "width": 230,
                    "height": 364
                },
                {
                    "width": 595,
                    "height": 842
                },
                (percent) => {
                    // smoothly update crop progress (45–70%)
                    setProgress(Math.floor(45 + (percent / 100) * 25));
                }
            ) as any;

            if (!croppedBytes) throw new Error("Cropping failed");
            setProgress(randomIntBetween(70, 75));

            // --- STEP 3: Sort by SKU (75–95%)
            const sortedBytes = await reorderPdf(croppedBytes, (p) => {
                setProgress(Math.floor(75 + (p / 100) * 20));
            }) as Uint8Array<ArrayBuffer>;

            if (!sortedBytes) throw new Error("Sorting failed");

            dispatch(setAlredyMergePdf(sortedBytes));

            // --- STEP 4: Download + Finish
            setProgress(100);
            downloadPdf(sortedBytes, "Flipkart_SKU_Sorted");

            const end = performance.now();
            console.log(`✅ Merge + Crop + Sort completed in ${(end - start).toFixed(2)} ms`);

        } catch (err) {
            console.error("❌ Error during merge/crop/sort:", err);
            setLoading(false);
            setProgress(0);
        } finally {
            setLoading(false);
        }
    }

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
                handleButtonAction={mergeCropAndSortBySKU}
                loading={loading}
                progress={progress}
                messages={messages}
                beforActionButtonLable={
                    pdfs.length > 1
                        ? "Crop & Sort by SKU Label"
                        : "Crop and Sort by SKU & Download"
                }
                completedMessage="Flipkart labels cropped and sorted successfully"
                completeTitle={`${pdfs.length} file${pdfs.length > 1 ? 's' : ''} cropped and sorted by SKU successfully`}
                completeButtonLable="Download Flipkart Label PDF"
            />

        </>
    )
}

export default FlipkartEcomList
