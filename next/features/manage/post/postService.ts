import { ArticleFormProps } from "../form/types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * 投稿フォームのデータをサーバーへ送信して新しい記事を作成します。
 *
 * サーバーはエンドポイント `POST ${baseUrl}/post` を期待します。
 * レスポンスが OK でない場合はエラーを投げます。
 *
 * @param {ArticleFormProps} article - 投稿する記事のデータ。
 * @returns {Promise<void>} 成功時は何も返しません。
 * @throws {Error} サーバーがエラー応答を返した場合にステータスコードを含むエラーを投げます。
 */
export async function postArticle(article: ArticleFormProps): Promise<void> {
    const res = await fetch(`${baseUrl}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
    });
    if (!res.ok) {
        throw new Error(`投稿に失敗しました: ${res.status}`);
    }
}

/**
 * 既存の記事を更新するためにサーバーへデータを送信します。
 *
 * サーバーはエンドポイント `POST ${baseUrl}/edit` を期待します。
 * レスポンスが OK でない場合はエラーを投げます。
 *
 * @param {ArticleFormProps} article - 更新する記事のデータ（`articleId` を含むこと）。
 * @returns {Promise<void>} 成功時は何も返しません。
 * @throws {Error} サーバーがエラー応答を返した場合にステータスコードを含むエラーを投げます。
 */
export async function editArticle(article: ArticleFormProps): Promise<void> {
    const res = await fetch(`${baseUrl}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
    });
    if (!res.ok) {
        throw new Error(`編集に失敗しました: ${res.status}`);
    }
}
