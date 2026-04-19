const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchCsrfToken(): Promise<string> {
    const res = await fetch(`${baseUrl}/csrf-token`, { credentials: "include" });
    if (!res.ok) throw new Error("CSRFトークンの取得に失敗しました");
    const data = await res.json();
    return data.csrfToken as string;
}
