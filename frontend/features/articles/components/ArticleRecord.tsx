"use client";

import { Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { ArticleRecordProps } from "../types";
import { formatDate } from "@/util/functions/format";
import { Star } from "@mui/icons-material";

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
                <CardMedia
                    height="140"
                    image="/sample.jpg"
                    component="img"
                    alt="Sample image"
                />
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
            <Star sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                color: 'grey.400'
            }} />
        </Card>
    );
};

export default ArticleRecord;