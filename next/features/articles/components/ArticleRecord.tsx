"use client";

import { Card, CardActionArea, CardContent, Stack, Typography, Box } from "@mui/material";
import Image from "next/image";
import { ArticleRecordProps } from "../types";
import { formatDate, isWithin24Hours } from "@/util/functions/format";
import FiberNewIcon from "@mui/icons-material/FiberNew";

const ArticleTitle = ({ title }: { title: string }) => (
    <Typography fontSize={15} fontWeight="bold">
        {title}
    </Typography>
);

const ArticleDate = ({ date }: { date: string }) => (
    <Typography color="text.secondary" fontSize={15}>
        {formatDate(date)}
    </Typography>
);

const ArticleSummery = ({ summary }: { summary: string }) => {
    const limit = 45;

    return (
        <Typography fontSize={15}>
            {summary.length > limit ? `${summary.substring(0, limit)}...` : summary}
        </Typography>
    );
};

const ArticleRecord = ({ article }: { article: ArticleRecordProps }) => {
    
    const handleClick = () => {
        window.open(`/article/${article.articleId}`, '_blank');
    };

    const isNew = isWithin24Hours(article.createdAt);

    return (
        <Card sx={{ height: 300, position: 'relative' }}>
            {isNew && (
                <FiberNewIcon
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, fontSize: 36, color: 'primary.dark' }}
                />
            )}
            <CardActionArea onClick={handleClick}>
                <Box sx={{ position: 'relative', width: '100%', height: 160 }}>
                    <Image
                        src={article.mainImageUrl}
                        alt={article.title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </Box>
                <CardContent
                    sx={{ height: 160, overflow: 'hidden' }}
                >
                    <Stack spacing={0.5}>
                        <ArticleTitle title={article.title} />
                        <ArticleDate date={article.createdAt} />
                        <ArticleSummery summary={article.summary} />
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ArticleRecord;