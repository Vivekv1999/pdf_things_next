import Link from "next/link";
import { blogs } from "../../data/blogs";
import { MoveRight, Calendar } from "lucide-react";
import Image from "next/image";

export const metadata = {
    title: "PDF Things Blog - Tips, Tutorials & Updates",
    description:
        "Read our latest guides on using PDF tools, improving productivity, and managing digital documents securely.",
};

export default function BlogIndex() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-4">
                        Our <span className="text-indigo-600">Blog</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Tips, tutorials, and guides to help you master PDF management and boost your productivity.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <article
                            key={blog.slug}
                            className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 h-full"
                        >
                            {blog.image && (
                                <div className="relative w-full h-48 sm:h-56">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center space-x-4 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-4 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-full w-fit">
                                        <span className="flex items-center">
                                            <Calendar className="w-3.5 h-3.5 mr-1" />
                                            {blog.publishedAt}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                        <Link href={`/blog/${blog.slug}`} className="hover:text-indigo-600 transition-colors">
                                            {blog.title}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed text-sm">
                                        {blog.description}
                                    </p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        {/* Tags can be hidden on small cards or limited */}
                                    </div>
                                    <Link
                                        href={`/blog/${blog.slug}`}
                                        className="group inline-flex items-center font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                                    >
                                        Read article
                                        <MoveRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
