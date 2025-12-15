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
        slug: "how-to-merge-pdfs-online-free",
        title: "How to Merge PDFs Online for Free - Secure & Private",
        description: "Learn how to combine multiple PDF files into one document instantly using our free, secure, and private online tool. No uploads required!",
        publishedAt: "2024-05-20",
        author: "PDF Things",
        tags: ["Merge PDF", "PDF Tools", "Productivity", "Security"],
        image: "/blog/how-to-merge-pdfs-hero.png"
    }
];
