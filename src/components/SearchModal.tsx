"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { allTools } from "../data/allTools";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    const filteredTools = allTools.filter(
        (tool) =>
            tool.name.toLowerCase().includes(query.toLowerCase()) ||
            tool.description.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filteredTools.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % filteredTools.length);
            } else if (e.key === "Enter" && filteredTools.length > 0) {
                e.preventDefault();
                router.push(filteredTools[selectedIndex].path);
                onClose();
                setQuery("");
            } else if (e.key === "Escape") {
                onClose();
                setQuery("");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, selectedIndex, filteredTools, router, onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[20vh]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden border border-gray-200 dark:border-gray-700"
                        >
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                                <Search className="w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search tools..."
                                    className="flex-1 outline-none text-lg bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                                    autoFocus
                                />
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                                >
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Results */}
                            <div className="max-h-[400px] overflow-y-auto">
                                {filteredTools.length > 0 ? (
                                    <div className="p-2">
                                        {filteredTools.map((tool, index) => {
                                            const Icon = tool.icon;
                                            return (
                                                <button
                                                    key={tool.path}
                                                    onClick={() => {
                                                        router.push(tool.path);
                                                        onClose();
                                                        setQuery("");
                                                    }}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-left ${index === selectedIndex
                                                            ? "bg-indigo-50 dark:bg-indigo-900/30"
                                                            : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                        }`}
                                                >
                                                    <div
                                                        className={`w-10 h-10 flex items-center justify-center rounded-lg ${tool.color} text-white flex-shrink-0`}
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                                            {tool.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                            {tool.description}
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                                        No tools found
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">↑</kbd>
                                        <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">↓</kbd>
                                        navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">Enter</kbd>
                                        select
                                    </span>
                                </div>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">Esc</kbd>
                                    close
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
