"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

interface WarningToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    duration?: number; // in milliseconds
}

export const WarningToast = ({
    message,
    isVisible,
    onClose,
    duration = 5000,
}: WarningToastProps) => {
    const [progress, setProgress] = useState(100);
    const isPausedRef = useRef(false);
    const remainingTimeRef = useRef(duration);
    const lastUpdateRef = useRef(Date.now());
    const animationFrameRef = useRef<number>(0);

    const handleMouseEnter = useCallback(() => {
        isPausedRef.current = true;
    }, []);

    const handleMouseLeave = useCallback(() => {
        isPausedRef.current = false;
        lastUpdateRef.current = Date.now();
    }, []);

    useEffect(() => {
        if (!isVisible) {
            setProgress(100);
            remainingTimeRef.current = duration;
            lastUpdateRef.current = Date.now();
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            return;
        }

        lastUpdateRef.current = Date.now();
        remainingTimeRef.current = duration;

        const animate = () => {
            const now = Date.now();

            if (!isPausedRef.current) {
                const delta = now - lastUpdateRef.current;
                remainingTimeRef.current = Math.max(0, remainingTimeRef.current - delta);

                const newProgress = (remainingTimeRef.current / duration) * 100;
                setProgress(newProgress);

                if (remainingTimeRef.current <= 0) {
                    onClose();
                    return;
                }
            }

            lastUpdateRef.current = now;
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isVisible, duration, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="fixed bottom-6 right-6 z-[200] min-w-[380px] max-w-md"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-amber-200 dark:border-amber-800 overflow-hidden">
                        {/* Progress bar */}
                        <div className="h-1 bg-amber-100 dark:bg-amber-900/30">
                            <motion.div
                                className="h-full bg-amber-500"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        {/* Content */}
                        <div className="flex items-start gap-4 p-4">
                            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 flex-shrink-0">
                                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                    Performance Warning
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {message}
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
