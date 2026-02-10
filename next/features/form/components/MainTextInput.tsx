import { TextField } from "@mui/material";

const MainTextInput = (
    { value, onChange }:
    { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) =>
{
    return (
        <TextField
            label="本文"
            size="small"
            multiline
            value={value}
            onChange={onChange}
        />
    );
};

export default MainTextInput;