import { AnimatePresence, motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingDownloadProps {
    progress?: number;
    messages: string[];
}

const LoadingDownload = ({ progress = 0, messages }: LoadingDownloadProps) => {
    const [index, setIndex] = useState(0);

    // Cycle messages based on progress
    useEffect(() => {
        if (progress > 75) setIndex(3);
        else if (progress > 50) setIndex(2);
        else if (progress > 25) setIndex(1);
        else setIndex(0);
    }, [progress]);

    return (
        <div className="flex flex-col justify-center items-center space-y-6 h-64">
            {/* Spinning loader */}
            <Motion.div
                className="border-4 border-indigo-600 border-t-transparent rounded-full w-16 h-16"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />

            {/* Progress bar */}
            <div className="bg-gray-200 rounded-full w-64 h-2 overflow-hidden">
                <Motion.div
                    className="bg-indigo-600 h-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut", duration: 0.3 }}
                />
            </div>

            {/* Progress text + fun message */}
            <AnimatePresence mode="wait">
                <Motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="font-medium text-gray-700 text-lg text-center"
                >
                    {messages[index] ?? "Processing..."} ({progress}%)
                </Motion.p>
            </AnimatePresence>
        </div>
    );
};

export default LoadingDownload;
