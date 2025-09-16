"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { allTools, Tool } from "../data/allTools";

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    return (
        <header className="top-0 z-50 sticky bg-white shadow">
            <nav className="flex justify-between items-center mx-auto px-4 py-3 max-w-7xl">
                <Link
                    href="/"
                    className="font-bold text-indigo-600 text-2xl tracking-tight"
                >
                    PDFTools
                </Link>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center gap-6">
                    {allTools.slice(0, 5).map(({ path, name }: Tool) => (
                        <Link
                            key={path}
                            href={path}
                            className={`text-sm font-medium px-2 py-1 rounded transition-colors duration-200 ${pathname === path
                                ? "text-indigo-600 bg-indigo-50"
                                : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
                                }`}
                        >
                            {name}
                        </Link>
                    ))}
                </div>

                {/* Mobile button */}
                <button
                    className="md:hidden hover:bg-gray-100 p-2 rounded"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>
            </nav>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="md:hidden bg-white px-4 pb-4 border-t">
                    {allTools.slice(0, 5).map(({ path, name }: Tool) => (
                        <Link
                            key={path}
                            href={path}
                            onClick={() => setMobileOpen(false)}
                            className={`block py-2 px-2 rounded text-sm font-medium transition ${pathname === path
                                ? "text-indigo-600 bg-indigo-50"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;
