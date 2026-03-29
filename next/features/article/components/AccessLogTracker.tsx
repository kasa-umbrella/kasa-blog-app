'use client';

import { useEffect } from "react";

const AccessLogTracker = ({ articleId }: { articleId: string }) => {
    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        fetch(`${baseUrl}/access-log/${articleId}`, {
            method: "POST",
            credentials: "include",
        });
    }, [articleId]);

    return null;
};

export default AccessLogTracker;
