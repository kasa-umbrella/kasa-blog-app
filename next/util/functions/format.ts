/**
 * ISO 8601文字列をdatetime-local input用の"YYYY-MM-DDTHH:mm"形式に変換する
 */
export function toDatetimeLocal(iso: string): string {
    return iso.slice(0, 16);
}

/**
 * 現在時刻をdatetime-local input用の"YYYY-MM-DDTHH:mm"形式で返す
 */
export function nowDatetimeLocal(): string {
    return toDatetimeLocal(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString());
}

/**
 * 日付を"YYYY-MM-DD"形式にフォーマットする関数
 * @param date - フォーマットする日付（文字列またはDateオブジェクト）
 * @returns フォーマットされた日付文字列、またはエラーメッセージ
 */
export function formatDateTime(date: string | Date): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function formatDate(date: string | Date): string {
    const d: Date = typeof date === 'string' ? new Date(date) : date;

    // 日付オブジェクトが無効な場合の処理
    try {
        if (isNaN(d.getTime())) {
            return "日付が取得できませんでした。";
        }
    } catch {
        return "日付が取得できませんでした。";
    }

    // YYYY-MM-DD形式でフォーマット
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}年${month}月${day}日`;
}
