'use client';
import AppHeadTitle from "@/util/components/AppHeadTitle";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const About = () => {
    return (
        <Box mb={3}>
            <AppHeadTitle>
                かさたたのブログへようこそ！
            </AppHeadTitle>
            <Box display="flex" flexDirection="row" alignItems="center" gap={3} mt={3}>
                <Box>
                    <Image
                        src="/kasatata.png"
                        alt="プロフィール画像"
                        width={100}
                        height={100}
                    />
                </Box>
                <Box>
                    <Typography variant="h6" fontWeight="bold">
                        かさたた
                    </Typography>
                    <Typography>
                        都内でエンジニアをしています。
                        夢は沖縄でアイスクリーム屋さんを開くことです。
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default About;