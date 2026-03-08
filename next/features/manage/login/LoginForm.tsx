'use client';

import AppHeadTitle from "@/util/components/AppHeadTitle";
import { useSnackbar } from "@/util/context/AppSnackbarContext";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiError } from "@/util/errors";
import { login, verifyAuth } from "./loginService";
import { LoginFormData } from "./types";

const LoginForm = () => {
    const [loginFormData, setLoginFormData] = useState<LoginFormData>({
        loginId: "",
        password: "",
    });

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { setErrorMessage } = useSnackbar();

    useEffect(() => {
        verifyAuth().then((isAuthed) => {
            if (isAuthed) router.replace("/manage/home");
        });
    }, [router]);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await login(loginFormData);
            const isAuthed = await verifyAuth();
            if (!isAuthed) {
                throw new Error("認証に失敗しました。再度お試しください。");
            }
            router.push("/manage/home");
        } catch (error) {
            if (error instanceof ApiError && error.status === 401) {
                setErrorMessage("IDまたはパスワードが正しくありません。");
            } else {
                setErrorMessage("ログインに失敗しました。");
            }
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
<Button variant="contained" onClick={handleLogin} disabled={isLoading || !loginFormData.loginId || !loginFormData.password}>
                    ログイン
                </Button>
            </Stack>
        </Box>
    );
}

export default LoginForm;