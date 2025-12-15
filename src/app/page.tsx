"use client";

import { motion } from "framer-motion";
import { CheckCircle, Globe, Lock, Shield, Users, Zap, ZapIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { allTools } from "../data/allTools";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("s")?.toLowerCase() || "";

  const filteredTools = allTools.filter((tool) => {
    if (!query) return tool.showOnHomepage !== false;
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <section className="relative flex justify-center items-center px-4 min-h-[40vh] overflow-hidden text-center">
        <div className="-z-10 absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-fuchsia-500/10 to-transparent" />
        <div className="mx-auto max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600 font-extrabold text-transparent text-3xl sm:text-4xl lg:text-5xl tracking-tight"
          >
            {query
              ? `Search Results for "${query}"`
              : "Free Online PDF Tools - Merge, Split & Crop PDF"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-gray-600 text-base sm:text-lg"
          >
            {query
              ? `Found ${filteredTools.length} tool${filteredTools.length === 1 ? "" : "s"} matching your search.`
              : "Fast, secure PDF tools for merging, splitting, cropping & more. Includes specialized tools for Flipkart & Meesho sellers. 100% free, no sign-up required."}
          </motion.p>
        </div>
      </section>

      <section className="mx-auto mt-5 md:mt-4 px-4 pb-20 max-w-7xl">
        {filteredTools.length > 0 ? (
          <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map(({ path, name, description, color, icon: Icon }) => (
              <motion.div
                key={path}
                whileHover={{ y: -4 }}
                className="group bg-white/70 shadow-sm hover:shadow-lg p-6 border border-gray-200 rounded-2xl transition-all cursor-pointer"
              >
                <Link href={path}>
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl ${color} text-white mb-4 shadow-lg`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="font-semibold text-gray-900 text-xl group-hover:underline">
                    {name}
                  </h2>
                  <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                    {description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600">Try searching for something else, like &quot;merge&quot; or &quot;split&quot;.</p>
            <Link href="/" className="inline-block mt-4 text-indigo-600 font-medium hover:underline">
              View all tools
            </Link>
          </div>
        )}
      </section>

      {/* SEO Content Section - Hidden from users but visible to search engines */}
      <section className="sr-only" aria-hidden="true">
        <div>
          <h2>Your Complete PDF Toolkit - Fast, Free & Secure</h2>

          <div>
            <p>
              <strong>PDF Things</strong> offers a comprehensive suite of <strong>free PDF tools</strong> designed to make document management effortless. Whether you need to <strong>merge PDF</strong> files into one document, <strong>split PDF</strong> pages, or <strong>crop PDF</strong> to remove unwanted margins, our browser-based tools deliver professional results instantly.
            </p>

            <h3>Professional PDF Tools for Everyone</h3>
            <p>
              Our platform serves students, professionals, and businesses with powerful features like <strong>PDF compression</strong> to reduce file sizes and <strong>convert PDF online</strong> without downloads. Everything runs directly in your browser using advanced web technologies, ensuring your sensitive documents never leave your device.
            </p>

            <h3>Specialized Ecommerce PDF Tools</h3>
            <p>
              For online sellers, we provide dedicated <strong>ecommerce PDF tools</strong> specifically built for marketplace platforms. Our <strong>Flipkart label sorter</strong> automatically organizes shipping labels by SKU and account, while the <strong>Meesho label tool</strong> streamlines your order fulfillment process. These time-saving features help ecommerce sellers process hundreds of orders efficiently.
            </p>

            <div>
              <h3>Why Choose PDF Things?</h3>
              <ul>
                <li>✓ <strong>100% Free:</strong> No hidden costs or premium features — everything is completely free</li>
                <li>✓ <strong>Privacy First:</strong> All processing happens in your browser; we never store your files</li>
                <li>✓ <strong>No Registration:</strong> Start using tools immediately without creating an account</li>
                <li>✓ <strong>Lightning Fast:</strong> Instant processing with no upload delays or queue waiting</li>
                <li>✓ <strong>Unlimited Usage:</strong> Process as many PDFs as you need, anytime</li>
              </ul>
            </div>

            <p>
              Join thousands of users who trust PDF Things for their daily document needs. From simple tasks like merging a few pages to complex ecommerce workflows, our tools are built to handle it all with speed, security, and simplicity.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 font-bold text-gray-900 text-3xl sm:text-4xl">
              Everything Happens in Your Browser
            </h2>
            <p className="mb-8 text-gray-600 text-lg leading-relaxed">
              Our advanced client-side technology means your sensitive documents never leave your computer. No servers,
              no cloud storage, no privacy concerns. Just pure, secure PDF processing powered by modern web
              technologies.
            </p>

            <div className="gap-6 grid sm:grid-cols-2 mt-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white shadow-sm p-6 rounded-xl"
              >
                <h3 className="mb-3 font-semibold text-gray-900 text-xl">🔒 Maximum Security</h3>
                <p className="text-gray-600">
                  Your files are processed entirely within your browser using WebAssembly and JavaScript. No data
                  transmission, no server storage.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white shadow-sm p-6 rounded-xl"
              >
                <h3 className="mb-3 font-semibold text-gray-900 text-xl">⚡ Instant Processing</h3>
                <p className="text-gray-600">
                  No upload delays or queue waiting. Start processing immediately and get results in seconds, not
                  minutes.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 font-bold text-gray-900 text-3xl sm:text-4xl">
              Why Choose Our PDF Tools?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              Built for professionals, students, and anyone who works with PDFs regularly.
            </p>
          </motion.div>

          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: "For Everyone",
                description: "Perfect for students, professionals, and businesses of all sizes.",
              },
              {
                icon: Globe,
                title: "Works Everywhere",
                description: "Compatible with all modern browsers on desktop and mobile devices.",
              },
              {
                icon: CheckCircle,
                title: "Always Free",
                description: "No hidden costs, no premium features. Everything is completely free.",
              },
              {
                icon: Zap,
                title: "No Limits",
                description: "Process as many PDFs as you want, whenever you want.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white shadow-sm hover:shadow-md p-6 border border-gray-200 rounded-xl transition-shadow"
              >
                <feature.icon className="mb-4 w-10 h-10 text-indigo-600" />
                <h3 className="mb-2 font-semibold text-gray-900 text-lg">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 font-bold text-gray-900 text-3xl sm:text-4xl">
              Your Privacy is Our Priority
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              Everything happens in your browser. No uploads, no servers, no data collection.
            </p>
          </motion.div>

          <div className="gap-8 grid md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center items-center bg-green-500 shadow-lg mx-auto mb-4 rounded-full w-16 h-16">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 text-xl">100% Secure</h3>
              <p className="text-gray-600">
                All processing happens locally in your browser. Your files never leave your device.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center items-center bg-blue-500 shadow-lg mx-auto mb-4 rounded-full w-16 h-16">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 text-xl">No Registration</h3>
              <p className="text-gray-600">
                Start using our tools immediately. No accounts, no passwords, no hassle.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center items-center bg-purple-500 shadow-lg mx-auto mb-4 rounded-full w-16 h-16">
                <ZapIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 text-xl">Lightning Fast</h3>
              <p className="text-gray-600">
                No waiting for uploads or downloads. Process your PDFs instantly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 font-bold text-white text-3xl sm:text-4xl">Ready to Get Started?</h2>
            <p className="mb-8 text-indigo-100 text-xl leading-relaxed">
              Choose any tool above and start processing your PDFs instantly. No registration required, completely free
              forever.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white shadow-lg hover:shadow-xl px-8 py-4 rounded-xl font-semibold text-indigo-600 text-lg transition-all"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Explore Tools
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  console.log(process.env.TEST_PRIVATE, "test_private");
  console.log(process.env.NEXT_PUBLIC_SITE_URL, "Url");
  console.log(process.env.NEXT_PUBLIC_ENVIRONMENT, "environment");

  return (
    <Suspense fallback={<div className="min-h-screen"></div>}>
      <SearchResults />
    </Suspense>
  );
}
