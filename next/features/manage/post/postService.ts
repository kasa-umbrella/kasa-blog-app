import { ArticleFormProps } from "../form/types";
import { fetchCsrfToken } from "@/util/functions/csrf";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function postArticle(article: ArticleFormProps): Promise<void> {
    const csrfToken = await fetchCsrfToken();
    const res = await fetch(`${baseUrl}/articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-csrf-token": csrfToken },
        credentials: "include",
        body: JSON.stringify(article),
    });
    if (!res.ok) {
        throw new Error(`投稿に失敗しました: ${res.status}`);
    }
}

export async function editArticle(article: ArticleFormProps): Promise<void> {
    const csrfToken = await fetchCsrfToken();
    const res = await fetch(`${baseUrl}/articles/${article.articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-csrf-token": csrfToken },
        credentials: "include",
        body: JSON.stringify(article),
    });
    if (!res.ok) {
        throw new Error(`編集に失敗しました: ${res.status}`);
    }
}
