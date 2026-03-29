'use client';

import { AppBar, Toolbar, Box, Slide, useScrollTrigger } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const AppHeader = () => {
    const trigger = useScrollTrigger();

    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar position="fixed" elevation={2}>
                    <Toolbar sx={{ minHeight: 60 }}>
                        <Link href="/" style={{ display: 'flex' }}>
                            <Box sx={{ position: 'relative', width: { xs: 180, sm: 236 }, height: { xs: 27, sm: 35 } }}>
                                <Image
                                    src="/headerImage.png"
                                    alt="ヘッダーロゴ"
                                    priority
                                    unoptimized
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </Box>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Slide>
            <Box sx={{ minHeight: 60 }} />
        </>
    );
};

export default AppHeader;