import { Box } from "@mui/material";

const AppScrollableBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={{ overflowX: "auto" }}>
            {children}
        </Box>
    );
};

export default AppScrollableBox;
