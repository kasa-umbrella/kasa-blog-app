import AppHeadTitle from "@/util/components/AppHeadTitle";
import { Box } from "@mui/material";

const ArticleForm = ({ title }: { title: string }) => {
    return (
        <Box>
            <AppHeadTitle>
                {title}
            </AppHeadTitle>
            <Box>
                タイトル

                要約

                公開範囲

                画像アップロード

                本文

            </Box>
        </Box>
    );
};

export default ArticleForm;