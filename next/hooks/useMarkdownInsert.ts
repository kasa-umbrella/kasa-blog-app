import { useRef } from "react";

export const useMarkdownInsert = (value: string, onChange: (value: string) => void) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const insertAtCursor = (before: string, after = "", placeholder = "") => {
        const el = inputRef.current;
        if (!el) return;

        const start = el.selectionStart ?? value.length;
        const end = el.selectionEnd ?? value.length;
        const selected = value.slice(start, end) || placeholder;

        const newValue = value.slice(0, start) + before + selected + after + value.slice(end);
        onChange(newValue);

        const newCursor = start + before.length + selected.length + after.length;
        requestAnimationFrame(() => {
            el.focus();
            el.setSelectionRange(newCursor, newCursor);
        });
    };

    return { inputRef, insertAtCursor };
};
