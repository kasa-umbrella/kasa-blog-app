export interface DailyAccessCount {
    date: string;
    count: number;
}

export interface WeeklyAccessResponse {
    data: DailyAccessCount[];
}
