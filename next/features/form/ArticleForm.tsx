'use client';

import AppHeadTitle from "@/util/components/AppHeadTitle";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import TitleInput from "./components/TitleInput";
import MainTextInput from "./components/MainTextInput";
import SummaryInput from "./components/SummeryInput";
import PublishRange from "./components/PublishRange";
import ImageUploadInput from "./components/ImageUploadInput";
import { ArticleFormProps } from "./types";

const ArticleForm = ({ title, articleProps }: { title: string, articleProps?: ArticleFormProps }) => {
    const [article, setArticle] = useState<ArticleFormProps>({
        articleId: articleProps?.articleId ?? "",
        title: articleProps?.title ?? "",
        summary: articleProps?.summary ?? "",
        isPublished: articleProps?.isPublished ?? false,
        mainText: articleProps?.mainText ?? "",
        mainImage: articleProps?.mainImage ?? null,
    });

    return (
        <Box>
            <AppHeadTitle>
                {title}
            </AppHeadTitle>
            <Stack spacing={2}>
                <TitleInput
                    value={article.title}
                    onChange={(e) => setArticle((prev) => ({ ...prev, title: e.target.value }))}
                />
                <SummaryInput
                    value={article.summary}
                    onChange={(e) => setArticle((prev) => ({ ...prev, summary: e.target.value }))}
                />
                <PublishRange
                    value={article.isPublished}
                    onChange={(e) => setArticle((prev) => ({ ...prev, isPublished: e.target.checked }))}
                />
                <ImageUploadInput
                    onChange={(e) =>
                        setArticle((prev) => ({
                            ...prev,
                            mainImage: e.target.files?.[0] ?? null,
                        }))
                    }
                />
                <MainTextInput
                    value={article.mainText}
                    onChange={(e) => setArticle((prev) => ({ ...prev, mainText: e.target.value }))}
                />
                <Button variant="contained">投稿</Button>
            </Stack>
        </Box>
    );
};

export default ArticleForm;