"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, Search, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "../constants/appConstants";
import { allTools, Tool } from "../data/allTools";
import { useTheme } from "../components/ThemeProvider";
import SearchModal from "../components/SearchModal";

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [allToolsMenuOpen, setAllToolsMenuOpen] = useState<boolean>(false);
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const { theme, toggleTheme } = useTheme();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setSearchOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Quick access tools (shown directly in navbar)
    const quickAccessPaths = ["/ecommerce", "/merge-pdf", "/split-pdf", "/crop-pdf",];

    // Categorize tools for mega menu
    const conversionTools = allTools.filter((tool) => tool.category === "conversion");
    const manipulationTools = allTools.filter((tool) => tool.category === "manipulation");
    const ecommerceTools = allTools.filter((tool) => tool.category === "other");

    return (
        <>
            <header
                className={`top-0 z-50 sticky transition-all duration-300 ${scrolled
                    ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg"
                    : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow"
                    }`}
            >
                <nav className="flex justify-between items-center mx-auto px-4 py-4 max-w-7xl">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-bold text-xl lg:text-2xl tracking-tight bg-gradient-to-r from-indigo-600 to-fuchsia-600 dark:from-indigo-400 dark:to-fuchsia-400 bg-clip-text text-transparent hover:scale-105 transition-transform flex-shrink-0"
                    >
                        {siteConfig.name}
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden lg:flex items-center gap-2">
                        {/* Home Link */}
                        {/* <Link
                            href="/"
                            className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${pathname === "/"
                                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                                : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                        >
                            Home
                        </Link> */}

                        {/* Quick Access Links - No Icons */}
                        {quickAccessPaths.map((path) => {
                            const tool = allTools.find(t => t.path === path);
                            if (!tool) return null;
                            return (
                                <Link
                                    key={tool.path}
                                    href={tool.path}
                                    className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${pathname === tool.path
                                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                                        : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    {tool.name}
                                </Link>
                            );
                        })}

                        {/* All Tools Mega Menu */}
                        <div
                            className="relative"
                            onMouseEnter={() => setAllToolsMenuOpen(true)}
                            onMouseLeave={() => setAllToolsMenuOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${allToolsMenuOpen
                                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                All Tools
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${allToolsMenuOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Mega Menu Dropdown */}
                            <AnimatePresence>
                                {allToolsMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6"
                                    >
                                        <div className="grid grid-cols-3 gap-6">
                                            {/* Conversion Tools */}
                                            {conversionTools?.length > 0 &&
                                                <div>
                                                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                                        Conversion
                                                    </h3>
                                                    <div className="space-y-1">
                                                        {conversionTools.map((tool) => {
                                                            const Icon = tool.icon;
                                                            return (
                                                                <Link
                                                                    key={tool.path}
                                                                    href={tool.path}
                                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition group"
                                                                >
                                                                    <div
                                                                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${tool.color} text-white flex-shrink-0`}
                                                                    >
                                                                        <Icon className="w-4 h-4" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                            {tool.name}
                                                                        </h4>
                                                                    </div>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            }

                                            {/* Modify PDF Tools */}
                                            <div>
                                                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                                    Modify PDF
                                                </h3>
                                                <div className="space-y-1">
                                                    {manipulationTools.map((tool) => {
                                                        const Icon = tool.icon;
                                                        return (
                                                            <Link
                                                                key={tool.path}
                                                                href={tool.path}
                                                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                                            >
                                                                <div
                                                                    className={`w-8 h-8 flex items-center justify-center rounded-lg ${tool.color} text-white flex-shrink-0`}
                                                                >
                                                                    <Icon className="w-4 h-4" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                        {tool.name}
                                                                    </h4>
                                                                </div>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Ecommerce Tools */}
                                            <div>
                                                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                                    Ecommerce
                                                </h3>
                                                <div className="space-y-1">
                                                    {ecommerceTools.map((tool) => {
                                                        const Icon = tool.icon;
                                                        return (
                                                            <Link
                                                                key={tool.path}
                                                                href={tool.path}
                                                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                                            >
                                                                <div
                                                                    className={`w-8 h-8 flex items-center justify-center rounded-lg ${tool.color} text-white flex-shrink-0`}
                                                                >
                                                                    <Icon className="w-4 h-4" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                        {tool.name}
                                                                    </h4>
                                                                </div>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-all"
                        >
                            <Search className="w-4 h-4" />
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
                            aria-label="Toggle theme"
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {theme === "dark" ? (
                                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                ) : (
                                    <Sun className="w-5 h-5 text-gray-600" />
                                )}
                            </motion.div>
                        </button>
                    </div>

                    {/* Mobile buttons */}
                    <div className="lg:hidden flex items-center gap-2">
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                        >
                            <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                        >
                            {theme === "dark" ? (
                                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                                <Sun className="w-5 h-5 text-gray-600" />
                            )}
                        </button>
                        <button
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? (
                                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile dropdown */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                            <div className="px-4 py-4 max-h-[70vh] overflow-y-auto">
                                {/* Home Link */}
                                <Link
                                    href="/"
                                    onClick={() => setMobileOpen(false)}
                                    className={`block py-2 px-3 rounded-lg text-sm font-medium transition mb-2 ${pathname === "/"
                                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    Home
                                </Link>

                                {/* Conversion Tools */}
                                {conversionTools.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
                                            Conversion
                                        </h3>
                                        {conversionTools.map((tool) => {
                                            const Icon = tool.icon;
                                            return (
                                                <Link
                                                    key={tool.path}
                                                    href={tool.path}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-sm transition hover:bg-gray-100 dark:hover:bg-gray-800 mb-1"
                                                >
                                                    <div
                                                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${tool.color} text-white flex-shrink-0`}
                                                    >
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                                        {tool.name}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Modify PDF Tools */}
                                {manipulationTools.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
                                            Modify PDF
                                        </h3>
                                        {manipulationTools.map((tool) => {
                                            const Icon = tool.icon;
                                            return (
                                                <Link
                                                    key={tool.path}
                                                    href={tool.path}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-sm transition hover:bg-gray-100 dark:hover:bg-gray-800 mb-1"
                                                >
                                                    <div
                                                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${tool.color} text-white flex-shrink-0`}
                                                    >
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                                        {tool.name}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Ecommerce Tools */}
                                {ecommerceTools.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
                                            Ecommerce
                                        </h3>
                                        {ecommerceTools.map((tool) => {
                                            const Icon = tool.icon;
                                            return (
                                                <Link
                                                    key={tool.path}
                                                    href={tool.path}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-sm transition hover:bg-gray-100 dark:hover:bg-gray-800 mb-1"
                                                >
                                                    <div
                                                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${tool.color} text-white flex-shrink-0`}
                                                    >
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                                        {tool.name}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Search Modal */}
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
};

export default Navbar;
