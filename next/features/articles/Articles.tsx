import AppHeadTitle from "@/util/components/AppHeadTitle";
import { fetchArticles } from "./articlesService";
import ArticleRecord from "./components/ArticleRecord";
import { Box } from "@mui/material";
import { ArticleRecordProps } from "./types";

const Articles = async ({ header }: { header: string }) => {
    const articles: ArticleRecordProps[] = await fetchArticles();

    return (
        <Box sx={{ mb: 4 }}>
            <AppHeadTitle>
                {header}
            </AppHeadTitle>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 2
            }}>
                {articles.map((article) => (
                    <ArticleRecord key={article.articleId} article={article} />
                ))}
            </Box>
        </Box>
    );
}

export default Articles;