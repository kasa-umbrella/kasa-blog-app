'use client';

import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { fetchRecentImageUrls } from "../imageUploadService";

const RecentImageList = ({ onSelect, refreshKey }: { onSelect: (url: string) => void; refreshKey?: number }) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        fetchRecentImageUrls()
            .then(setImageUrls)
            .catch(console.error);
    }, [refreshKey]);

    if (imageUrls.length === 0) return null;

    return (
        <Stack spacing={1} sx={{ mt: 2 }}>
            <Box>
                <Typography variant="body2" color="text.secondary">
                    直近1時間のアップロード画像
                </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {imageUrls.map((url) => (
                    <Box
                        key={url}
                        onClick={() => onSelect(url)}
                        sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 }, overflow: "hidden", borderRadius: 1, width: 100, height: 100, flexShrink: 0 }}
                    >
                        <img src={url} alt={url} loading="lazy" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                    </Box>
                ))}
            </Box>
        </Stack>
    );
};

export default RecentImageList;
