import { ArticleRecordProps } from "./types";

/**
 * 記事一覧を API から取得します。
 *
 * サーバーはエンドポイント `GET ${NEXT_PUBLIC_API_BASE_URL}/articles` を期待します。
 *
 * @returns {Promise<ArticleRecordProps[]>} 記事レコードの配列。
 * @throws {Error} サーバーがエラー応答を返した場合にステータスコードを含むエラーを投げます。
 */
export async function fetchArticles(): Promise<ArticleRecordProps[]> {
    try {
        // APIのベースURLを環境変数から取得
        const baseUrl = process.env.API_INTERNAL_URL;
        const url = `${baseUrl}/articles`;

        // APIから記事一覧を取得
        const res: Response = await fetch(url);
        if (!res.ok) {
            throw new Error(`サーバーとの通信に失敗しました。: ${res.status}`);
        }

        // レスポンスをJSONとしてパース
        const data = await res.json();
        return data as ArticleRecordProps[];
    } catch (error) {
        console.error("記事一覧の取得中にエラーが発生しました:", error);
        throw error;
    }
}