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
import MainImagePreview from "./components/MainImagePreview";
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
        limited: articleProps?.limited ?? false,
        content: articleProps?.content ?? "",
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
            await uploadImage(file);
            setImageRefreshKey((prev) => prev + 1);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "画像のアップロードに失敗しました");
        } finally {
            setImageUploading(false);
        }
    };

    const validate = (): string[] => {
        const errors: string[] = [];
        if (!article.title) errors.push("タイトルは必須です");
        else if (article.title.length > 15) errors.push("タイトルは15字以内で入力してください");
        if (!article.summary) errors.push("概要は必須です");
        else if (article.summary.length > 100) errors.push("概要は100字以内で入力してください");
        if (!article.mainImageUrl) errors.push("メイン画像は必須です");
        if (!article.content) errors.push("本文は必須です");
        return errors;
    };

    const handleSubmit = async () => {
        const errors = validate();
        if (errors.length > 0) {
            setErrorMessage(errors.join("\n"));
            return;
        }
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
                <RecentImageList
                    onSelect={(url) => mainTextRef.current?.insertText(`![image](${url})`)}
                    onSelectAsMain={(url) => setArticle((prev) => ({ ...prev, mainImageUrl: url }))}
                    refreshKey={imageRefreshKey}
                />
                <MainImagePreview mainImageUrl={article.mainImageUrl} />
                <ImageUploadInput onChange={handleImageChange} />
                <PublishRange
                    value={article.limited}
                    onChange={(e) => setArticle((prev) => ({ ...prev, limited: e.target.checked }))}
                />
                <MainTextInput
                    ref={mainTextRef}
                    value={article.content}
                    onChange={(value) => setArticle((prev) => ({ ...prev, content: value }))}
                />
                <Button variant="contained" onClick={handleSubmit} disabled={loading || imageUploading}>
                    {imageUploading ? "画像アップロード中..." : loading ? "送信中..." : isEditMode ? "更新" : "投稿"}
                </Button>
            </Stack>
        </Box>
    );
};

export default ArticleForm;
