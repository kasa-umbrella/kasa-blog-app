import { CommentInput, CommentListResponse, CommentResponse } from "./types";

export type { CommentInput, CommentListResponse, CommentResponse };

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchCsrfToken(): Promise<string> {
    const res = await fetch(`${baseUrl}/csrf-token`, { credentials: "include" });
    if (!res.ok) throw new Error("CSRFトークンの取得に失敗しました");
    const data = await res.json();
    return data.csrfToken as string;
}

export async function fetchComments(articleId: string, page: number): Promise<CommentListResponse> {
    const res = await fetch(`${baseUrl}/articles/${articleId}/comments?page=${page}`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error("コメントの取得に失敗しました");
    return res.json();
}

export async function postComment(
    articleId: string,
    input: CommentInput,
    csrfToken: string
): Promise<CommentResponse> {
    const res = await fetch(`${baseUrl}/articles/${articleId}/comments`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({ commenterName: input.commenterName, content: input.content }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail ?? "コメントの送信に失敗しました");
    }
    return res.json();
}
