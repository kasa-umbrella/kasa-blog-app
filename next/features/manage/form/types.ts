export interface ArticleFormProps {
    articleId: string;
    title: string;
    summary: string;
    isPublished: boolean;
    mainText: string;
    mainImage: File | null;
}