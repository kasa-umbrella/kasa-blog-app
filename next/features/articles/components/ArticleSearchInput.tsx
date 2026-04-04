'use client';

import { TextField, Button, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSnackbar } from "@/util/context/AppSnackbarContext";

interface ArticleSearchInputProps {
    keyword?: string;
}

const ArticleSearchInput = ({ keyword }: ArticleSearchInputProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setIsLoading } = useSnackbar();
    const [value, setValue] = useState(keyword ?? "");

    useEffect(() => {
        setIsLoading(false);
    }, [searchParams]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (value) params.set("keyword", value);
        setIsLoading(true);
        router.push(`/?${params.toString()}`);
    };

    return (
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="記事を検索"
                size="small"
                fullWidth
            />
            <Button onClick={handleSearch} variant="contained" size="small">
                検索
            </Button>
        </Stack>
    );
};

export default ArticleSearchInput;
