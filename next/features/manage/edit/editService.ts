import { ArticleFormProps } from "../form/types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchArticleForEdit(articleId: string): Promise<ArticleFormProps> {
    const res = await fetch(`${baseUrl}/articles/${articleId}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`記事の取得に失敗しました: ${res.status}`);
    const data = await res.json();
    return {
        articleId: data.articleId,
        title: data.title,
        summary: data.summary,
        limited: data.limited,
        published: data.published,
        content: data.content,
        mainImageUrl: data.mainImageUrl,
    };
}
