import { ArticleRecordProps } from "./types";

export async function fetchArticles(): Promise<ArticleRecordProps[]> {
    //データフェッチする実装にする予定
    const articles: ArticleRecordProps[] = [
        {
            articleId: '550e8400-e29b-41d4-a716-446655440000',
            title: "サンプル記事タイトル1",
            summery: "これはサンプル記事の要約です。この記事はサンプルデータとして使用されます。",
            createdAt: "2023-10-01T10:00:00Z",
        },
    ];

    return articles;
}