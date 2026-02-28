import { Box, TextField } from "@mui/material";

const TitleInput = (
    { value, onChange }: 
    { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => 
{
    return (
        <TextField
            label="タイトル"
            size="small"
            value={value}
            onChange={onChange}
        />
    );
};

export default TitleInput;