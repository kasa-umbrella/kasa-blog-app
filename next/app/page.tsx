import About from "@/features/about/About";
import Articles from "@/features/articles/Articles";

const ArticlesPage = () => {
    return (
        <>
            <About />
            <Articles header="人気記事" />
            <Articles header="記事一覧" />
        </>
    );
};

export default ArticlesPage;