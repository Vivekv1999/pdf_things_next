"use client";

import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Trash2 } from "lucide-react";

interface PdfToJpgFileCardProps {
    file: File;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    isConverting: boolean;
}

export const PdfToJpgFileCard = ({ file, setFile, isConverting }: PdfToJpgFileCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex items-center justify-between max-w-2xl mx-auto"
        >
            <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
                    <FileText className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-left">
                    <h3 className="font-semibold text-lg truncate max-w-[200px] sm:max-w-md">{file.name}</h3>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setFile(null)} disabled={isConverting}>
                <Trash2 className="w-5 h-5 text-muted-foreground hover:text-red-500 transition-colors" />
            </Button>
        </motion.div>
    );
};
