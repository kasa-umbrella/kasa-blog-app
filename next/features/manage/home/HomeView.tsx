'use client';

import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import HomeDashboard from "./components/HomeDashboard";
import HomeLinks from "./components/HomeLinks";
import HomeArticleList from "./components/HomeArticleList";
import { logout } from "./homeService";
import { useSnackbar } from "@/util/context/AppSnackbarContext";

const HomeView = () => {
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
        <Stack spacing={4}>
            <HomeDashboard />
            <HomeLinks />
            <HomeArticleList />
        </Stack>
    );
};

export default HomeView;
