"use client";

import { CheckCircle, Loader2 } from "lucide-react";

interface ProcessCompleteProps {
    title: string;
    message: string;
    buttonLabel: string;
    onDownload: () => void;
    loading?: boolean;
}

const ProcessComplete = ({
    title,
    message,
    buttonLabel,
    onDownload,
    loading = false,
}: ProcessCompleteProps) => {
    return (
        <div className="p-6 rounded-2xl w-full max-w-md text-center">
            <CheckCircle className="mx-auto mb-3 w-12 h-12 text-green-600" />
            <h3 className="mb-2 font-semibold text-gray-800 text-xl">
                {title}
            </h3>
            <p className="mb-4 text-gray-500">{message}</p>
            <button
                onClick={onDownload}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 px-8 py-3 rounded-2xl w-full font-semibold text-white text-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? "Downloading..." : buttonLabel}
            </button>
        </div>
    );
};

export default ProcessComplete;
