"use client";

import { Box, Button, CircularProgress, Stack } from "@mui/material";
import AppEmptyMessage from "@/util/components/AppEmptyMessage";
import AppHeadTitle from "@/util/components/AppHeadTitle";
import { useEffect, useState } from "react";
import { fetchComments } from "../../commentService";
import { CommentResponse } from "../../types";
import CommentForm from "./CommentForm";
import CommentItem, { CommentItemSkeleton } from "./CommentItem";

const CommentList = ({ articleId }: { articleId: string }) => {
    const [comments, setComments] = useState<CommentResponse[]>([]);
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        fetchComments(articleId, 1).then((data) => {
            setComments(data.comments);
            setHasNext(data.hasNext);
            setLoading(false);
        });
    }, [articleId]);

    const handleLoadMore = async () => {
        setLoadingMore(true);
        const nextPage = page + 1;
        const data = await fetchComments(articleId, nextPage);
        setComments((prev) => [...prev, ...data.comments]);
        setHasNext(data.hasNext);
        setPage(nextPage);
        setLoadingMore(false);
    };

    const handleSubmitted = (comment: CommentResponse) => {
        setComments((prev) => [comment, ...prev]);
    };

    return (
        <Box>
            <AppHeadTitle>コメント</AppHeadTitle>
            <Stack spacing={2}>
                {loading ? (
                    <Stack spacing={2}>
                        {[...Array(3)].map((_, i) => (
                            <CommentItemSkeleton key={i} />
                        ))}
                    </Stack>
                ) : comments.length === 0 ? (
                    <AppEmptyMessage message="まだコメントはありません" />
                ) : (
                    <Stack spacing={1}>
                        {comments.map((c) => (
                            <CommentItem key={c.id} comment={c} />
                        ))}
                    </Stack>
                )}
                {hasNext && (
                    <Button onClick={handleLoadMore} disabled={loadingMore}>
                        {loadingMore ? <CircularProgress size={20} /> : "もっと見る"}
                    </Button>
                )}
                <Box sx={{ mt: 2 }}>
                    <CommentForm articleId={articleId} onSubmitted={handleSubmitted} />
                </Box>
            </Stack>
        </Box>
    );
};

export default CommentList;
