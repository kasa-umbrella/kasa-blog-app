import PostForm from "@/features/manage/post/PostForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "記事投稿",
    robots: { index: false },
};

const PostPage = () => {
    return (
        <>
            <PostForm />
        </>
    );
};

export default PostPage;