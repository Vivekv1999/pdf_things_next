"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Crop, SortAsc } from "lucide-react";

export default function FlipkartProblemSolution() {
    return (
        <section className="py-16 px-4 bg-gradient-to-br from-yellow-50 via-white to-orange-50">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    The Flipkart Seller Challenge
                </motion.h2>
                <motion.p
                    className="text-center text-gray-600 mb-12 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    Managing Flipkart labels across multiple accounts? Tired of manually cropping labels
                    to the right size and sorting them for packing? We&apos;ve automated it all.
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
                                    <p className="font-semibold text-gray-700">Wrong Label Size</p>
                                    <p className="text-sm text-gray-600">Flipkart labels print with extra margins - waste paper & time cutting</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-red-500 font-bold text-xl mt-1">✗</span>
                                <div>
                                    <p className="font-semibold text-gray-700">No SKU Sorting</p>
                                    <p className="text-sm text-gray-600">Flipkart doesn&apos;t sort labels by SKU - you manually sort after printing</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-red-500 font-bold text-xl mt-1">✗</span>
                                <div>
                                    <p className="font-semibold text-gray-700">Multi-Account Hassle</p>
                                    <p className="text-sm text-gray-600">Download, crop, and sort labels separately for each account</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-red-500 font-bold text-xl mt-1">✗</span>
                                <div>
                                    <p className="font-semibold text-gray-700">Time-Consuming</p>
                                    <p className="text-sm text-gray-600">Spend 20-30 minutes per batch on manual work</p>
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
                                    <p className="font-semibold text-gray-700">Auto-Crop to Perfect Size</p>
                                    <p className="text-sm text-gray-600">Crop all labels to accurate shipping size - ready to print & stick</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-green-500 font-bold text-xl mt-1">✓</span>
                                <div>
                                    <p className="font-semibold text-gray-700">Smart SKU Sorting</p>
                                    <p className="text-sm text-gray-600">Sort all labels by SKU before printing - no manual sorting needed</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-green-500 font-bold text-xl mt-1">✓</span>
                                <div>
                                    <p className="font-semibold text-gray-700">Multi-Account Merge</p>
                                    <p className="text-sm text-gray-600">Upload all accounts → auto-merge, crop, and sort in one click</p>
                                </div>
                            </li>
                            <li className="flex gap-3 items-start">
                                <span className="text-green-500 font-bold text-xl mt-1">✓</span>
                                <div>
                                    <p className="font-semibold text-gray-700">One-Click Processing</p>
                                    <p className="text-sm text-gray-600">All done in under 2 minutes - crop, merge, sort, download!</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
