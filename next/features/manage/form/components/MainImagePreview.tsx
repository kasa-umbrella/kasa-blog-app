import { Box, Stack, Typography } from "@mui/material";

const MainImagePreview = ({ mainImageUrl }: { mainImageUrl: string | null }) => {
    return (
        <Stack spacing={1} sx={{ mt: 2 }}>
            <Box>
                <Typography variant="body2" color="text.secondary">メイン画像</Typography>
            </Box>
            <Box>
                {mainImageUrl ? (
                    <Box
                        component="img"
                        src={mainImageUrl}
                        alt="メイン画像"
                        sx={{ width: "auto", height: 200, objectFit: "cover", borderRadius: 1 }}
                    />
                ) : (
                    <Box sx={{ color: "text.secondary" }}>選択されていません</Box>
                )}
            </Box>
        </Stack>
    );
};

export default MainImagePreview;
