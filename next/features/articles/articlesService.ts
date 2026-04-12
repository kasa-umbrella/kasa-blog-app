import { ArticleListResponse, ArticleSearchParams } from "./types";

export async function fetchArticles(params: ArticleSearchParams = {}): Promise<ArticleListResponse> {
    try {
        const baseUrl = process.env.API_INTERNAL_URL;
        const sortByMap: Record<string, string> = {
            publishedAt: "published_at",
            pvCount: "pv_count",
        };
        const query = new URLSearchParams({ limited: "false" });
        if (params.keyword) query.set("keyword", params.keyword);
        if (params.page) query.set("page", String(params.page));
        if (params.limit) query.set("limit", String(params.limit));
        if (params.sortBy) query.set("sort_by", sortByMap[params.sortBy]);
        const url = `${baseUrl}/articles?${query.toString()}`;

        const res: Response = await fetch(url);
        if (!res.ok) {
            throw new Error(`サーバーとの通信に失敗しました。: ${res.status}`);
        }

        return await res.json() as ArticleListResponse;
    } catch (error) {
        console.error("記事一覧の取得中にエラーが発生しました:", error);
        throw error;
    }
}