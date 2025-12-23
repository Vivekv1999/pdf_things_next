import { Crop, FileStack, FileText, Image as ImageIcon, Minimize2, Scissors, ShoppingCart, Store, Trash2 } from "lucide-react";

export interface Tool {
    path: string;
    name: string;
    description: string;
    color: string;
    icon: React.ComponentType<{ className?: string }>;
    isNew?: boolean;
    category?: "conversion" | "manipulation" | "other";
    showOnHomepage?: boolean;
}

export const allTools: Tool[] = [
    {
        path: "/ecommerce",
        name: "Ecommerce Tools",
        description: "Optimize your product listings and sales quickly.",
        color: "bg-green-500",
        icon: ShoppingCart,
        isNew: true,
        category: "other",
        showOnHomepage: true,
    },
    // {
    //     path: "/ecommerce/amazon",
    //     name: "Amazon",
    //     description: "Amazon FBA & FBM label cropping made easy.",
    //     color: "bg-blue-600",
    //     icon: Store,
    //     category: "other",
    // },
    // {
    //     path: "/ecommerce/sort-by-sku",
    //     name: "Sort by SKU",
    //     description: "Automatically reorder PDFs by SKU or order ID.",
    //     color: "bg-green-600",
    //     icon: Store,
    //     category: "other",
    // },
    // {
    //     path: "/pdf-to-word",
    //     name: "PDF to Word",
    //     description: "Convert PDF documents to editable Word format.",
    //     color: "bg-amber-600",
    //     icon: FileType,
    //     isNew: true,
    //     category: "conversion",
    // },
    // {
    //     path: "/pdf-to-image",
    //     name: "PDF to Image",
    //     description: "Convert PDF pages to JPG or PNG images.",
    //     color: "bg-teal-600",
    //     icon: Image,
    //     isNew: true,
    //     category: "conversion",
    // },
    {
        path: "/merge-pdf",
        name: "Merge PDF",
        description: "Combine multiple PDFs into one file in seconds.",
        color: "bg-indigo-600",
        icon: FileStack,
        category: "manipulation",
        showOnHomepage: true,
    },
    {
        path: "/split-pdf",
        name: "Split PDF",
        description: "Extract or split pages into separate PDFs.",
        color: "bg-emerald-600",
        icon: Scissors,
        category: "manipulation",
        showOnHomepage: true,
    },
    {
        path: "/compress-pdf",
        name: "Compress PDF",
        description: "Reduce file size without quality loss.",
        color: "bg-cyan-600",
        icon: Minimize2,
        category: "manipulation",
        showOnHomepage: true,
    },
    {
        path: "/crop-pdf",
        name: "Crop PDF",
        description: "Trim margins manually or automatically.",
        color: "bg-fuchsia-600",
        icon: Crop,
        category: "manipulation",
        showOnHomepage: true,
    },
    {
        path: "/remove-pages",
        name: "Remove PDF Pages",
        description: "Remove unwanted pages from your PDF documents.",
        color: "bg-red-600",
        icon: Trash2,
        category: "manipulation",
        showOnHomepage: true,
        isNew: true,
    },
    {
        path: "/pdf-to-jpg",
        name: "PDF to JPG",
        description: "Convert PDF pages to high-quality JPG images.",
        color: "bg-orange-600",
        icon: ImageIcon,
        category: "conversion",
        showOnHomepage: true,
        isNew: true,
    },
    {
        path: "/jpg-to-pdf",
        name: "JPG to PDF",
        description: "Convert images to a single PDF document.",
        color: "bg-red-600",
        icon: FileText,
        category: "conversion",
        showOnHomepage: true,
        isNew: true,
    },
    {
        path: "/ecommerce/meesho",
        name: "Meesho",
        description: "Crop and sort shipping labels for Meesho sellers.",
        color: "bg-purple-600",
        icon: Store,
        category: "other",
        showOnHomepage: true,
    },
    {
        path: "/ecommerce/flipkart",
        name: "Flipkart",
        description: "Format Flipkart labels for faster dispatch.",
        color: "bg-yellow-600",
        icon: Store,
        category: "other",
        showOnHomepage: true,
    },
];
