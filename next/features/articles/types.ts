//一覧ページの記事データの型定義
export interface ArticleRecordProps {
    articleId: string;
    title: string;
    createdAt: string;
    summary: string;
    mainImageUrl: string;
    limited: boolean;
    published: boolean;
};

//記事の検索条件の型定義
export interface ArticleSearchParams {
    keyword?: string;
    page?: number;
};

//記事一覧APIのレスポンス型定義
export interface ArticleListResponse {
    articles: ArticleRecordProps[];
    total: number;
    page: number;
    limit: number;
};