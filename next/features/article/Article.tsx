import ArticleBody from "./components/ArticleBody";
import ArticleDate from "./components/ArticleDate";
import ArticleTitle from "./components/ArticleTitle";
import { fetchArticle } from "./articleService";
import { ArticleProps } from "./types";
import MainImage from "./components/MainImage";
import RecommendedArticles from "./components/RecommendedArticles";
import AccessLogTracker from "./components/AccessLogTracker";
import { Stack } from "@mui/material";

const Article = async ({ articleId }: { articleId: string }) => {
    let article: ArticleProps;

    try {
        article = await fetchArticle(articleId);
    } catch (error) {
        console.error("記事コンポーネントでのエラー:", error);
        return (
            <div>記事の取得中にエラーが発生しました。</div>
        );
    }

    return (
        <Stack spacing={2.5}>
            <AccessLogTracker articleId={articleId} />
            <MainImage imageUrl={article.mainImageUrl} alt={article.title} />
            <Stack spacing={0.5}>
                <ArticleTitle title={article.title} />
                <ArticleDate date={article.createdAt} />
            </Stack>
            <ArticleBody body={article.content} />
            <RecommendedArticles />
        </Stack>
    );
};

export default Article;