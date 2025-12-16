export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    author: string;
    tags: string[];
    image?: string;
}

export const blogs: BlogPost[] = [
    {
        slug: "meesho-multi-account-label-sorting-by-sku",
        title: "Meesho Multi-Account Label Sorting by SKU - Save Hours Daily",
        description: "Manage multiple Meesho seller accounts effortlessly! Automatically sort shipping labels by SKU across all accounts. Free tool with local processing.",
        publishedAt: "2024-12-16",
        author: "PDF Things Team",
        tags: ["Meesho", "SKU Sorting", "Multi-Account", "Ecommerce"],
        image: "/blog/meesho-hero.png"
    },
    {
        slug: "how-to-crop-pdf-pages-without-losing-quality",
        title: "How to Crop PDF Pages Without Losing Quality",
        description: "Learn how to crop PDF pages perfectly without losing quality using our free, secure online tool. Local processing ensures your documents stay private.",
        publishedAt: "2024-12-16",
        author: "PDF Things Team",
        tags: ["Crop PDF", "PDF Editing", "Quality", "Privacy"],
        image: "/blog/how-to-crop-pdf-hero.png"
    },
    {
        slug: "how-to-merge-pdfs-online-free",
        title: "How to Merge PDFs Online for Free - Secure & Private",
        description: "Learn how to combine multiple PDF files into one document instantly using our free, secure, and private online tool. No uploads required!",
        publishedAt: "2024-05-20",
        author: "PDF Things",
        tags: ["Merge PDF", "PDF Tools", "Productivity", "Security"],
        image: "/blog/how-to-merge-pdfs-hero.png"
    }
];
