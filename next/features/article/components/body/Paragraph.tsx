import { Typography } from "@mui/material";
import { ReactNode } from "react";

const Paragraph = ({ children }: { children: ReactNode }) => {
    return (
        <Typography sx={{ mb: 3 }}>
            {children}
        </Typography>
    );
};

export default Paragraph;
