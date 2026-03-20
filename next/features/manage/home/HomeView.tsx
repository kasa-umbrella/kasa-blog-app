'use client';

import { Stack } from "@mui/material";
import HomeDashboard from "./components/HomeDashboard";
import HomeLinks from "./components/HomeLinks";
import HomeArticleList from "./components/HomeArticleList";

const HomeView = () => {
    return (
        <Stack spacing={4}>
            <HomeLinks />
            <HomeDashboard />
            <HomeArticleList />
        </Stack>
    );
};

export default HomeView;
