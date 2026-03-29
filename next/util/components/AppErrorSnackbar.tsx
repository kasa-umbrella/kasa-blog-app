"use client";

import { useSnackbar } from "@/util/context/AppSnackbarContext";
import { Alert, Snackbar } from "@mui/material";

const AppErrorSnackbar = () => {
    const { errorMessage, setErrorMessage } = useSnackbar();

    return (
        <Snackbar
            open={!!errorMessage}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={5000}
            onClose={() => setErrorMessage(null)}
        >
            <Alert severity="error" variant="filled" onClose={() => setErrorMessage(null)} sx={{ whiteSpace: "pre-line" }}>
                {errorMessage}
            </Alert>
        </Snackbar>
    );
};

export default AppErrorSnackbar;
