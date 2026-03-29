'use client';

import AppPagination from "@/util/components/AppPagination";
import { useRouter } from "next/navigation";

interface ArticlesPaginationProps {
    page: number;
    totalPages: number;
    keyword?: string;
}

const ArticlesPagination = ({ page, totalPages, keyword }: ArticlesPaginationProps) => {
    const router = useRouter();

    const handleChange = (value: number) => {
        const params = new URLSearchParams();
        if (keyword) params.set("keyword", keyword);
        if (value > 1) params.set("page", String(value));
        router.push(`/?${params.toString()}`);
    };

    return <AppPagination page={page} count={totalPages} onChange={handleChange} />;
};

export default ArticlesPagination;
