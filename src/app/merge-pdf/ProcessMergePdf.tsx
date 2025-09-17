// components/ProcessMergePdf.tsx
"use client";

import { FileProgress } from "@/src/components/FileProgress";
import { ProgressUpdate } from "@/src/hooks/useFileHandler";

interface ProcessMergePdfProps {
    progress: ProgressUpdate | null;
}

const ProcessMergePdf = ({ progress }: ProcessMergePdfProps) => {
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

export default ProcessMergePdf;
