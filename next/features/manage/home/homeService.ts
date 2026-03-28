import { ArticleRecordProps } from "@/features/articles/types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchArticles(): Promise<ArticleRecordProps[]> {
    const res = await fetch(`${baseUrl}/articles`);
    if (!res.ok) throw new Error(`取得に失敗しました: ${res.status}`);
    return res.json();
}

export const logout = async (): Promise<void> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${baseUrl}/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("ログアウトに失敗しました。");
    }
};
