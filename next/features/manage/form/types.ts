export type MainTextInputHandle = {
    insertText: (before: string, after?: string, placeholder?: string) => void;
};

export interface ArticleFormProps {
    articleId: string;
    title: string;
    summary: string;
    isPublished: boolean;
    mainText: string;
    mainImageUrl: string | null;
}