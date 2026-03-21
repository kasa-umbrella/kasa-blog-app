'use client';

import { useEffect, useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import { fetchRecentImageUrls } from "../imageUploadService";

const RecentImageList = ({ onSelect, onSelectAsMain, refreshKey }: { onSelect: (url: string) => void; onSelectAsMain: (url: string) => void; refreshKey?: number }) => {
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
                    最近アップロードした画像
                </Typography>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "4px" }}>
                {imageUrls.map((url) => (
                    <Box
                        key={url}
                        onClick={() => onSelect(url)}
                        sx={{ cursor: "pointer", "&:hover": { opacity: 0.7 }, overflow: "hidden", borderRadius: 1, aspectRatio: "1", position: "relative" }}
                    >
                        <img src={url} alt={url} loading="lazy" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                        <IconButton
                            size="small"
                            onClick={(e) => { e.stopPropagation(); onSelectAsMain(url); }}
                            sx={{ position: "absolute", bottom: 2, right: 2, bgcolor: "rgba(255,255,255,0.8)", p: "2px", "&:hover": { bgcolor: "rgba(255,255,255,1)" } }}
                        >
                            <OutlinedFlagIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Stack>
    );
};

export default RecentImageList;
