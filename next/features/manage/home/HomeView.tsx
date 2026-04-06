'use client';

import { Stack } from "@mui/material";
import HomeLinks from "./components/HomeLinks";
import HomeArticleList from "./components/HomeArticleList";

const HomeView = () => {
    return (
        <Stack spacing={4}>
            <HomeLinks />
            <HomeArticleList />
        </Stack>
    );
};

export default HomeView;
