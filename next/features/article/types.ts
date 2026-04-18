export interface ArticleProps {
    articleId: string | "";
    title: string | "";
    summary: string | "";
    mainImageUrl: string | "";
    publishedAt: string | "";
    content: string | "";
}

export interface CommentResponse {
    id: string;
    articleId: string;
    commenterName: string;
    content: string;
    createdAt: string;
}

export interface CommentListResponse {
    comments: CommentResponse[];
    total: number;
    page: number;
    hasNext: boolean;
}

export interface CommentInput {
    commenterName: string;
    content: string;
}

export interface CommentFormData {
    commenterName: string;
    content: string;
}