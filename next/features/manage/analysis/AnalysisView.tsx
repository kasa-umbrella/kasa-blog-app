'use client';

import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AppHeadTitle from "@/util/components/AppHeadTitle";
import AppTable, { AppTableColumn } from "@/util/components/AppTable";
import AppPagination from "@/util/components/AppPagination";
import AppFetchFailed from "@/util/components/AppFetchFailed";
import { fetchAccessLogList } from "./analysisService";
import { AccessLogRecord, AccessLogListResponse } from "./types";

const columns: AppTableColumn<AccessLogRecord>[] = [
    {
        label: "日時",
        width: 100,
        render: (row) => {
            const [date, time] = row.createdAt.split(" ");
            return (
                <Box>
                    <Typography variant="body2">{date}</Typography>
                    <Typography variant="body2">{time}</Typography>
                </Box>
            );
        },
    },
    {
        label: "記事タイトル",
        render: (row) => row.articleTitle ?? <Typography variant="body2" color="text.disabled">-</Typography>,
    },
    {
        label: "IPアドレス",
        width: 140,
        render: (row) => row.ipAddress,
    },
    {
        label: "ユーザーエージェント",
        render: (row) => (
            <Typography variant="body2" sx={{ maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {row.userAgent ?? "-"}
            </Typography>
        ),
    },
];

const AnalysisView = () => {
    const [data, setData] = useState<AccessLogListResponse | null>(null);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
        fetchAccessLogList(page)
            .then(setData)
            .catch(() => setError(true));
    }, [page]);

    if (error) return <AppFetchFailed />;

    return (
        <Stack spacing={3}>
            <Box>
                <AppHeadTitle>アクセスログ</AppHeadTitle>
                {data && (
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                        全 {data.total} 件
                    </Typography>
                )}
            </Box>
            {data && (
                <>
                    <AppTable
                        columns={columns}
                        rows={data.data}
                        rowKey={(row) => row.id}
                        minWidth={868}
                    />
                    <AppPagination
                        page={page}
                        count={data.totalPages}
                        onChange={setPage}
                    />
                </>
            )}
        </Stack>
    );
};

export default AnalysisView;
