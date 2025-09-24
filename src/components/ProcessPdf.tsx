import React from "react";
import { ProgressUpdate } from "../types/pdf";
import { FileProgress } from "./FileProgress";

interface ProcessMergePdfProps {
    progress: ProgressUpdate | null;
}
export const ProcessPdf = ({ progress }: ProcessMergePdfProps) => {
    if (!progress) return null;

    return (
        <>
            <div className="mb-10 font-medium text-indigo-600 text-sm md:text-2xl text-center">
                Processing {progress.completed + 1} of {progress.totalFiles}
            </div>
            <FileProgress progress={progress} />
        </>
    );
};
