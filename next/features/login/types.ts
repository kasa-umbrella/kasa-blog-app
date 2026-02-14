/** ログイン API のリクエスト型。 */
export interface LoginFormData {
    loginId: string;
    password: string;
}

/** ログイン API のレスポンス型。 */
export interface LoginResponse {
	token?: string;
	accessToken?: string;
	refreshToken?: string;
	[key: string]: unknown;
}