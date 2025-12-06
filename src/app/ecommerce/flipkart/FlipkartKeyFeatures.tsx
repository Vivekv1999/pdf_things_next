"use client";

import { motion } from "framer-motion";
import {
    Crop,
    SortAsc,
    Layers,
    Zap,
    Shield,
    Download,
    Scissors,
    BarChart3
} from "lucide-react";

export default function FlipkartKeyFeatures() {
    const features = [
        {
            icon: <Layers className="w-8 h-8" />,
            title: "Multi-Account Merge",
            description: "Upload labels from multiple accounts or parts. We merge them all first before processing.",
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
        },
        {
            icon: <Crop className="w-8 h-8" />,
            title: "Auto-Crop Labels",
            description: "After merging, we auto-crop all labels to perfect shipping size. No waste, no manual cutting.",
            color: "from-yellow-500 to-orange-500",
            bgColor: "bg-yellow-50",
        },
        {
            icon: <SortAsc className="w-8 h-8" />,
            title: "Sort by SKU",
            description: "First tool to sort Flipkart labels by SKU! Organize digitally before printing for faster packing.",
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "One-Click Processing",
            description: "Click once - we merge, crop, and sort all your labels automatically. That simple.",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "100% Secure",
            description: "All processing happens in your browser. Your data never leaves your device.",
            color: "from-indigo-500 to-indigo-600",
            bgColor: "bg-indigo-50",
        },
        {
            icon: <Download className="w-8 h-8" />,
            title: "Instant Download",
            description: "Get your perfectly cropped and sorted PDF instantly. Print and start packing!",
            color: "from-teal-500 to-teal-600",
            bgColor: "bg-teal-50",
        },
        {
            icon: <Scissors className="w-8 h-8" />,
            title: "Accurate Sizing",
            description: "Labels cropped to exact shipping size specifications - fits perfectly on packages.",
            color: "from-pink-500 to-pink-600",
            bgColor: "bg-pink-50",
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            title: "Batch Processing",
            description: "Process hundreds of labels across multiple accounts in seconds, not hours.",
            color: "from-cyan-500 to-cyan-600",
            bgColor: "bg-cyan-50",
        },
    ];

    return (
        <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Powerful Features for Flipkart Sellers
                </motion.h2>
                <motion.p
                    className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Everything you need to crop, merge, and sort Flipkart labels efficiently
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            className={`${feature.bgColor} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className={`bg-gradient-to-br ${feature.color} text-white p-4 rounded-xl mb-4 inline-block group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
