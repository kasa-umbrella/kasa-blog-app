export interface DailyAccessCount {
    date: string;
    count: number;
}

export interface WeeklyAccessResponse {
    data: DailyAccessCount[];
}

export interface AdminCommentRecord {
    id: string;
    articleId: string;
    articleTitle: string;
    commenterName: string;
    content: string;
    ipAddress: string | null;
    createdAt: string;
}

export interface AdminCommentListResponse {
    comments: AdminCommentRecord[];
    total: number;
    page: number;
    hasNext: boolean;
}
