import React, { useState } from "react";
import { Upload, Download, Loader2 } from "lucide-react";
import useSort from "@/hooks/useSortPdf";
import { SKUReplacementRule } from "@/hooks/useSortPdf";
import SKURuleManager from "@/components/SKURuleManager";

/**
 * Meesho Label Sort Tool - Complete Integration Example
 * 
 * This shows how to integrate the enhanced multi-account SKU normalization
 * feature into your e-commerce workflow
 */
export default function MeeshoLabelSortExample() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfBuffer, setPdfBuffer] = useState<ArrayBuffer | null>(null);
    const [sortedPdfBytes, setSortedPdfBytes] = useState<Uint8Array | null>(null);

    // State for user-defined SKU replacement rules
    const [replacementRules, setReplacementRules] = useState<SKUReplacementRule[]>([]);

    // Initialize the hook with dynamic rules
    const { reorderPdf, sortedPages, isLoading, progress, error } = useSort("MEESHO", {
        enableNormalization: replacementRules.length > 0, // Only enable if rules are defined
        replacementRules,
    });

    // Handle PDF file upload
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setPdfFile(file);
            const buffer = await file.arrayBuffer();
            setPdfBuffer(buffer);
            setSortedPdfBytes(null); // Reset previous results
        } else {
            alert("Please upload a valid PDF file");
        }
    };

    // Process and sort the PDF
    const handleSortPDF = async () => {
        if (!pdfBuffer) {
            alert("Please upload a PDF first");
            return;
        }

        if (replacementRules.length === 0) {
            const proceed = confirm(
                "No SKU replacement rules defined. Continue without normalization?\n\n" +
                "Without rules, PDFs from different accounts won't be normalized together."
            );
            if (!proceed) return;
        }

        const sortedBytes = await reorderPdf(pdfBuffer, (p) => {
            console.log(`Progress: ${p}%`);
        });

        if (sortedBytes) {
            setSortedPdfBytes(sortedBytes);
        }
    };

    // Download sorted PDF
    const handleDownload = () => {
        if (!sortedPdfBytes) return;

        const blob = new Blob([sortedPdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `sorted-${pdfFile?.name || "labels.pdf"}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Meesho Label Sort - Multi-Account SKU Normalization
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Sort your Meesho labels by SKU across multiple seller accounts.
                        Define your own replacement rules to normalize SKUs from different accounts.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column: SKU Rule Manager */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <SKURuleManager
                            initialRules={replacementRules}
                            onRulesChange={(rules) => {
                                setReplacementRules(rules);
                                console.log("Updated rules:", rules);
                            }}
                        />

                        {/* Example Rules Guide */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                            <h4 className="font-semibold text-purple-900 mb-2">
                                📝 Example Setup (3 Accounts)
                            </h4>
                            <div className="text-sm text-purple-800 space-y-1">
                                <p>• <strong>Account 1:</strong> Replace &quot;seller1-&quot; with &quot;main-&quot;</p>
                                <p>• <strong>Account 2:</strong> Replace &quot;seller2-&quot; with &quot;main-&quot;</p>
                                <p>• <strong>Account 3:</strong> Replace &quot;alt-&quot; with &quot;main-&quot;</p>
                            </div>
                            <div className="mt-2 pt-2 border-t border-purple-300 text-xs text-purple-700">
                                Result: All SKUs normalize to &quot;main-*&quot; pattern and sort together!
                            </div>
                        </div>
                    </div>

                    {/* Right Column: PDF Upload & Processing */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Upload & Sort PDF
                        </h3>

                        {/* File Upload */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select PDF Label File
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="pdf-upload"
                                />
                                <label
                                    htmlFor="pdf-upload"
                                    className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition"
                                >
                                    <div className="text-center">
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">
                                            {pdfFile ? pdfFile.name : "Click to upload PDF"}
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Active Rules Display */}
                        {replacementRules.length > 0 && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm font-semibold text-green-900 mb-1">
                                    ✅ {replacementRules.length} Active Replacement Rule{replacementRules.length !== 1 ? 's' : ''}
                                </p>
                                <div className="text-xs text-green-700 space-y-1">
                                    {replacementRules.slice(0, 3).map((rule, i) => (
                                        <div key={i}>
                                            &quot;{rule.from}&quot; → &quot;{rule.to}&quot;
                                        </div>
                                    ))}
                                    {replacementRules.length > 3 && (
                                        <div className="italic">+ {replacementRules.length - 3} more...</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Sort Button */}
                        <button
                            onClick={handleSortPDF}
                            disabled={!pdfBuffer || isLoading}
                            className="w-full mb-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sorting... {Math.round(progress)}%
                                </>
                            ) : (
                                <>
                                    Sort PDF by SKU
                                </>
                            )}
                        </button>

                        {/* Progress Bar */}
                        {isLoading && (
                            <div className="mb-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Error Display */}
                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm font-semibold text-red-900">Error:</p>
                                <p className="text-sm text-red-700">{error.message}</p>
                            </div>
                        )}

                        {/* Success & Download */}
                        {sortedPdfBytes && !isLoading && (
                            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm font-semibold text-green-900 mb-3">
                                    ✅ PDF Sorted Successfully!
                                </p>
                                <p className="text-sm text-green-700 mb-3">
                                    {sortedPages.length} pages sorted by SKU
                                </p>
                                <button
                                    onClick={handleDownload}
                                    className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Sorted PDF
                                </button>
                            </div>
                        )}

                        {/* Sorted Pages Preview */}
                        {sortedPages.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                    Sorted Order Preview (First 10):
                                </h4>
                                <div className="max-h-48 overflow-y-auto bg-gray-50 rounded-lg p-3 text-xs font-mono space-y-1">
                                    {sortedPages.slice(0, 10).map((page, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <span className="text-gray-500 w-6">{idx + 1}.</span>
                                            <span className="text-indigo-600 truncate">{page.sku}</span>
                                        </div>
                                    ))}
                                    {sortedPages.length > 10 && (
                                        <div className="text-gray-500 italic">
                                            + {sortedPages.length - 10} more pages...
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                                1
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Define Rules</h3>
                            <p className="text-sm text-gray-600">
                                Add replacement rules to normalize SKUs from different accounts to your main account pattern
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                                2
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Upload PDF</h3>
                            <p className="text-sm text-gray-600">
                                Upload your Meesho label PDF containing orders from multiple accounts
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                                3
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Download Sorted</h3>
                            <p className="text-sm text-gray-600">
                                Get your sorted PDF with all SKUs normalized and organized alphabetically
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
