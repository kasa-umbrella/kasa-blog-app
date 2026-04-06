export interface AccessLogRecord {
    id: string;
    createdAt: string;
    articleTitle: string | null;
    ipAddress: string;
    userAgent: string | null;
}

export interface AccessLogListResponse {
    data: AccessLogRecord[];
    total: number;
    page: number;
    totalPages: number;
}
