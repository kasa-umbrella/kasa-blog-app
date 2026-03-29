'use client';

import { Pagination, Box } from "@mui/material";

interface AppPaginationProps {
    page: number;
    count: number;
    onChange: (page: number) => void;
}

const AppPagination = ({ page, count, onChange }: AppPaginationProps) => {
    if (count <= 1) return null;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
                page={page}
                count={count}
                onChange={(_, value) => onChange(value)}
                color="primary"
            />
        </Box>
    );
};

export default AppPagination;
