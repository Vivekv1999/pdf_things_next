"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Users, FolderOpen, SortAsc, Download } from "lucide-react";

export default function MeeshoProblemSolution() {
    return (
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    The Meesho Multi-Account Challenge
                </motion.h2>
                <motion.p
                    className="text-center text-gray-600 mb-12 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Managing multiple Meesho seller accounts? Tired of downloading labels from each account
                    separately and manually sorting them? We&apos;ve got the perfect solution.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Problem Side */}
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-8 border-2 border-red-100"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-red-100 p-3 rounded-full">
                                <AlertCircle className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Traditional Way</h3>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex gap-3 items-start">
                                <span className="text-red-500 font-bold text-xl mt-1">✗</span>
                                <div>
                                    <p className="font-semibold text-gray-700">Download from Each Account</p>
                                    <p className="text-sm text-gray-600">Download label PDFs from all your accounts one by one</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-red-500 font-bold text-xl mt-1">✗</span>
                                <div>
                                    <p className="font-semibold text-gray-700">Print All Labels First</p>
                                    <p className="text-sm text-gray-600">Print labels from all accounts without any organization</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-red-500 font-bold text-xl mt-1">✗</span>
                                <div>
                                    <p className="font-semibold text-gray-700">Manually Sort Physical Labels</p>
                                    <p className="text-sm text-gray-600">After printing, physically sort all labels by SKU across all accounts</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-red-500 font-bold text-xl mt-1">✗</span>
                                <div>
                                    <p className="font-semibold text-gray-700">Time-Consuming & Error-Prone</p>
                                    <p className="text-sm text-gray-600">Spend 15-20 minutes sorting and risk mixing up labels</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Solution Side */}
                    <motion.div
                        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 border-2 border-green-200"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-green-500 p-3 rounded-full">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Our Smart Solution</h3>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex gap-3 items-start">
                                <span className="text-green-500 font-bold text-xl mt-1">✓</span>
                                <div>
                                    <p className="font-semibold text-gray-700">Upload All Account Labels</p>
                                    <p className="text-sm text-gray-600">Drag & drop label PDFs from all your Meesho accounts at once</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-green-500 font-bold text-xl mt-1">✓</span>
                                <div>
                                    <p className="font-semibold text-gray-700">Sort Digitally BEFORE Printing</p>
                                    <p className="text-sm text-gray-600">Automatically sort by SKU digitally - no physical sorting needed</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-green-500 font-bold text-xl mt-1">✓</span>
                                <div>
                                    <p className="font-semibold text-gray-700">Download Pre-Sorted PDF</p>
                                    <p className="text-sm text-gray-600">Get one perfectly organized PDF, already sorted and ready to print</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-green-500 font-bold text-xl mt-1">✓</span>
                                <div>
                                    <p className="font-semibold text-gray-700">Print & Pack Immediately</p>
                                    <p className="text-sm text-gray-600">Labels print in perfect order - go straight to packing!</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
