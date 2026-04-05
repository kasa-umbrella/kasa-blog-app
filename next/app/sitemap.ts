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
        // 全記事を取得するため、まず1件だけ叩いて total を取る
        const first = await fetchArticles({ page: 1 });
        const limit = first.limit;
        const total = first.total;
        const totalPages = Math.ceil(total / limit);

        const pageRequests = Array.from({ length: totalPages - 1 }, (_, i) =>
            fetchArticles({ page: i + 2 })
        );
        const rest = await Promise.all(pageRequests);
        const allArticles = [first, ...rest].flatMap((res) => res.articles);

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