'use client';

import { Box, Button, Stack, TextField } from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";
import { useMarkdownInsert } from "@/hooks/useMarkdownInsert";
import { MainTextInputHandle } from "../types";

type ToolbarButton = {
    label: string;
    before: string;
    after?: string;
    placeholder?: string;
};

const TOOLBAR_BUTTONS: ToolbarButton[] = [
    { label: "H1", before: "# " },
    { label: "H2", before: "## " },
    { label: "H3", before: "### " },
    { label: "太字", before: "**", after: "**", placeholder: "テキスト" },
    { label: "横線", before: "\n---\n" },
    { label: "コード", before: "```\n", after: "\n```", placeholder: "コード" },
    { label: "リンク", before: "[", after: "](url)", placeholder: "テキスト" },
];


const MainTextInput = forwardRef<MainTextInputHandle, { value: string; onChange: (value: string) => void }>(
    ({ value, onChange }, ref) => {
        const { inputRef, insertAtCursor } = useMarkdownInsert(value, onChange);

        useImperativeHandle(ref, () => ({
            insertText: insertAtCursor,
        }));

        return (
            <Stack spacing={1.5} sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 0.5 }}>
                    {TOOLBAR_BUTTONS.map((btn) => (
                        <Button
                            key={btn.label}
                            size="small"
                            variant="outlined"
                            onClick={() => insertAtCursor(btn.before, btn.after ?? "", btn.placeholder ?? "")}
                            sx={{ minWidth: "unset", px: 1, py: 0.25, fontSize: "0.75rem" }}
                        >
                            {btn.label}
                        </Button>
                    ))}
                </Box>
                <TextField
                    label="本文"
                    size="small"
                    multiline
                    fullWidth
                    minRows={20}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    inputRef={inputRef}
                />
            </Stack>
        );
    }
);

MainTextInput.displayName = "MainTextInput";

export default MainTextInput;
