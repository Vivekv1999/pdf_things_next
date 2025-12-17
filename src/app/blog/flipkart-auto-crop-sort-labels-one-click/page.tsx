import type { Metadata } from 'next'
import FlipkartBlogClient from './FlipkartBlogClient'

export const metadata: Metadata = {
    title: 'Flipkart Label Auto-Crop & SKU Sort - One-Click Solution for Sellers | PDF Things',
    description: 'Automatically crop Flipkart shipping labels and sort by SKU across multiple seller accounts with one click. Save 20-30 minutes per batch! Free online tool.',
    keywords: ['Flipkart label crop', 'Flipkart SKU sort', 'Flipkart label sorter', 'Flipkart multi account label', 'Flipkart shipping label crop'],
    authors: [{ name: 'PDF Things Team' }],
    openGraph: {
        title: 'Flipkart Label Auto-Crop & SKU Sort - One-Click Solution',
        description: 'Automatically crop, merge, and sort Flipkart shipping labels from multiple accounts in one click.',
        url: 'https://pdfthings.com/blog/flipkart-auto-crop-sort-labels-one-click',
        siteName: 'PDF Things',
        images: [
            {
                url: '/blog/flipkart-hero.png',
                width: 1200,
                height: 630,
            }
        ],
        type: 'article',
        publishedTime: '2025-12-17',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Flipkart Label Auto-Crop & SKU Sort - One-Click Solution',
        description: 'Automatically crop, merge, and sort Flipkart shipping labels from multiple accounts in one click.',
        images: ['/blog/flipkart-hero.png'],
    }
}

export default function Page() {
    return <FlipkartBlogClient />
}
