import { Button, Stack, TextField } from "@mui/material";

const SummaryInput = (
    { value, onChange }:
        { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <TextField
            label="概要"
            size="small"
            value={value}
            onChange={onChange}
        />
    );
}

export default SummaryInput;