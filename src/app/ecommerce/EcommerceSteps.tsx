"use client";

import { motion } from "framer-motion";
import { Layers, Package, Zap } from "lucide-react";

const steps = [
    {
        icon: <Layers className="w-8 h-8 text-purple-600" />,
        title: "Upload All Accounts",
        desc: "Combine labels from multiple seller accounts in one place.",
    },
    {
        icon: <Package className="w-8 h-8 text-blue-600" />,
        title: "Smart Merge & Sort",
        desc: "Automatically merge PDFs and sort all labels by SKU or order ID.",
    },
    {
        icon: <Zap className="w-8 h-8 text-green-600" />,
        title: "Ready in Seconds",
        desc: "Get your perfectly organized file in minimal time, no manual work.",
    },
];

export function EcommerceSteps() {
    return (
        <section className="mt-20">
            <h2 className="mb-12 font-bold text-gray-800 text-3xl text-center">
                Handle Multiple Accounts with Ease
            </h2>

            <div className="flex md:flex-row flex-col justify-center items-center gap-10">
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        className="flex flex-col items-center max-w-xs text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.2 }}
                    >
                        <div className="flex justify-center items-center bg-gray-100 shadow-md mb-4 rounded-full w-24 h-24">
                            {step.icon}
                        </div>
                        <h3 className="mb-2 font-semibold text-xl">{step.title}</h3>
                        <p className="text-gray-600">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
