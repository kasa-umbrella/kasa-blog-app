import AppHeadTitle from "@/util/components/AppHeadTitle";
import { fetchArticles } from "./articlesService";
import ArticleRecord from "./components/ArticleRecord";
import { Box } from "@mui/material";
import { ArticleSearchParams } from "./types";
import AppEmptyMessage from "@/util/components/AppEmptyMessage";
import ArticleSearchInput from "./components/ArticleSearchInput";
import ArticlesPagination from "./components/ArticlesPagination";

interface ArticlesProps {
    header: string;
    searchParams?: ArticleSearchParams;
}

const Articles = async ({ header, searchParams }: ArticlesProps) => {
    const { articles, total, limit, page } = await fetchArticles(searchParams);
    const totalPages = Math.ceil(total / limit);

    return (
        <Box sx={{ mb: 4 }}>
            <AppHeadTitle>
                {header}
            </AppHeadTitle>
            <ArticleSearchInput keyword={searchParams?.keyword} />
            {articles.length === 0 ? (
                <AppEmptyMessage message="表示できる記事がないにょん" />
            ) : (
                <>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                        gap: 2
                    }}>
                        {articles.map((article) => (
                            <ArticleRecord key={article.articleId} article={article} />
                        ))}
                    </Box>
                    <ArticlesPagination page={page} totalPages={totalPages} keyword={searchParams?.keyword} />
                </>
            )}
        </Box>
    );
}

export default Articles;