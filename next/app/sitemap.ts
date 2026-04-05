import { fetchArticles } from "@/features/articles/articlesService";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kasatata.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            changeFrequency: "daily",
            priority: 1.0,
        },
    ];

    try {
        const { articles: allArticles } = await fetchArticles({ page: 1 });

        const articleRoutes: MetadataRoute.Sitemap = allArticles.map((article) => ({
            url: `${BASE_URL}/article/${article.articleId}`,
            lastModified: article.createdAt,
            changeFrequency: "monthly",
            priority: 0.8,
        }));

        return [...staticRoutes, ...articleRoutes];
    } catch {
        return staticRoutes;
    }
}