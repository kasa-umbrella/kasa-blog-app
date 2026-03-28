import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const PublishSelect = (
    { value, onChange }:
    { value: boolean, onChange: (value: boolean) => void }) =>
{
    return (
        <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>公開設定</InputLabel>
            <Select
                value={value ? "published" : "draft"}
                label="公開設定"
                onChange={(e) => onChange(e.target.value === "published")}
            >
                <MenuItem value="published">公開</MenuItem>
                <MenuItem value="draft">非公開</MenuItem>
            </Select>
        </FormControl>
    );
}

export default PublishSelect;
