import type { Metadata } from 'next'
import MeeshoBlogClient from './MeeshoBlogClient'

export const metadata: Metadata = {
    title: 'Meesho Multi-Account Label Sorting by SKU - Save Hours Daily | PDF Things',
    description: 'Learn how to manage multiple Meesho seller accounts and automatically sort shipping labels by SKU. Free tool to save 15-20 minutes per batch.',
    keywords: ['Meesho label sorter', 'Meesho SKU sort', 'Meesho multi account', 'Meesho label manager', 'Meesho shipping automation'],
    authors: [{ name: 'PDF Things Team' }],
    openGraph: {
        title: 'Meesho Multi-Account Label Sorting by SKU - Save Hours Daily',
        description: 'Learn how to manage multiple Meesho seller accounts and automatically sort shipping labels by SKU.',
        url: 'https://pdfthings.com/blog/meesho-multi-account-label-sorting-by-sku',
        siteName: 'PDF Things',
        images: [
            {
                url: '/blog/meesho-hero.png',
                width: 1200,
                height: 630,
            }
        ],
        type: 'article',
        publishedTime: '2025-12-16',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Meesho Multi-Account Label Sorting by SKU - Save Hours Daily',
        description: 'Learn how to manage multiple Meesho seller accounts and automatically sort shipping labels by SKU.',
        images: ['/blog/meesho-hero.png'],
    }
}

export default function Page() {
    return <MeeshoBlogClient />
}
