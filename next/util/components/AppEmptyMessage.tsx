import { Typography } from "@mui/material";

const AppEmptyMessage = ({ message }: { message: string }) => {
    return <Typography color="text.secondary" textAlign="center">{message}</Typography>;
};

export default AppEmptyMessage;
