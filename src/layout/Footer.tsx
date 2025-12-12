import { FileText } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { siteConfig } from "../constants/appConstants";

const Footer = () => {
    return (
        <footer className="relative mt-20 bg-gray-950 border-t border-white/5 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-500/10 via-transparent to-transparent opacity-50" />

            <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Brand Section - Takes up 4 columns on large screens */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-xl shadow-lg shadow-indigo-500/20">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-2xl text-white tracking-tight">
                                {siteConfig.name}
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            The ultimate browser-based PDF toolkit. Secure, fast, and completely free.
                            Built to empower sellers and professionals with next-gen tools.
                        </p>
                        <div className="flex gap-4">
                            {/* Social placeholders or badges could go here */}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                        <h3 className="font-semibold text-white tracking-wide mb-6">PDF Tools</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Merge PDF", href: "/merge-pdf" },
                                { name: "Split PDF", href: "/split-pdf" },
                                { name: "Crop PDF", href: "/crop-pdf" },
                                { name: "PDF to JPG", href: "/pdf-to-jpg" },
                                { name: "JPG to PDF", href: "/jpg-to-pdf" },
                                // { name: "Compress PDF", href: "/compress-pdf" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-gray-400 hover:text-indigo-400 transition-colors text-sm">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                        <h3 className="font-semibold text-white tracking-wide mb-6">Ecommerce</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "All Tools", href: "/ecommerce" },
                                { name: "Meesho Label Sort", href: "/ecommerce/meesho" },
                                { name: "Flipkart Label Crop", href: "/ecommerce/flipkart" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-gray-400 hover:text-fuchsia-400 transition-colors text-sm">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-2 lg:col-span-2">
                        <h3 className="font-semibold text-white tracking-wide mb-6">Company</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "About Us", href: "/about" },
                                { name: "Contact", href: "/contact-us" },
                                { name: "Privacy Policy", href: "/privacy-policy" },
                                { name: "Terms", href: "/terms-and-conditions" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {moment().year()} {siteConfig.name}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-gray-600 text-xs">Secure SSL Encryption</span>
                        {/* Add status indicator or other trust badges here if needed */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
