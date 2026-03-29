import { Typography } from "@mui/material";
import { formatDate } from "@/util/functions/format";

const ArticleDate = ({ date }: { date: string }) => (
    <Typography color="text.secondary">
        {formatDate(date)}
    </Typography>
);

export default ArticleDate;
