"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Package, Clock } from "lucide-react";

export default function FlipkartStats() {
    const stats = [
        {
            icon: <Clock className="w-8 h-8" />,
            value: "95%",
            label: "Time Saved",
            description: "Complete in 2 minutes vs 30+ minutes",
            color: "from-green-500 to-emerald-500",
        },
        {
            icon: <Users className="w-8 h-8" />,
            value: "Unlimited",
            label: "Accounts Supported",
            description: "Merge and sort labels from any number of accounts",
            color: "from-blue-500 to-cyan-500",
        },
        {
            icon: <Package className="w-8 h-8" />,
            value: "100%",
            label: "Accurate Cropping",
            description: "Perfect label size every single time",
            color: "from-purple-500 to-pink-500",
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            value: "First",
            label: "Multi-Account SKU Sorting",
            description: "The only tool that sorts Flipkart labels by SKU across all accounts",
            color: "from-orange-500 to-red-500",
        },
    ];

    return (
        <section className="py-16 px-4 bg-gradient-to-br from-yellow-600 to-orange-700 text-white">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Why Flipkart Sellers Choose Us
                </motion.h2>
                <motion.p
                    className="text-center text-orange-100 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    The first and only tool to crop AND sort Flipkart labels automatically
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl inline-block mb-4`}>
                                {stat.icon}
                            </div>
                            <div className="text-4xl font-bold mb-2">{stat.value}</div>
                            <div className="text-lg font-semibold mb-2">{stat.label}</div>
                            <p className="text-sm text-orange-100">{stat.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
