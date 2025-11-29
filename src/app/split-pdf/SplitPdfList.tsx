"use client"

import { PdfActionButton } from "@/src/components/pdf/PdfActionButton";
import PdfPagePreview from "@/src/components/pdf/PdfPagePreview";
import { Button } from "@/src/components/ui/button";
import useSplitPdf, { RemoveOption } from "@/src/hooks/useSplitPdf";
import { useAppDispatch, useAppSelector } from "@/src/lib/hooks";
import { setAlredyMergePdf } from "@/src/lib/redux/generalSlice";
import { PdfMeta } from "@/src/types/pdf";
import { downloadPdf } from "@/src/utils/downloadFile";
import { FileIcon } from "lucide-react";
import { useState } from "react";

interface SplitPdfListProps {
    pdfs: PdfMeta[] | any;
    setPdfs: React.Dispatch<React.SetStateAction<PdfMeta[]>>;
}

const messages = [
    "Analyzing your PDF pages 🔍",
    "Cutting your document into perfect parts ✂️",
    "Sorting split files neatly 📑",
    // "Optimizing and preparing download ⚡",
    "Almost there… finishing touches 🚀",
];


const SplitPdfList = ({
    pdfs,
    setPdfs
}: SplitPdfListProps) => {
    const [removeOption, setRemoveOption] = useState<RemoveOption>("custom");
    const [customPages, setCustomPages] = useState("");
    const [progress, setProgress] = useState(0)
    const alredyMergePdf = useAppSelector((state) => state.general.alredyMergePdf);
    const dispatch = useAppDispatch();
    const totalPages = pdfs?.[0]?.pageCount


    const { splitPdf, loading } = useSplitPdf(pdfs?.[0], removeOption, customPages, setProgress)

    const handleSplit = async () => {
        if (alredyMergePdf?.length) {
            for (let i = 0; i < alredyMergePdf?.length; i++) {
                downloadPdf(alredyMergePdf?.[i], "Split");
            }
            setProgress(100);
            return;
        }
        const resulyBytes = await splitPdf()
        if (resulyBytes) {
            dispatch(setAlredyMergePdf(resulyBytes));
        }
    }

    const parseParts = (input: string, total: number): any => {
        const parts: any = [];
        input.split(",").forEach((raw: any) => {
            const part = raw.trim();

            if (!part) return;

            if (part.includes("-")) {
                let [a, b] = part.split("-").map(Number);
                if (isNaN(a) || isNaN(b) || (a > totalPages && b > totalPages)) return;

                // clamp within 1..total
                a = Math.max(1, Math.min(a, total));
                b = Math.max(1, Math.min(b, total));

                // normalize reversed ranges
                if (a > b) [a, b] = [b, a];

                parts.push({ start: a, end: b });
            } else {
                let num = Number(part);
                if (!isNaN(num)) {
                    num = Math.max(1, Math.min(num, total)); // clamp
                    parts.push({ start: num, end: num });
                }
            }
        });
        return parts;
    };

    const parts = parseParts(customPages, totalPages);

    return (
        <div className="mb-40">
            {!alredyMergePdf && (
                <>
                    <div className="my-6">
                        <label className="block mb-2 font-medium">Choose Split Option</label>
                        <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
                            <Button
                                variant="default"
                                onClick={() =>
                                    setRemoveOption("odd")
                                }
                                className={`rounded px-3 py-2 border text-sm font-medium ${removeOption === "odd" ? "bg-indigo-600 text-white" : "bg-white border-gray-300 text-black"}`}
                            >
                                Split Odd Pages
                            </Button>
                            <Button
                                variant="default"
                                onClick={() => setRemoveOption("even")}
                                className={`rounded px-3 py-2 border text-sm font-medium ${removeOption === "even" ? "bg-indigo-600 text-white" : "bg-white border-gray-300 text-black"}`}
                            >
                                Split Even Pages
                            </Button>
                            <div className="flex flex-col justify-start items-start gap-2">
                                <Button
                                    variant="default"
                                    onClick={() => setRemoveOption("custom")}
                                    className={`rounded px-3 py-2 border text-sm font-medium ${removeOption === "custom" ? "bg-indigo-600 text-white" : "bg-white border-gray-300 text-black"}`}
                                >
                                    Custom Range
                                </Button>
                                {removeOption === "custom" && (
                                    <input
                                        type="text"
                                        placeholder="e.g. 1-3,5,7-15"
                                        value={customPages}
                                        onChange={(e) => {
                                            const filtered = e.target.value.replace(/[^0-9,-]/g, "");
                                            setCustomPages(filtered);
                                        }}
                                        className="px-2 border rounded w-full h-10 text-sm"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {
                        removeOption === "custom" && customPages?.length > 0 &&
                        <div className="flex flex-wrap justify-center gap-6 p-4 border border-gray-300 rounded-lg">
                            {parts.map((part: any, index: any) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center bg-white shadow-sm hover:shadow-md p-6 border rounded-xl w-56 text-center transition"
                                >
                                    <span className="mb-2 font-semibold text-indigo-600 text-sm">
                                        Part {index + 1}
                                    </span>

                                    <div className="flex items-center gap-3 my-4">
                                        <div className="flex flex-col items-center">
                                            <FileIcon className="w-10 h-10 text-gray-400" />
                                            <span className="text-gray-600 text-xs">Page {part.start}</span>
                                        </div>
                                        {part.start !== part.end && (
                                            <>
                                                <span className="font-bold text-gray-500 text-lg">→</span>
                                                <div className="flex flex-col items-center">
                                                    <FileIcon className="w-10 h-10 text-gray-400" />
                                                    <span className="text-gray-600 text-xs">Page {part.end}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <p className="font-medium text-gray-700 text-sm">
                                        {part.start === part.end
                                            ? `Total Page 1`
                                            : `Total Pages ${part.end - part.start + 1}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    }

                    <PdfPagePreview
                        pdfPage={pdfs}
                    />
                </>
            )}

            <PdfActionButton
                setPdfs={setPdfs}
                setProgress={setProgress}
                handleButtonAction={handleSplit}
                loading={loading}
                progress={progress}
                messages={messages}
                beforActionButtonLable={"Split pdf"}
                completeTitle={alredyMergePdf?.length > 1 ?
                    `pdf split in ${alredyMergePdf?.length} part successfully` :
                    "pdf split sucessfully"
                }
                completeButtonLable={"Download splitted pdf"}
                completedMessage={"Split Complete"}
            />
        </div >
    )
}


export default SplitPdfList
