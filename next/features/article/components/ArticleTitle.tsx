import { Typography } from "@mui/material";

const ArticleTitle = ({ title }: { title: string }) => (
    <Typography variant="h1" sx={{ fontSize: 24, fontWeight: "bold"}}>
        {title}
    </Typography>
);

export default ArticleTitle;
