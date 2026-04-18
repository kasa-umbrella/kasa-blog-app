"use client";

import { Box, Skeleton, Typography } from "@mui/material";
import { formatDateTime } from "@/util/functions/format";
import { CommentResponse } from "../../types";

const CommentItem = ({ comment }: { comment: CommentResponse }) => {
    const date = formatDateTime(comment.createdAt);

    return (
        <Box sx={{ pb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Typography fontWeight="bold">{comment.commenterName}</Typography>
                <Typography color="text.secondary">{date}</Typography>
            </Box>
            <Typography>{comment.content}</Typography>
        </Box>
    );
};

export const CommentItemSkeleton = () => (
    <Box sx={{ pb: 2 }}>
        <Skeleton width={80} sx={{ mb: 0.5 }} />
        <Skeleton width="100%" />
    </Box>
);

export default CommentItem;
