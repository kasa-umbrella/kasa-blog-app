import About from "@/features/about/About";
import Articles from "@/features/articles/Articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
    description: "現役ITエンジニアがのかさたたが綴る、楽しくて愉快なブログです。",
    openGraph: {
        description: "現役ITエンジニアがのかさたたが綴る、楽しくて愉快なブログです。",
    },
};

interface PageProps {
    searchParams: Promise<{ keyword?: string; page?: string }>;
}

const ArticlesPage = async ({ searchParams }: PageProps) => {
    const { keyword, page } = await searchParams;
    return (
        <>
            <About />
            <Articles
                header="記事一覧"
                searchParams={{ keyword, page: page ? Number(page) : undefined }}
            />
        </>
    );
};

export default ArticlesPage;