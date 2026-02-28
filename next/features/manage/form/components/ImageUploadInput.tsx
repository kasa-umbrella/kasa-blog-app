import { Button } from "@mui/material";

const ImageUploadInput = (
    { onChange }:
    { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) =>
{
    return (
        <Button variant="contained" component="label">
            画像アップロード
            <input type="file" hidden onChange={onChange} />
        </Button>
    );
}

export default ImageUploadInput;