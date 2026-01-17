import { Box, Typography } from "@mui/material";

const AppHeadTitle = ({children} : {children: React.ReactNode}) => {
    return (
        <>
            <Box mb={2}>
                <Typography variant="h6" fontWeight="bold">
                    {children}
                </Typography>
            </Box>
        </>
    );
};

export default AppHeadTitle;