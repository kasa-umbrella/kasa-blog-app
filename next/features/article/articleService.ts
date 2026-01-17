import { ArticleProps } from "./types";

export async function fetchArticle(articleId: string): Promise<ArticleProps> {
    //データフェッチする実装にする予定
    try{
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/article/${articleId}`;

        console.log(url);
        const res: Response = await fetch(url);

        
        if (!res.ok) {
            throw new Error(`サーバーとの通信に失敗しました。: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("APIから取得したJSON:", data);
        return {
            ...data,
            createdAt: new Date(data.created_at)
        } as ArticleProps;
    } catch (error) {
        console.error("記事の取得中にエラーが発生しました:", error);
        throw error;
    }
}