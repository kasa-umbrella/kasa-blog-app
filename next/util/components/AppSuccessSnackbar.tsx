"use client";

import { useSnackbar } from "@/util/context/AppSnackbarContext";
import { Alert, Snackbar } from "@mui/material";

const AppSuccessSnackbar = () => {
    const { successMessage, setSuccessMessage } = useSnackbar();

    return (
        <Snackbar
            open={!!successMessage}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={5000}
            onClose={() => setSuccessMessage(null)}
        >
            <Alert severity="success" variant="filled" onClose={() => setSuccessMessage(null)}>
                {successMessage}
            </Alert>
        </Snackbar>
    );
};

export default AppSuccessSnackbar;
