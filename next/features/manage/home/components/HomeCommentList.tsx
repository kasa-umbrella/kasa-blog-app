'use client';

import AppHeadTitle from "@/util/components/AppHeadTitle";
import AppTable, { AppTableColumn } from "@/util/components/AppTable";
import AppPagination from "@/util/components/AppPagination";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "@/util/context/AppSnackbarContext";
import { formatDate } from "@/util/functions/format";
import { AdminCommentRecord } from "../types";
import { fetchAdminComments } from "../homeService";

const columns: AppTableColumn<AdminCommentRecord>[] = [
    {
        label: "投稿日",
        width: 110,
        render: (row) => formatDate(row.createdAt),
    },
    {
        label: "記事名",
        render: (row) => row.articleTitle,
    },
    {
        label: "投稿者名",
        width: 120,
        render: (row) => row.commenterName,
    },
    {
        label: "コメント",
        render: (row) => row.content,
    },
];

const HomeCommentList = () => {
    const [comments, setComments] = useState<AdminCommentRecord[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { setIsLoading, setErrorMessage } = useSnackbar();

    useEffect(() => {
        const loadComments = async () => {
            setIsLoading(true);
            try {
                const data = await fetchAdminComments(page);
                setComments(data.comments);
                setTotalPages(Math.ceil(data.total / 10));
            } catch (e) {
                setErrorMessage(e instanceof Error ? e.message : "エラーが発生しました");
            } finally {
                setIsLoading(false);
            }
        };
        loadComments();
    }, [page]);

    return (
        <Box>
            <AppHeadTitle>コメント一覧</AppHeadTitle>
            <AppTable
                columns={columns}
                rows={comments}
                rowKey={(row) => row.id}
            />
            <AppPagination page={page} count={totalPages} onChange={setPage} />
        </Box>
    );
};

export default HomeCommentList;
