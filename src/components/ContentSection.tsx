import { siteConfig } from "@/src/constants/appConstants";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface ContentSectionProps {
    title: string;
    description: string;
    content: React.ReactNode;
    faqs: FAQItem[];
    toolName: string;
    toolPath: string;
}

const ContentSection = ({
    title,
    description,
    content,
    faqs,
    toolName,
    toolPath,
}: ContentSectionProps) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": toolName,
                "description": description,
                "operatingSystem": "Any",
                "applicationCategory": "Utilities",
                "url": `${siteConfig.url}${toolPath}`,
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                },
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqs.map((faq) => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer,
                    },
                })),
            },
        ],
    };

    return (
        <div className="mt-16 w-full max-w-4xl mx-auto space-y-12">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Long Descriptive Content */}
            <section className="prose prose-indigo dark:prose-invert max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    {title}
                </h2>
                <div className="text-gray-600 dark:text-gray-300 space-y-4 text-lg leading-relaxed">
                    {content}
                </div>
            </section>

            {/* FAQs */}
            <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                        >
                            <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors list-none select-none">
                                <span>{faq.question}</span>
                                <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="px-6 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ContentSection;
