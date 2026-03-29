'use client';

import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchBoxProps {
    keyword?: string;
}

const SearchBox = ({ keyword }: SearchBoxProps) => {
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
            <TextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="記事を検索"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
            />
        </form>
    );
};

export default SearchBox;
