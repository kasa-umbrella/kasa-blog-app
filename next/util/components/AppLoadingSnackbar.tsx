"use client";

import { useSnackbar } from "@/util/context/AppSnackbarContext";
import { CircularProgress, Snackbar, SnackbarContent, Stack, Typography } from "@mui/material";

const AppLoadingSnackbar = () => {
    const { isLoading } = useSnackbar();

    return (
        <Snackbar open={isLoading} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <SnackbarContent
                message={
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <CircularProgress size={20} color="inherit" />
                        <Typography variant="body2">処理中...</Typography>
                    </Stack>
                }
            />
        </Snackbar>
    );
};

export default AppLoadingSnackbar;
