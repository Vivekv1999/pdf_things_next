"use client"

import PdfPagePreview from "@/src/components/pdf/PdfPagePreview";
import { Button } from "@/src/components/ui/button";
import { PdfMeta } from "@/src/types/pdf";
import { FileIcon } from "lucide-react";
import { useState } from "react";
import SplitActionButton from "./SplitActionButton";

interface SplitPdfListProps {
    pdfs: PdfMeta[];
    setPdfs: React.Dispatch<React.SetStateAction<PdfMeta[]>>;
}

const SplitPdfList = ({
    pdfs,
    setPdfs
}: SplitPdfListProps) => {
    const [removedPages, setRemovedPages] = useState({});
    const [removeOption, setRemoveOption] = useState("all");
    const [customPages, setCustomPages] = useState("");

    const totalPages = pdfs?.[0]?.pageCount

    const handleRemove = (id: string) => {
        setPdfs((prev) => prev.filter((pdf) => pdf.id !== id));
    }


    const parseParts = (input: string, total: number): Part[] => {
        const parts: Part[] = [];
        input.split(",").forEach((raw) => {
            let part = raw.trim();
            console.log(part, "part");

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
            <div className="my-6">
                <label className="block mb-2 font-medium">Page Removal Method</label>
                <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
                    <Button
                        variant="default"
                        onClick={() => setRemoveOption("all")}
                        className={`rounded px-3 py-2 border text-sm font-medium ${removeOption === "all" ? "bg-indigo-600 text-white" : "bg-white border-gray-300 text-black"}`}
                    >
                        Manually
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => setRemoveOption("odd")}
                        className={`rounded px-3 py-2 border text-sm font-medium ${removeOption === "odd" ? "bg-indigo-600 text-white" : "bg-white border-gray-300 text-black"}`}
                    >
                        Remove Odd Pages
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => setRemoveOption("even")}
                        className={`rounded px-3 py-2 border text-sm font-medium ${removeOption === "even" ? "bg-indigo-600 text-white" : "bg-white border-gray-300 text-black"}`}
                    >
                        Remove Even Pages
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="default"
                            onClick={() => setRemoveOption("custom")}
                            className={`rounded px-3 py-2 border text-sm font-medium ${removeOption === "custom" ? "bg-indigo-600 text-white" : "bg-white border-gray-300 text-black"}`}
                        >
                            Custom
                        </Button>
                        {removeOption === "custom" && (
                            <input
                                type="text"
                                placeholder="e.g. 1-3,5,7-15"
                                value={customPages}
                                onChange={(e) => setCustomPages(e.target.value)}
                                className="px-2 border rounded h-full text-sm"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {parts.map((part, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center bg-white shadow-sm hover:shadow-md p-4 border rounded-xl text-center transition"
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

            <PdfPagePreview
                pagePreviews={pdfs?.[0]?.previews}
                handleRemove={handleRemove}
            />

            <SplitActionButton />
        </div>

    )
}


export default SplitPdfList
