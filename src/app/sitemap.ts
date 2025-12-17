import { MetadataRoute } from "next";
import { siteConfig } from "../constants/appConstants";

/**
 * ✅ Production‑ready dynamic sitemap for pdfthings.com
 * Works with Next.js App Router (app/sitemap.ts)
 *
 * What this sitemap includes:
 * - Home page
 * - All PDF tool pages
 * - Ecommerce category + sub‑pages
 * - Blog listing page
 * - All blog detail pages (dynamic)
 * - Static legal pages
 *
 * What it excludes:
 * - Query params
 * - Filters
 * - Temporary / internal routes
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url; // e.g. https://pdfthings.com
  const now = new Date();

  /* ----------------------------
   * 1️⃣ Static core pages
   * ---------------------------- */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /* ----------------------------
   * 2️⃣ PDF tool pages
   * ---------------------------- */
  const toolSlugs = [
    "merge-pdf",
    "split-pdf",
    "crop-pdf",
    "pdf-to-jpg",
    "jpg-to-pdf",
  ];

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  /* ----------------------------
   * 3️⃣ Ecommerce pages
   * ---------------------------- */
  const ecommercePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/ecommerce`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const ecommercePlatforms = ["flipkart", "meesho"];

  const ecommerceSubPages: MetadataRoute.Sitemap = ecommercePlatforms.map(
    (platform) => ({
      url: `${baseUrl}/ecommerce/${platform}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  /* ----------------------------
   * 4️⃣ Blog pages (dynamic)
   * ---------------------------- */
  const blogListingPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  /**
   * 🔹 Replace this with DB / CMS / MD file fetch later
   * Example:
   * const blogSlugs = await getAllBlogSlugs()
   */
  const blogSlugs = [
    "flipkart-auto-crop-sort-labels-one-click",
    "how-to-crop-pdf-pages-without-losing-quality",
    "how-to-merge-pdfs-online-free",
    "meesho-multi-account-label-sorting-by-sku",
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  /* ----------------------------
   * 5️⃣ Final sitemap output
   * ---------------------------- */
  return [
    ...staticPages,
    ...toolPages,
    ...ecommercePages,
    ...ecommerceSubPages,
    ...blogListingPage,
    ...blogPages,
  ];
}
