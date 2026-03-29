import EditForm from "@/features/manage/edit/EditForm";

const EditPage = async ({ params }: { params: Promise<{ articleId: string }> }) => {
    const { articleId } = await params;
    return <EditForm articleId={articleId} />;
};

export default EditPage;
