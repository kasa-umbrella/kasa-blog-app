import { LoginFormData, LoginResponse } from "./types";

/**
 * ログイン情報をサーバーへ送信して認証を行います。
 *
 * サーバーはエンドポイント `POST ${NEXT_PUBLIC_API_BASE_URL}/api/login` を期待します。
 * Cookie ベースのセッション管理を利用するため `credentials: "include"` で送信します。
 *
 * @param {LoginFormData} loginFormData - ログイン ID とパスワードを含むフォームデータ。
 * @returns {Promise<LoginResponse>} 認証トークンを含むレスポンス。
 * @throws {Error} 認証に失敗した場合にステータスコードとエラー本文を含むエラーを投げます。
 */
export const login = async (loginFormData: LoginFormData): Promise<LoginResponse> => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		const url = `${baseUrl}/api/login`;

		const res: Response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(loginFormData),
		});

		if (!res.ok) {
			const errorText = await res.text();
			throw new Error(`ログインに失敗しました。: ${res.status} ${errorText}`);
		}

		const data = (await res.json()) as LoginResponse;
		return data;
	} catch (error) {
		console.error("ログイン中にエラーが発生しました:", error);
		throw error;
	}
}

/**
 * 現在のセッションが有効かどうかをサーバーに問い合わせて確認します。
 *
 * サーバーはエンドポイント `GET ${NEXT_PUBLIC_API_BASE_URL}/api/auth` を期待します。
 * 通信エラーや認証切れの場合は例外を投げず `false` を返します。
 *
 * @returns {Promise<boolean>} 認証済みなら `true`、それ以外は `false`。
 */
export const verifyAuth = async (): Promise<boolean> => {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		const url = `${baseUrl}/api/auth`;

		const res: Response = await fetch(url, {
			method: "GET",
			credentials: "include",
		});

		if (!res.ok) {
			return false;
		}

		return true;
	} catch (error) {
		console.error("認証確認中にエラーが発生しました:", error);
		return false;
	}
}