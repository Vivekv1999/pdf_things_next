"use client";

import useSplitPdf from "@/src/hooks/useSplitPdf";
import { useState } from "react";

export default function SplitPdf() {
    const [pdf, setPdf] = useState<File | null>(null);
    const [ranges, setRanges] = useState("");
    const { splitPdf, result, loading } = useSplitPdf();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPdf(e.target.files[0]);
        }
    };

    const handleSplit = async () => {
        if (pdf && ranges) {
            await splitPdf(pdf, ranges);
        }
    };

    return (
        <div className="mx-auto p-4 max-w-6xl">
            <h1 className="mb-6 font-bold text-2xl">Split PDF</h1>

            <div className="flex justify-center items-center bg-white px-4 border-2 border-gray-300 hover:border-indigo-500 border-dashed rounded-md w-full h-32 transition cursor-pointer">
                <label className="text-gray-600 cursor-pointer">
                    Click or drop a PDF here to select
                    <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                </label>
            </div>

            {pdf && (
                <div className="space-y-4 mt-6">
                    <input
                        type="text"
                        placeholder="Enter page ranges e.g. 1-3,5,7-8"
                        value={ranges}
                        onChange={(e) => setRanges(e.target.value)}
                        className="px-3 py-2 border rounded w-full text-sm"
                    />

                    <button
                        onClick={handleSplit}
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 py-3 rounded-xl w-full font-semibold text-white transition-colors"
                    >
                        {loading ? "Splitting..." : "Split PDF"}
                    </button>
                </div>
            )}

            {result && (
                <a
                    href={URL.createObjectURL(result)}
                    download="split.pdf"
                    className="block mt-4 font-semibold text-indigo-600 text-center underline"
                >
                    Download Split PDF
                </a>
            )}
        </div>
    );
}
