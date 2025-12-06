"use client";

import { Upload, Crop, SortAsc, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function FlipkartWorkflowSteps() {
    const steps = [
        {
            title: "Upload Labels",
            description: "Drop all your Flipkart label PDFs from any number of accounts",
            icon: <Upload className="w-6 h-6" />,
            color: "from-yellow-500 to-yellow-600",
            bgColor: "bg-yellow-50"
        },
        {
            title: "Auto-Crop & Merge",
            description: "Merge all accounts and crop all labels to perfect shipping size automatically",
            icon: <Crop className="w-6 h-6" />,
            color: "from-orange-500 to-orange-600",
            bgColor: "bg-orange-50"
        },
        {
            title: "Sort by SKU",
            description: "Labels automatically sorted by SKU across all accounts",
            icon: <SortAsc className="w-6 h-6" />,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            title: "Download & Print",
            description: "Get your perfectly cropped and sorted PDF ready to print",
            icon: <Download className="w-6 h-6" />,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50"
        },
    ];

    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    How It Works
                </motion.h2>
                <motion.p
                    className="text-center text-gray-600 mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Four simple steps to perfectly cropped and sorted labels
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            className={`${step.bgColor} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            {/* Step number badge */}
                            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-gray-700 font-bold text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                                {idx + 1}
                            </div>

                            {/* Icon */}
                            <div className={`bg-gradient-to-br ${step.color} text-white p-4 rounded-xl mb-4 inline-block group-hover:scale-110 transition-transform duration-300`}>
                                {step.icon}
                            </div>

                            {/* Content */}
                            <h3 className="font-bold text-gray-800 text-lg mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>

                            {/* Decorative element */}
                            <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${step.color} opacity-10 rounded-full blur-2xl`}></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
