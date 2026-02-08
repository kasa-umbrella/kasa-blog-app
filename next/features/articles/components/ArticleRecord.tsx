"use client";

import { Card, CardActionArea, CardContent, Stack, Typography, Box } from "@mui/material";
import Image from "next/image";
import { ArticleRecordProps } from "../types";
import { formatDate } from "@/util/functions/format";

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

const ArticleSummery = ({ summery }: { summery: string }) => {
    const limit = 45;

    return (
        <Typography fontSize={15}>
            {summery.length > limit ? `${summery.substring(0, limit)}...` : summery}
        </Typography>
    );
};

const ArticleRecord = ({ article }: { article: ArticleRecordProps }) => {
    
    const handleClick = () => {
        window.open(`/article/${article.articleId}`, '_blank');
    };

    return (
        <Card sx={{ height: 300, position: 'relative' }}>
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
                        <ArticleSummery summery={article.summery} />
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ArticleRecord;