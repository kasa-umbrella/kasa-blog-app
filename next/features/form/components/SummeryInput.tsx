import { Button, Stack, TextField } from "@mui/material";

const SummaryInput = (
    { value, onChange }:
        { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <Stack direction="row">
            <TextField
                label="概要"
                size="small"
                value={value}
                onChange={onChange}
            />
            <Button variant="contained"/>
        </Stack>
    );
}

export default SummaryInput;