import { fetchArticles } from "@/features/articles/articlesService";
import ArticleRecord from "@/features/articles/components/ArticleRecord";
import AppHeadTitle from "@/util/components/AppHeadTitle";
import { RECOMMENDED_ARTICLES_LIMIT } from "@/util/const";
import { Box } from "@mui/material";

const RecommendedArticles = async () => {
    const { articles } = await fetchArticles({ sortBy: "pvCount", limit: RECOMMENDED_ARTICLES_LIMIT });
    const recommended = articles;

    if (recommended.length === 0) return null;

    return (
        <Box sx={{ mt: 4 }}>
            <AppHeadTitle>おすすめ記事</AppHeadTitle>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 2
            }}>
                {recommended.map((article) => (
                    <ArticleRecord key={article.articleId} article={article} />
                ))}
            </Box>
        </Box>
    );
};

export default RecommendedArticles;
