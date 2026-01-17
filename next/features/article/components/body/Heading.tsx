import { Typography } from "@mui/material";
import { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
    return (
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            {children}
        </Typography>
    );
};

export default Heading;
