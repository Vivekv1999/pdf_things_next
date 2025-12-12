"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";

interface SimpleToastProps {
    message: string;
    type?: "success" | "error";
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export const SimpleToast = ({
    message,
    type = "success",
    isVisible,
    onClose,
    duration = 3000,
}: SimpleToastProps) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="fixed bottom-6 right-6 z-[200] flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 min-w-[320px]"
                >
                    <div className={`p-2 rounded-full ${type === 'success' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                        {type === "success" ? (
                            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
                        ) : (
                            <XCircle className="w-6 h-6 text-red-600 dark:text-red-500" />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {type === 'success' ? 'Success' : 'Error'}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {message}
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
