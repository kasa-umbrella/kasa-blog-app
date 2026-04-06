import { AccessLogListResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchAccessLogList(page: number = 1): Promise<AccessLogListResponse> {
    const query = new URLSearchParams({ page: String(page) });
    const res = await fetch(`${baseUrl}/access-log/list?${query.toString()}`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error(`取得に失敗しました: ${res.status}`);
    return res.json();
}
