import Link from "next/link";
import { blogs } from "../../../data/blogs";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ChevronLeft, Calendar, User, Tag } from "lucide-react";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static params for all blogs
export async function generateStaticParams() {
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

// Generate metadata for the page
export async function generateMetadata(props: Props) {
    const params = await props.params;
    const blog = blogs.find((b) => b.slug === params.slug);
    if (!blog) return { title: "Blog Not Found" };

    return {
        title: `${blog.title} - PDF Things Blog`,
        description: blog.description,
    };
}

export default async function BlogPost(props: Props) {
    const params = await props.params;
    const blog = blogs.find((b) => b.slug === params.slug) as any;

    if (!blog) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-8 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                        <span className="flex items-center bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                            <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                            {blog.publishedAt}
                        </span>
                        <span className="flex items-center bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
                            <User className="w-4 h-4 mr-2 text-indigo-500" />
                            {blog.author}
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2">
                        {blog.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                            >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Content */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 sm:p-12">
                    <div className="prose prose-indigo dark:prose-invert max-w-none prose-lg prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
                        <ReactMarkdown
                            components={{
                                // Custom link component to handle internal Next.js links if needed, or simple a tags
                                a: ({ ...props }) => <Link href={props.href as string} {...props} className="text-indigo-600 hover:underline font-semibold" />,
                            }}
                        >
                            {blog.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </article>
    );
}
