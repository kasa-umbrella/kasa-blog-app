import Article from '@/features/article/Article';
import { use } from 'react';

const ArticlePage = ({ params }: { params: Promise<{ articleId: string }> }) => {
    const { articleId } = use(params);
    return (
        <Article articleId={articleId} />
    );
};

export default ArticlePage;