'use client';

import { TextField, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ArticleSearchInputProps {
    keyword?: string;
}

const ArticleSearchInput = ({ keyword }: ArticleSearchInputProps) => {
    const router = useRouter();
    const [value, setValue] = useState(keyword ?? "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (value) params.set("keyword", value);
        router.push(`/?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <TextField
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="記事を検索"
                    size="small"
                    fullWidth
                />
                <Button type="submit" variant="contained" size="small">
                    検索
                </Button>
            </Stack>
        </form>
    );
};

export default ArticleSearchInput;
