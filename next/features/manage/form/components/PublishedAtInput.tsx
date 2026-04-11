import { TextField } from "@mui/material";

const PublishedAtInput = (
    { value, onChange }:
    { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }
) => {
    return (
        <TextField
            label="投稿日時"
            type="datetime-local"
            size="small"
            value={value}
            onChange={onChange}
            slotProps={{ inputLabel: { shrink: true } }}
        />
    );
};

export default PublishedAtInput;
