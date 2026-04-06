'use client';

import AppHeadTitle from "@/util/components/AppHeadTitle";
import { useSnackbar } from "@/util/context/AppSnackbarContext";
import { Box, Button, ButtonProps, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { logout } from "../homeService";

const LinkButton = (props: ButtonProps) => (
    <Button variant="contained" {...props} sx={{ width: 120, ...props.sx }} />
);

const HomeLinks = () => {
    const router = useRouter();
    const { setErrorMessage } = useSnackbar();

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/manage/login");
        } catch {
            setErrorMessage("ログアウトに失敗しました。");
        }
    };

    return (
        <Box>
            <AppHeadTitle>メニュー</AppHeadTitle>
            <Stack direction="row" spacing={1}>
                <LinkButton onClick={() => router.push("/manage/post")}>
                    記事投稿
                </LinkButton>
                <LinkButton onClick={() => router.push("/manage/analysis")}>
                    データ分析
                </LinkButton>
                <LinkButton onClick={handleLogout}>
                    ログアウト
                </LinkButton>
            </Stack>
        </Box>
    );
};

export default HomeLinks;
