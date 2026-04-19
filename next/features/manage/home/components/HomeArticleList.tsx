'use client';

import AppHeadTitle from "@/util/components/AppHeadTitle";
import AppTable, { AppTableColumn } from "@/util/components/AppTable";
import { Box, Button } from "@mui/material";
import AppPagination from "@/util/components/AppPagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArticleRecordProps } from "@/features/articles/types";
import { formatDate } from "@/util/functions/format";
import { useSnackbar } from "@/util/context/AppSnackbarContext";
import { fetchArticles } from "../homeService";

const columns: AppTableColumn<ArticleRecordProps>[] = [
    {
        label: "公開日",
        width: 110,
        render: (row) => formatDate(row.publishedAt),
    },
    {
        label: "タイトル",
        render: (row) => (
            <Link href={`/article/${row.articleId}`} target="_blank" rel="noopener noreferrer">
                {row.title}
            </Link>
        ),
    },
    {
        label: "公開",
        width: 80,
        render: (row) => row.published ? "○" : "-",
    },
    {
        label: "限定公開",
        width: 80,
        render: (row) => row.limited ? "○" : "-",
    },
    {
        label: "PV数",
        width: 80,
        render: (row) => row.pvCount,
    },
    {
        label: "操作",
        width: 80,
        render: (row) => (
            <Button
                variant="contained"
                size="small"
                component={Link}
                href={`/manage/edit/${row.articleId}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                編集
            </Button>
        ),
    },
];

const HomeArticleList = () => {
    const [articles, setArticles] = useState<ArticleRecordProps[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { setIsLoading, setErrorMessage } = useSnackbar();

    useEffect(() => {
        const loadArticles = async () => {
            setIsLoading(true);
            try {
                const data = await fetchArticles(page);
                setArticles(data.articles);
                setTotalPages(Math.ceil(data.total / data.limit));
            } catch (e) {
                setErrorMessage(e instanceof Error ? e.message : "エラーが発生しました");
            } finally {
                setIsLoading(false);
            }
        };
        loadArticles();
    }, [page]);

    return (
        <Box>
            <AppHeadTitle>記事一覧</AppHeadTitle>
            <AppTable
                columns={columns}
                rows={articles}
                rowKey={(row) => row.articleId}
            />
            <AppPagination page={page} count={totalPages} onChange={setPage} />
        </Box>
    );
};

export default HomeArticleList;
