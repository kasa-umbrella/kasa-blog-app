import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const PublishRange = (
    { value, onChange }:
    { value: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) =>
{
    return (
        <FormGroup>
            <FormControlLabel
                control={<Checkbox checked={value} onChange={onChange} />}
                label="限定公開"
            />
        </FormGroup>
    );
}

export default PublishRange;