"use client";

import { CheckCircle } from "lucide-react";

interface ProcessCompleteProps {
    title: string;              // e.g. "Merge Complete"
    message: string;            // e.g. "3 files merged successfully"
    buttonLabel: string;        // e.g. "Download Merged PDF"
    onDownload: () => void;     // callback for action
}

const ProcessComplete = ({
    title,
    message,
    buttonLabel,
    onDownload,
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
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-2xl w-full font-semibold text-white text-lg transition-colors cursor-pointer"
            >
                {buttonLabel}
            </button>
        </div>
    );
};

export default ProcessComplete;
