const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${baseUrl}/image`, {
        method: "POST",
        credentials: "include",
        body: formData,
    });

    if (!res.ok) {
        throw new Error(`画像のアップロードに失敗しました: ${res.status}`);
    }

    const data = await res.json() as { imageUrl: string };
    return data.imageUrl;
}

export async function fetchRecentImageUrls(): Promise<string[]> {
    const res = await fetch(`${baseUrl}/images/recent`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error(`画像一覧の取得に失敗しました: ${res.status}`);
    }

    const data = await res.json() as { keys: string[] };
    const s3BaseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
    return data.keys.map((key) => `${s3BaseUrl}/${key}`);
}
