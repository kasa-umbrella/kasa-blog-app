import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
    return (
        <Stack mt={5} spacing={1} alignItems="center">
            <Image
                src="/kasatata.png"
                alt="プロフィール画像"
                width={100}
                height={100}
            />
            <Typography sx={{ fontWeight: "bold", fontSize: 25 }}>
                かさたたのブログ
            </Typography>
            <Typography align="center">
                404ページ、ちゃんと実装してあるんだな〜
            </Typography>
            <Link href="/" style={{ textDecoration: "none" }}>
                このリンクでトップに戻ってぴょん！
            </Link>
        </Stack>
    );
};

export default NotFound;