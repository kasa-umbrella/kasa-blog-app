"use client";

import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { fetchCsrfToken, postComment } from "../../commentService";
import { CommentFormData, CommentResponse } from "../../types";

const initialFormData: CommentFormData = {
    commenterName: "",
    content: "",
};

const CommentForm = ({
    articleId,
    onSubmitted,
}: {
    articleId: string;
    onSubmitted: (comment: CommentResponse) => void;
}) => {
    const [formData, setFormData] = useState<CommentFormData>(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (field: keyof CommentFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async () => {
        setError(null);
        setLoading(true);
        try {
            const csrfToken = await fetchCsrfToken();
            const comment = await postComment(articleId, formData, csrfToken);
            onSubmitted(comment);
            setFormData(initialFormData);
        } catch (e) {
            setError(e instanceof Error ? e.message : "エラーが発生しました");
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = loading || !formData.commenterName.trim() || !formData.content.trim();

    return (
        <Box>
            <Stack spacing={2}>
                <TextField
                    label="名前"
                    size="small"
                    value={formData.commenterName}
                    onChange={handleChange("commenterName")}
                    slotProps={{ htmlInput: { maxLength: 20 } }}
                />
                <TextField
                    label="コメント"
                    size="small"
                    multiline
                    minRows={3}
                    value={formData.content}
                    onChange={handleChange("content")}
                    slotProps={{ htmlInput: { maxLength: 50 } }}
                />
                {error && <Alert severity="error">{error}</Alert>}
                <Button variant="contained" onClick={handleSubmit} disabled={isDisabled}>
                    送信
                </Button>
            </Stack>
        </Box>
    );
};

export default CommentForm;
