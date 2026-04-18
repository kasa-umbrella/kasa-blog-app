import ArticleBody from "./components/ArticleBody";
import ArticleDate from "./components/ArticleDate";
import ArticleTitle from "./components/ArticleTitle";
import { fetchArticle } from "./articleService";
import { ArticleProps } from "./types";
import MainImage from "./components/MainImage";
import RecommendedArticles from "./components/RecommendedArticles";
import AccessLogTracker from "./components/AccessLogTracker";
import AppBreadcrumbs from "@/util/components/AppBreadcrumbs";
import { Stack } from "@mui/material";
import { notFound } from "next/navigation";
import { HTTP_STATUS, SITE_AUTHOR } from "@/util/const";
import JsonLd from "@/util/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kasatata.com";

const Article = async ({ articleId }: { articleId: string }) => {
    let article: ArticleProps;

    try {
        article = await fetchArticle(articleId);
    } catch (error) {
        if ((error as any).status === HTTP_STATUS.NOT_FOUND) notFound();
        console.error("記事コンポーネントでのエラー:", error);
        return (
            <div>記事の取得中にエラーが発生しました。</div>
        );
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        datePublished: article.publishedAt,
        image: article.mainImageUrl || undefined,
        url: `${BASE_URL}/article/${articleId}`,
        author: {
            "@type": "Person",
            name: SITE_AUTHOR,
        },
        publisher: {
            "@type": "Person",
            name: SITE_AUTHOR,
        },
    };

    const crumbs = [
        { href: "/", label: "記事一覧" },
        { href: `/article/${articleId}`, label: article.title },
    ];

    return (
        <>
            <JsonLd data={jsonLd} />
            <AppBreadcrumbs crumbs={crumbs} />
            <Stack spacing={2.5}>
                <AccessLogTracker articleId={articleId} />
                <MainImage imageUrl={article.mainImageUrl} alt={article.title} />
                <Stack spacing={1}>
                    <ArticleTitle title={article.title} />
                    <ArticleDate date={article.publishedAt} />
                </Stack>
                <ArticleBody body={article.content} />
                <RecommendedArticles />
            </Stack>
        </>
    );
};

export default Article;