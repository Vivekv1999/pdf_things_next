"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle, Globe, LayoutGrid, Lock, Search, Shield, ShoppingBag, Users, Zap, ZapIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { allTools, Tool } from "../data/allTools";

// Tab definitions
const TABS = [
  { id: "all", label: "All Tools", icon: LayoutGrid },
  { id: "pdf", label: "PDF Tools", icon: Zap },
  { id: "ecommerce", label: "Ecommerce", icon: ShoppingBag },
] as const;

function HomeContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("s")?.toLowerCase() || "";

  const [activeTab, setActiveTab] = useState<typeof TABS[number]["id"]>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [isIndia, setIsIndia] = useState(false);

  // Sync URL search param with local state
  useEffect(() => {
    if (urlQuery) {
      setSearchTerm(urlQuery);
      setActiveTab("all");
    }

    // Simple Client-Side Location Check via Timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") {
        setIsIndia(true);
        // Optional: Set default tab to ecommerce for Indian users if specific search isn't present
      }
    } catch (e) {
      console.log("Could not detect timezone", e);
    }
  }, [urlQuery]);

  // Filter tools based on Tab AND Search
  const filteredTools = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return allTools.filter((tool) => {
      // 1. Tab Filtering
      let matchesTab = true;
      if (activeTab === "pdf") {
        matchesTab = tool.category === "conversion" || tool.category === "manipulation";
      } else if (activeTab === "ecommerce") {
        matchesTab = tool.path.includes("ecommerce") || tool.category === "other";
      }

      // 2. Search Filtering
      if (!matchesTab) return false;
      if (!query) return tool.showOnHomepage !== false;

      return (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category?.toLowerCase().includes(query)
      );
    });
  }, [activeTab, searchTerm]);

  const displayedTools = filteredTools.slice(0, visibleCount);
  const hasMore = filteredTools.length > visibleCount;

  const handleTabChange = (id: typeof activeTab) => {
    setActiveTab(id);
    setVisibleCount(6);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-white">

      {/* --- HERO SECTION (KEPT AS IS) --- */}
      <section className="relative pt-20 pb-8 px-4 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-fuchsia-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] bg-purple-200/40 rounded-full blur-[120px] mix-blend-multiply"></div>
          <div className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[100px] mix-blend-multiply"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-fuchsia-200/40 rounded-full blur-[100px] mix-blend-multiply"></div>
        </div>

        <div className="mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >


            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 leading-tight drop-shadow-sm">
              {isIndia ? (
                <>
                  The Ultimate Toolkit for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Ecommerce & PDF</span>
                </>
              ) : (
                <>
                  Your Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">PDF Toolkit</span>
                </>
              )}
            </h1>

            <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 font-medium">
              {isIndia ? (
                "Specialized tools for Flipkart & Meesho sellers, plus free PDF Merge, Split, and Crop tools. All in one place."
              ) : (
                <>
                  Join thousands of users who trust <strong>PDF Things</strong> for secure, client-side document processing.
                  No limits. No uploads. No sign-ups.
                </>
              )}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 fill-slate-50" viewBox="0 0 1440 48" preserveAspectRatio="none">
            <path d="M0,48 L1440,48 L1440,0 C1440,0 1100,48 720,48 C340,48 0,0 0,0 L0,48 Z"></path>
          </svg>
        </div>
      </section>

      {/* --- TOOLS SECTION (UPDATED BACKGROUND) --- */}
      <section id="tools-section" className="relative pb-24 -mt-12 z-20">
        {/* Subtle Grid Pattern - Full Width */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-slate-50">
          <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

        {/* Content Container - Centered */}
        <div className="max-w-[1800px] mx-auto px-8 md:px-48">

          {/* Controls Container */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-3 mb-8 flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex flex-wrap bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto justify-center">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap min-w-[120px] justify-center ${isActive
                      ? "text-indigo-600 bg-white shadow-md ring-1 ring-black/5 scale-[1.02]"
                      : "text-gray-500 hover:text-gray-700 hover:bg-slate-200"
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools Grid */}
          <AnimatePresence mode="popLayout">
            {displayedTools.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {displayedTools.map((tool) => (
                  <ToolCard key={tool.path} tool={tool} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 bg-white/40 rounded-3xl border border-dashed border-slate-300"
              >
                <div className="inline-flex p-4 rounded-full bg-slate-100 mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
                <p className="text-gray-500">
                  We couldn&apos;t find any tools matching &quot;{searchTerm}&quot; in this category.
                </p>
                <button
                  onClick={() => { setSearchTerm(""); setActiveTab("all"); }}
                  className="mt-4 text-fuchsia-600 font-medium hover:underline"
                >
                  View all tools
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {hasMore && (
            <div className="mt-16 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-gray-900 to-slate-800 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Explore More Tools
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION (UPDATED BACKGROUND) --- */}
      <section id="why-choose-section" className="px-4 py-24 relative overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>

        <div className="mx-auto max-w-6xl relative z-10">
          <div className="mb-20 text-center">
            <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase mb-3 block">Why Choose Us</span>
            <h2 className="mb-6 font-extrabold text-gray-900 text-3xl sm:text-5xl">
              Professional Tools, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Zero Cost</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg leading-relaxed">
              We&apos;ve built a complete document ecosystem that runs entirely in your browser. Fast, secure, and always available.
            </p>
          </div>

          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: "For Everyone",
                description: "Perfect for students, freelance professionals, and businesses of all sizes.",
                color: "text-blue-600",
                bg: "bg-blue-50"
              },
              {
                icon: Globe,
                title: "Works Everywhere",
                description: "Compatible with all modern browsers on desktop, tablet, and mobile devices.",
                color: "text-purple-600",
                bg: "bg-purple-50"
              },
              {
                icon: CheckCircle,
                title: "Always Free",
                description: "No hidden costs, no premium features. Everything is completely free.",
                color: "text-emerald-600",
                bg: "bg-emerald-50"
              },
              {
                icon: Zap,
                title: "No Limits",
                description: "Process as many PDFs as you want, whenever you want. No daily caps.",
                color: "text-amber-600",
                bg: "bg-amber-50"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-200/50 hover:-translate-y-2 border border-slate-100 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="mb-3 font-bold text-gray-900 text-xl group-hover:text-indigo-700 transition-colors">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed group-hover:text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRIVACY SECTION (UPDATED BACKGROUND) --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-20">
          <div className="w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 opacity-20">
          <div className="w-96 h-96 rounded-full bg-fuchsia-500 blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-5xl px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl mb-10 text-emerald-400">
            <Lock className="w-10 h-10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Your Files Never Leave Your Browser</h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-16 max-w-3xl mx-auto">
            We believe privacy is a fundamental right. Unlike other online tools, we don&apos;t upload your files to a server.
            Everything happens <strong>locally on your device</strong> via WebAssembly.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              { title: "No Uploads", desc: "Files process directly in your browser memory.", icon: Shield },
              { title: "No Data Storage", desc: "We don't view, store, or share your content.", icon: Globe },
              { title: "Works Offline", desc: "Many tools work even without internet once loaded.", icon: ZapIcon },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="text-indigo-400 mb-6"><item.icon className="w-8 h-8" /></div>
                <h4 className="font-bold text-white text-xl mb-3">{item.title}</h4>
                <p className="text-slate-400 text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION (UPDATED BACKGROUND) --- */}
      <section className="py-24 px-4 bg-gradient-to-r from-fuchsia-100 to-indigo-100 text-center relative overflow-hidden">
        <div className="mx-auto max-w-4xl relative z-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setActiveTab("all");
                document.getElementById("tools-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-10 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-800 transition-all"
            >
              Browse Tools
            </button>
          </div>
        </div>
      </section>

      {/* SEO Hidden Content */}
      <div className="sr-only">
        <h3>Advanced PDF & Ecommerce Tools</h3>
        <p>
          From specialized Flipkart label cropping to Meesho invoice management, our tools cater to Indian ecommerce sellers.
          Standard PDF functions like merge, split, and compress are also available for free.
        </p>
      </div>

    </div>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={tool.path} className="block h-full">
        <div className="group h-full bg-white border border-slate-100 rounded-2xl p-6 shadow-lg shadow-slate-100 hover:shadow-2xl hover:shadow-indigo-100/50 hover:border-indigo-100 transition-all duration-300 relative overflow-hidden">
          {/* Hover Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/0 opacity-0 group-hover:opacity-100 group-hover:from-indigo-50/30 group-hover:to-fuchsia-50/10 transition-all duration-500 pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${tool.color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {tool.name}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
              {tool.description}
            </p>

            <div className={`inline-flex items-center text-sm font-bold transition-all duration-300 ${tool.path.includes('ecommerce') ? 'text-fuchsia-600' : 'text-indigo-600'} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0`}>
              Start Now <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen"></div>}>
      <HomeContent />
    </Suspense>
  );
}
