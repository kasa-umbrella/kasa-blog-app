import About from "@/features/about/About";
import Articles from "@/features/articles/Articles";

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