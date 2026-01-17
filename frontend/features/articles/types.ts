//一覧ページの記事データの型定義
export interface ArticleRecordProps {
    articleId: string;
    title: string;
    createdAt: string;
    summery: string;
};

//記事の検索条件の型定義
export interface ArticleSearchParams {
    keyword?: string;
    pageNumber?: number; 
};