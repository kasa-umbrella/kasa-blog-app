import { ArticleListResponse } from "@/features/articles/types";
import { WeeklyAccessResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchArticles(page: number = 1): Promise<ArticleListResponse> {
    const query = new URLSearchParams({ page: String(page) });
    const res = await fetch(`${baseUrl}/articles?${query.toString()}`, { credentials: "include" });
    if (!res.ok) throw new Error(`取得に失敗しました: ${res.status}`);
    return res.json();
}

export async function fetchWeeklyAccess(): Promise<WeeklyAccessResponse> {
    const res = await fetch(`${baseUrl}/access-log/weekly`, { credentials: "include" });
    if (!res.ok) throw new Error(`取得に失敗しました: ${res.status}`);
    return res.json();
}

export async function downloadDump(): Promise<void> {
    const res = await fetch(`${baseUrl}/dump`, { credentials: "include" });
    if (!res.ok) throw new Error(`ダンプの取得に失敗しました: ${res.status}`);

    const blob = await res.blob();
    const disposition = res.headers.get("Content-Disposition") ?? "";
    const match = disposition.match(/filename=(.+)$/);
    const filename = match ? match[1] : "dump.sql";

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
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
