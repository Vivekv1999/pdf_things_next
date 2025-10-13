"use client";
import { List, Trash2, Download, Upload } from "lucide-react";

export default function MeeshoEcomWorkflowSteps() {
    const steps = [
        { title: "Upload PDF", description: "Upload your Meesho labels PDF", icon: <Upload />, color: "bg-indigo-600" },
        { title: "Sort by SKU", description: "Sort all labels by SKU", icon: <List />, color: "bg-orange-500" },
        { title: "Remove Empty Labels", description: "Remove labels without barcode", icon: <Trash2 />, color: "bg-red-500" },
        { title: "Download PDF", description: "Download your sorted file", icon: <Download />, color: "bg-green-600" },
    ];

    return (
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-10">
            {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 rounded-xl shadow-md w-full md:w-1/4 text-center">
                    <div className={`p-4 rounded-full text-white mb-2 ${step.color}`}>
                        {step.icon}
                    </div>
                    <p className="font-semibold text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                </div>
            ))}
        </div>
    );
}
