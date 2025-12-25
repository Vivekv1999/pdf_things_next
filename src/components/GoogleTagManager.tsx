'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

export default function GoogleTagManager() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isFirstLoad = useRef(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.dataLayer) {
            // Skip the first load as the GTM script in layout.tsx handles it
            if (isFirstLoad.current) {
                isFirstLoad.current = false;
                return;
            }

            // Construct the full URL
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

            // Push page view event to GTM dataLayer
            window.dataLayer.push({
                event: 'page_view',
                page_path: url,
                page_title: document.title,
                page_location: window.location.href,
            });

            console.log('GTM Page View:', url); // For debugging
        }
    }, [pathname, searchParams]);

    return null;
}
