import { FileStack, Scissors } from "lucide-react";

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
        path: "/split",
        name: "Split PDF",
        description: "Extract or split pages into separate PDFs.",
        color: "bg-emerald-600",
        icon: Scissors,
    },
];
