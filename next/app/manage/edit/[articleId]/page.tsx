import EditForm from "@/features/manage/edit/EditForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "記事編集",
    robots: { index: false },
};

const EditPage = async ({ params }: { params: Promise<{ articleId: string }> }) => {
    const { articleId } = await params;
    return <EditForm articleId={articleId} />;
};

export default EditPage;
