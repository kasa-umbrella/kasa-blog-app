import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ReactNode } from "react";

export interface AppTableColumn<T> {
    label: string;
    render: (row: T) => ReactNode;
    shrink?: boolean;
}

interface AppTableProps<T> {
    columns: AppTableColumn<T>[];
    rows: T[];
    rowKey: (row: T) => string;
}

const AppTable = <T,>({ columns, rows, rowKey }: AppTableProps<T>) => {
    return (
        <Table>
            <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                    {columns.map((col, i) => (
                        <TableCell key={i} sx={{ py: 1, ...(col.shrink && { width: "1%", whiteSpace: "nowrap" }) }}>
                            {col.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={rowKey(row)} sx={{ "&:last-child td": { borderBottom: 0 } }}>
                        {columns.map((col, i) => (
                            <TableCell key={i} sx={{ py: 1, ...(col.shrink && { width: "1%", whiteSpace: "nowrap" }) }}>
                                {col.render(row)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AppTable;
