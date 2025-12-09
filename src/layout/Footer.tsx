import { FileText } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { siteConfig } from "../constants/appConstants";

const Footer = () => {
    return (
        <footer className="relative mt-16 bg-[#0B0F19] border-t border-white/10 rounded-t-[4rem]">
            {/* Glowing top border */}
            <div className="absolute -top-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-400 to-blue-500/0 blur-[2px]" />

            <div className="mx-auto max-w-7xl px-6 py-12">

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl shadow-blue-900/5">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="relative">
                                <FileText className="w-10 h-10 text-blue-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
                            </div>
                            <span className="font-semibold text-2xl tracking-wide text-white">
                                {siteConfig.name}
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            The future of PDF editing — fast, secure, and fully browser-based.
                            Built for eCommerce sellers, professionals, and everyday users.
                        </p>
                    </div>

                    {/* Tools */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">PDF Tools</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "PDF Merge", href: "/merge" },
                                { name: "PDF Split", href: "/split" },
                                { name: "PDF Compress", href: "/compress" },
                                { name: "PDF Crop", href: "/crop" }
                            ].map((tool) => (
                                <li key={tool.name}>
                                    <Link
                                        href={tool.href}
                                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.55)]"
                                    >
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.55)]"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact-us"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.55)]"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.55)]"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-and-conditions"
                                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.55)]"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom note */}
                <div className="mt-12 border-t border-white/10 pt-6 text-center text-gray-500">
                    <p>
                        © {moment().year()} {siteConfig.name}. Built with ❤️ for the next generation of PDF tools.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
