import { Typography } from "@mui/material";

const NotFound = () => {
    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                404 - ページが見つかりません
            </Typography>
            <Typography variant="body1">
                お探しのページは存在しないか、移動した可能性があります。
            </Typography>   
        </>
    );
};

export default NotFound;