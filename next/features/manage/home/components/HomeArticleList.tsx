'use client';

import AppHeadTitle from "@/util/components/AppHeadTitle";
import { Box, Button, CircularProgress, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArticleRecordProps } from "@/features/articles/types";
import { formatDate } from "@/util/functions/format";

const HomeArticleList = () => {
    const [articles, setArticles] = useState<ArticleRecordProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const res = await fetch(`${baseUrl}/articles`);
                if (!res.ok) throw new Error(`取得に失敗しました: ${res.status}`);
                const data = await res.json();
                setArticles(data);
            } catch (e) {
                setError(e instanceof Error ? e.message : "エラーが発生しました");
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    return (
        <Box>
            <AppHeadTitle>記事一覧</AppHeadTitle>
            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <CircularProgress />
                </Box>
            )}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>タイトル</TableCell>
                            <TableCell>作成日</TableCell>
                            <TableCell align="right">操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articles.map((article) => (
                            <TableRow key={article.articleId}>
                                <TableCell>{article.title}</TableCell>
                                <TableCell>{formatDate(article.createdAt)}</TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            component={Link}
                                            href={`/manage/edit/${article.articleId}`}
                                        >
                                            編集
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Box>
    );
};

export default HomeArticleList;
