import { ArticleProps } from "./types";

export async function fetchArticle(articleId: string): Promise<ArticleProps> {
    try{
        // APIのベースURLを環境変数から取得
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/article/${articleId}`;

        // APIから記事データを取得
        const res: Response = await fetch(url);        
        if (!res.ok) {
            throw new Error(`サーバーとの通信に失敗しました。: ${res.status}`);
        }
        
        // レスポンスをJSONとしてパース
        const data = await res.json();
        return data as ArticleProps;
    } catch (error) {
        console.error("記事の取得中にエラーが発生しました:", error);
        throw error;
    }
}