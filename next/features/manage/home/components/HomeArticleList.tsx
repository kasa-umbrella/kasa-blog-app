'use client';

import AppHeadTitle from "@/util/components/AppHeadTitle";
import AppTable, { AppTableColumn } from "@/util/components/AppTable";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArticleRecordProps } from "@/features/articles/types";
import { formatDate } from "@/util/functions/format";
import { useSnackbar } from "@/util/context/AppSnackbarContext";
import { fetchArticles } from "../homeService";

const columns: AppTableColumn<ArticleRecordProps>[] = [
    {
        label: "作成日",
        shrink: true,
        render: (row) => formatDate(row.createdAt),
    },
    {
        label: "タイトル",
        render: (row) => (
            <Link href={`/article/${row.articleId}`} target="_blank">
                {row.title}
            </Link>
        ),
    },
    {
        label: "公開",
        shrink: true,
        render: (row) => row.published ? "○" : "-",
    },
    {
        label: "限定公開",
        shrink: true,
        render: (row) => row.limited ? "○" : "-",
    },
    {
        label: "PV数",
        render: () => "-",
    },
    {
        label: "操作",
        shrink: true,
        render: (row) => (
            <Button
                variant="contained"
                size="small"
                component={Link}
                href={`/manage/edit/${row.articleId}`}
                target="_blank"
            >
                編集
            </Button>
        ),
    },
];

const HomeArticleList = () => {
    const [articles, setArticles] = useState<ArticleRecordProps[]>([]);
    const { setIsLoading, setErrorMessage } = useSnackbar();

    useEffect(() => {
        const loadArticles = async () => {
            setIsLoading(true);
            try {
                const data = await fetchArticles();
                setArticles(data);
            } catch (e) {
                setErrorMessage(e instanceof Error ? e.message : "エラーが発生しました");
            } finally {
                setIsLoading(false);
            }
        };
        loadArticles();
    }, []);

    return (
        <Box>
            <AppHeadTitle>記事一覧</AppHeadTitle>
            <AppTable
                columns={columns}
                rows={articles}
                rowKey={(row) => row.articleId}
            />
        </Box>
    );
};

export default HomeArticleList;
