"use client";
import { Upload, SortAsc, Trash2, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function MeeshoEcomWorkflowSteps() {
    const steps = [
        {
            title: "Upload Labels",
            description: "Drag & drop all your Meesho label PDFs from multiple accounts",
            icon: <Upload className="w-6 h-6" />,
            color: "from-indigo-500 to-indigo-600",
            bgColor: "bg-indigo-50"
        },
        {
            title: "Auto-Sort by SKU",
            description: "Our tool automatically organizes all labels by product SKU",
            icon: <SortAsc className="w-6 h-6" />,
            color: "from-orange-500 to-orange-600",
            bgColor: "bg-orange-50"
        },
        {
            title: "Remove Empty Labels",
            description: "Intelligent detection removes labels without barcodes",
            icon: <Trash2 className="w-6 h-6" />,
            color: "from-red-500 to-red-600",
            bgColor: "bg-red-50"
        },
        {
            title: "Download Merged PDF",
            description: "Get one perfectly sorted PDF ready for printing",
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
                    Four simple steps to perfectly organized labels
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

                {/* Connecting line for desktop */}
                <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-indigo-200 via-orange-200 via-red-200 to-green-200 -z-10 opacity-50"
                    style={{ width: 'calc(100% - 12rem)', marginLeft: '6rem' }}>
                </div>
            </div>
        </section>
    );
}
