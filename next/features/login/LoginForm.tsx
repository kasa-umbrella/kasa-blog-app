'use client';

import AppHeadTitle from "@/util/components/AppHeadTitle";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { login, verifyAuth } from "./loginService";
import { LoginFormData } from "./types";

const LoginForm = () => {
    const [loginFormData, setLoginFormData] = useState<LoginFormData>({
        loginId: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogin = async () => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            await login(loginFormData);
            const isAuthed = await verifyAuth();
            if (!isAuthed) {
                throw new Error("認証に失敗しました。再度お試しください。");
            }
        } catch (error) {
            setErrorMessage("ログインに失敗しました。");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Box sx={{ maxWidth: 500, mx: "auto" }}>
            <AppHeadTitle>
                管理者ページログイン
            </AppHeadTitle>
            <Stack spacing={2}>
                <TextField
                    label="ログインID"
                    size="small"
                    value={loginFormData.loginId}
                    onChange={(e) =>
                        setLoginFormData((prev) => ({
                            ...prev,
                            loginId: e.target.value,
                        }))
                    }
                />
                <TextField
                    label="パスワード"
                    type="password"
                    size="small"
                    value={loginFormData.password}
                    onChange={(e) =>
                        setLoginFormData((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }))
                    }
                />
                {errorMessage && (
                    <Typography color="error" variant="body2">
                        {errorMessage}
                    </Typography>
                )}
                <Button variant="contained" onClick={handleLogin} disabled={isLoading}>
                    ログイン
                </Button>
            </Stack>
        </Box>
    );
}

export default LoginForm;