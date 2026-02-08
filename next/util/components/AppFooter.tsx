import { Box, Typography } from "@mui/material";

const AppFooter = () => {
    return (
        <Box component="footer" sx={{ mt: 50, px: 2, py: 2, bgcolor: "secondary.main" }}>
            <Typography color="primary.main">
                © 2026 kasatata All rights reserved
            </Typography>
        </Box>
    );
};

export default AppFooter;