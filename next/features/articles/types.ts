//一覧ページの記事データの型定義
export interface ArticleRecordProps {
    articleId: string;
    title: string;
    publishedAt: string;
    summary: string;
    mainImageUrl: string;
    limited: boolean;
    published: boolean;
    pvCount: number;
};

//記事の検索条件の型定義
export interface ArticleSearchParams {
    keyword?: string;
    page?: number;
    limit?: number;
    sortBy?: "publishedAt" | "pvCount";
};

//記事一覧APIのレスポンス型定義
export interface ArticleListResponse {
    articles: ArticleRecordProps[];
    total: number;
    page: number;
    limit: number;
};