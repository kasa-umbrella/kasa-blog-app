'use client';

import AppHeadTitle from "@/util/components/AppHeadTitle";
import { Box, Button, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import TitleInput from "./components/TitleInput";
import MainTextInput from "./components/MainTextInput";
import SummaryInput from "./components/SummaryInput";
import LimitedSelect from "./components/LimitedSelect";
import PublishSelect from "./components/PublishSelect";
import PublishedAtInput from "./components/PublishedAtInput";
import ImageUploadInput from "./components/ImageUploadInput";
import RecentImageList from "./components/RecentImageList";
import MainImagePreview from "./components/MainImagePreview";
import { useSnackbar } from "@/util/context/AppSnackbarContext";
import { useRouter } from "next/navigation";
import { ArticleFormProps, MainTextInputHandle } from "./types";
import { postArticle, editArticle } from "../post/postService";
import { uploadImage } from "./imageUploadService";
import { toDatetimeLocal, nowDatetimeLocal } from "@/util/functions/format";
import { ARTICLE_TITLE_MAX_LENGTH, ARTICLE_SUMMARY_MAX_LENGTH } from "@/util/const";

const ArticleForm = ({ title, articleProps }: { title: string, articleProps?: ArticleFormProps }) => {
    const isEditMode = !!articleProps;
    const [article, setArticle] = useState<ArticleFormProps>({
        articleId: articleProps?.articleId ?? "",
        title: articleProps?.title ?? "",
        summary: articleProps?.summary ?? "",
        limited: articleProps?.limited ?? false,
        published: articleProps?.published ?? false,
        content: articleProps?.content ?? "",
        mainImageUrl: articleProps?.mainImageUrl ?? null,
        publishedAt: articleProps?.publishedAt ? toDatetimeLocal(articleProps.publishedAt) : nowDatetimeLocal(),
    });
    const { setErrorMessage, setSuccessMessage } = useSnackbar();
    const router = useRouter();
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
        else if (article.title.length > ARTICLE_TITLE_MAX_LENGTH) errors.push(`タイトルは${ARTICLE_TITLE_MAX_LENGTH}字以内で入力してください`);
        if (!article.summary) errors.push("概要は必須です");
        else if (article.summary.length > ARTICLE_SUMMARY_MAX_LENGTH) errors.push(`概要は${ARTICLE_SUMMARY_MAX_LENGTH}字以内で入力してください`);
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
                setSuccessMessage("記事を更新しました");
            } else {
                await postArticle(article);
                setSuccessMessage("記事を投稿しました");
                router.push("/manage");
            }
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "エラーが発生しました");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitRef = useRef(handleSubmit);
    useEffect(() => {
        handleSubmitRef.current = handleSubmit;
    });

    useEffect(() => {
        if (!isEditMode) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSubmitRef.current();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isEditMode]);

    return (
        <Box>
            <AppHeadTitle>
                {title}
            </AppHeadTitle>
            <Stack spacing={2}>
                <PublishedAtInput
                    value={article.publishedAt}
                    onChange={(e) => setArticle((prev) => ({ ...prev, publishedAt: e.target.value }))}
                />
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
                <LimitedSelect
                    value={article.limited}
                    onChange={(e) => setArticle((prev) => ({ ...prev, limited: e.target.checked }))}
                />
                <MainTextInput
                    ref={mainTextRef}
                    value={article.content}
                    onChange={(value) => setArticle((prev) => ({ ...prev, content: value }))}
                />
                <PublishSelect
                    value={article.published}
                    onChange={(value) => setArticle((prev) => ({ ...prev, published: value }))}
                />
                <Button variant="contained" onClick={handleSubmit} disabled={loading || imageUploading}>
                    {imageUploading ? "画像アップロード中..." : loading ? "送信中..." : isEditMode ? "更新" : "投稿"}
                </Button>
            </Stack>
        </Box>
    );
};

export default ArticleForm;
