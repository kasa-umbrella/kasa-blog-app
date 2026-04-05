import Article from '@/features/article/Article';
import { fetchArticle } from '@/features/article/articleService';
import type { Metadata } from 'next';
import { use } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ articleId: string }> }): Promise<Metadata> {
    const { articleId } = await params;
    try {
        const article = await fetchArticle(articleId);
        return {
            title: article.title,
            openGraph: {
                title: article.title,
                type: "article",
                images: article.mainImageUrl ? [{ url: article.mainImageUrl }] : [],
            },
        };
        // summaryが追加されたら description: article.summary も設定する
    } catch {
        return {};
    }
}

const ArticlePage = ({ params }: { params: Promise<{ articleId: string }> }) => {
    const { articleId } = use(params);
    return (
        <Article articleId={articleId} />
    );
};

export default ArticlePage;