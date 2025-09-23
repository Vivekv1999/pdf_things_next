import { Crop, FileMinus2, FileStack, Scissors } from "lucide-react";

export interface Tool {
    path: string;
    name: string;
    description: string;
    color: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const allTools: Tool[] = [
    {
        path: "/merge-pdf",
        name: "Merge PDF",
        description: "Combine multiple PDFs into one file in seconds.",
        color: "bg-indigo-600",
        icon: FileStack,
    },
    {
        path: "/split-pdf",
        name: "Split PDF",
        description: "Extract or split pages into separate PDFs.",
        color: "bg-emerald-600",
        icon: Scissors,
    },
    {
        path: "/compress-pdf",
        name: "Compress PDF",
        description: "Reduce file size without quality loss.",
        color: "bg-cyan-600",
        icon: FileMinus2,
    },
    {
        path: "/crop",
        name: "Crop PDF",
        description: "Trim margins manually or automatically.",
        color: "bg-fuchsia-600",
        icon: Crop,
    },
    {
        path: "/remove-pages",
        name: "Remove Pages",
        description: "Delete unwanted pages from your PDF.",
        color: "bg-rose-600",
        icon: FileMinus2,
    },
];
