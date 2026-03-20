import AppHeadTitle from "@/util/components/AppHeadTitle";
import { fetchArticles } from "./articlesService";
import ArticleRecord from "./components/ArticleRecord";
import { Box } from "@mui/material";
import { ArticleRecordProps } from "./types";
import AppEmptyMessage from "@/util/components/AppEmptyMessage";

const Articles = async ({ header }: { header: string }) => {
    const articles: ArticleRecordProps[] = await fetchArticles();

    return (
        <Box sx={{ mb: 4 }}>
            <AppHeadTitle>
                {header}
            </AppHeadTitle>
            {articles.length === 0 ? (
                <AppEmptyMessage message="表示できる記事がないにょん" />
            ) : (
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                    gap: 2
                }}>
                    {articles.map((article) => (
                        <ArticleRecord key={article.articleId} article={article} />
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default Articles;