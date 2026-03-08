'use client';

import AppHeadTitle from "@/util/components/AppHeadTitle";
import { Box, Button, Stack } from "@mui/material";
import { useRef, useState } from "react";
import TitleInput from "./components/TitleInput";
import MainTextInput from "./components/MainTextInput";
import SummaryInput from "./components/SummeryInput";
import PublishRange from "./components/PublishRange";
import ImageUploadInput from "./components/ImageUploadInput";
import RecentImageList from "./components/RecentImageList";
import { useSnackbar } from "@/util/context/AppSnackbarContext";
import { ArticleFormProps, MainTextInputHandle } from "./types";
import { postArticle, editArticle } from "../post/postService";
import { uploadImage } from "./imageUploadService";

const ArticleForm = ({ title, articleProps }: { title: string, articleProps?: ArticleFormProps }) => {
    const isEditMode = !!articleProps;
    const [article, setArticle] = useState<ArticleFormProps>({
        articleId: articleProps?.articleId ?? "",
        title: articleProps?.title ?? "",
        summary: articleProps?.summary ?? "",
        isPublished: articleProps?.isPublished ?? false,
        mainText: articleProps?.mainText ?? "",
        mainImageUrl: articleProps?.mainImageUrl ?? null,
    });
    const { setErrorMessage } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [imageRefreshKey, setImageRefreshKey] = useState(0);
    const mainTextRef = useRef<MainTextInputHandle>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageUploading(true);
        try {
            const imageUrl = await uploadImage(file);
            setArticle((prev) => ({ ...prev, mainImageUrl: imageUrl }));
            setImageRefreshKey((prev) => prev + 1);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "画像のアップロードに失敗しました");
        } finally {
            setImageUploading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (isEditMode) {
                await editArticle(article);
            } else {
                await postArticle(article);
            }
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "エラーが発生しました");
        } finally {
            setLoading(false);
        }
    };

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
                <RecentImageList onSelect={(url) => mainTextRef.current?.insertText(`![image](${url})`)} refreshKey={imageRefreshKey} />
                <ImageUploadInput onChange={handleImageChange} />
                <MainTextInput
                    ref={mainTextRef}
                    value={article.mainText}
                    onChange={(value) => setArticle((prev) => ({ ...prev, mainText: value }))}
                />
                <Button variant="contained" onClick={handleSubmit} disabled={loading || imageUploading}>
                    {imageUploading ? "画像アップロード中..." : loading ? "送信中..." : isEditMode ? "更新" : "投稿"}
                </Button>
            </Stack>
        </Box>
    );
};

export default ArticleForm;
