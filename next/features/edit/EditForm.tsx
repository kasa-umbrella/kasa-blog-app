import ArticleForm from "../form/ArticleForm"
import { ArticleFormProps } from "../form/types"

const EditForm = () => {
    const editedArticle: ArticleFormProps = {
        articleId: "0194ce69-6571-70cb-873b-5a02e5b87823",
        title: "編集用サンプル記事",
        summary: "これは編集用サンプル記事です。",
        isPublished: false,
        mainText: "これは編集用サンプル記事です。",
        mainImage: null,
    }

    return (
        <ArticleForm title="記事編集" articleProps={editedArticle} />
    )
}

export default EditForm;