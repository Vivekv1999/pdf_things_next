import { PdfActionButton } from '@/src/components/pdf/PdfActionButton';
import PdfPagePreview from '@/src/components/PdfPagePreview';
import useMergePdfs from '@/src/hooks/useMergePdfs';
import useSort, { SKUReplacementRule } from '@/src/hooks/useSortPdf';
import { useAppDispatch, useAppSelector } from '@/src/lib/hooks';
import { setAlredyMergePdf } from '@/src/lib/redux/generalSlice';
import { PdfMeta } from '@/src/types/pdf';
import { downloadPdf } from '@/src/utils/downloadFile';
import { randomIntBetween } from '@/src/utils/randomNumberBetween';
import React, { useState, useEffect } from 'react';
import SKURuleManager from '@/src/components/SKURuleManager';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';


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
    const [replacementRules, setReplacementRules] = useState<SKUReplacementRule[]>([]);
    const [showRulesPanel, setShowRulesPanel] = useState(false);
    const { mergePdfs, loading, setLoading, progress: mergingProgress } = useMergePdfs();
    const { reorderPdf } = useSort("MEESHO", {
        enableNormalization: replacementRules.length > 0,
        replacementRules,
    });
    const dispatch = useAppDispatch();

    // Auto-load SKU rules from localStorage on mount
    useEffect(() => {
        const loadRulesFromStorage = () => {
            try {
                const saved = localStorage.getItem('meesho-sku-replacement-rules');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setReplacementRules(parsed);
                        console.log(`✅ Loaded ${parsed.length} SKU rule(s) from localStorage`);
                    }
                }
            } catch (error) {
                console.error('Failed to load SKU rules from localStorage:', error);
            }
        };

        loadRulesFromStorage();
    }, []); // Run once on mount

    // Auto-save rules to localStorage whenever they change
    useEffect(() => {
        if (replacementRules.length > 0) {
            try {
                localStorage.setItem('meesho-sku-replacement-rules', JSON.stringify(replacementRules));
                console.log(`💾 Auto-saved ${replacementRules.length} SKU rule(s) to localStorage`);
            } catch (error) {
                console.error('Failed to save SKU rules to localStorage:', error);
            }
        }
    }, [replacementRules]); // Run whenever rules change


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
            {/* SKU Customization Panel */}
            <div className="max-w-6xl mx-auto px-4 mb-6">
                <button
                    onClick={() => setShowRulesPanel(!showRulesPanel)}
                    className="w-full bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-indigo-200 rounded-lg p-4 hover:border-indigo-400 transition-all flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-100 p-2 rounded-lg group-hover:bg-indigo-200 transition">
                            <Settings className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-gray-900 text-lg">
                                SKU Normalization Settings
                                {replacementRules.length > 0 && (
                                    <span className="ml-2 text-sm font-normal text-indigo-600">
                                        ({replacementRules.length} rule{replacementRules.length !== 1 ? 's' : ''} active)
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {replacementRules.length === 0
                                    ? "Click to add SKU replacement rules for multi-account sorting"
                                    : "Click to edit your SKU replacement rules"
                                }
                            </p>
                        </div>
                    </div>
                    <div className="bg-white p-2 rounded-lg group-hover:bg-indigo-50 transition">
                        {showRulesPanel ? (
                            <ChevronUp className="w-5 h-5 text-indigo-600" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-indigo-600" />
                        )}
                    </div>
                </button>

                {showRulesPanel && (
                    <div className="mt-4 bg-white border border-gray-200 rounded-lg p-6 shadow-lg animate-in slide-in-from-top-2 duration-300">
                        <SKURuleManager
                            initialRules={replacementRules}
                            onRulesChange={(rules) => {
                                setReplacementRules(rules);
                            }}
                        />
                    </div>
                )}
            </div>

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
