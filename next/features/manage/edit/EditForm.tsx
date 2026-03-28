'use client';

import ArticleForm from "../form/ArticleForm";
import { ArticleFormProps } from "../form/types";
import { useEffect, useState } from "react";
import { useSnackbar } from "@/util/context/AppSnackbarContext";
import { fetchArticleForEdit } from "./editService";

const EditForm = ({ articleId }: { articleId: string }) => {
    const [articleProps, setArticleProps] = useState<ArticleFormProps | null>(null);
    const { setIsLoading, setErrorMessage } = useSnackbar();

    useEffect(() => {
        const loadArticle = async () => {
            setIsLoading(true);
            try {
                const data = await fetchArticleForEdit(articleId);
                setArticleProps(data);
            } catch (e) {
                setErrorMessage(e instanceof Error ? e.message : "エラーが発生しました");
            } finally {
                setIsLoading(false);
            }
        };
        loadArticle();
    }, [articleId]);

    if (!articleProps) return null;

    return <ArticleForm title="記事編集" articleProps={articleProps} />;
};

export default EditForm;
