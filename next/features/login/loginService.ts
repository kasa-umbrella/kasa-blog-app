import { LoginFormData } from "./types";

export interface LoginResponse {
	token?: string;
	accessToken?: string;
	refreshToken?: string;
	[key: string]: unknown;
}

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