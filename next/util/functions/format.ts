/**
 * 日付を"YYYY-MM-DD"形式にフォーマットする関数
 * @param date - フォーマットする日付（文字列またはDateオブジェクト）
 * @returns フォーマットされた日付文字列、またはエラーメッセージ
 */
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

    return `${year}-${month}-${day}`;
}