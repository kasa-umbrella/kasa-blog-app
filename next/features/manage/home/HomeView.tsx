'use client';

import { Stack } from "@mui/material";
import HomeLinks from "./components/HomeLinks";
import HomeArticleList from "./components/HomeArticleList";
import HomeCommentList from "./components/HomeCommentList";

const HomeView = () => {
    return (
        <Stack spacing={4}>
            <HomeLinks />
            <HomeArticleList />
            <HomeCommentList />
        </Stack>
    );
};

export default HomeView;
