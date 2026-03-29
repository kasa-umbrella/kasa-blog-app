import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AppScrollableBox from "./AppScrollableBox";
import { ReactNode } from "react";

export interface AppTableColumn<T> {
    label: string;
    render: (row: T) => ReactNode;
    width?: number;
}

interface AppTableProps<T> {
    columns: AppTableColumn<T>[];
    rows: T[];
    rowKey: (row: T) => string;
}

const AppTable = <T,>({ columns, rows, rowKey }: AppTableProps<T>) => {
    return (
        <AppScrollableBox>
            <Table sx={{ minWidth: 600 }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "primary.light" }}>
                        {columns.map((col, i) => (
                            <TableCell key={i} sx={{ py: 1, ...(col.width && { width: col.width, whiteSpace: "nowrap" }) }}>
                                {col.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={rowKey(row)} sx={{ "&:last-child td": { borderBottom: 0 } }}>
                            {columns.map((col, i) => (
                                <TableCell key={i} sx={{ py: 1, ...(col.width && { width: col.width, whiteSpace: "nowrap" }) }}>
                                    {col.render(row)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppScrollableBox>
    );
};

export default AppTable;
