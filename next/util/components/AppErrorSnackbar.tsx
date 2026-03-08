"use client";

import { useSnackbar } from "@/util/context/AppSnackbarContext";
import { Alert, Snackbar } from "@mui/material";

const AppErrorSnackbar = () => {
    const { errorMessage, setErrorMessage } = useSnackbar();

    return (
        <Snackbar
            open={!!errorMessage}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => setErrorMessage(null)}
        >
            <Alert severity="error" variant="filled" onClose={() => setErrorMessage(null)}>
                {errorMessage}
            </Alert>
        </Snackbar>
    );
};

export default AppErrorSnackbar;
