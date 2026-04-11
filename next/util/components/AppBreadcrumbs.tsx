'use client';

import { Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

const SEGMENT_LABELS: Record<string, string> = {
    manage: "管理画面",
    home: "ホーム",
    post: "記事投稿",
    edit: "記事編集",
    analysis: "データ分析",
    login: "ログイン",
};

type Crumb = { href: string; label: string };

type Props = {
    crumbs?: Crumb[];
};

const AppBreadcrumbs = ({ crumbs: crumbsProp }: Props) => {
    const pathname = usePathname();

    const crumbs: Crumb[] = crumbsProp ?? (() => {
        const segments = pathname.split("/").filter(Boolean);
        return segments
            .filter((segment) => segment in SEGMENT_LABELS)
            .map((segment) => {
                const originalIndex = segments.indexOf(segment);
                const href = "/" + segments.slice(0, originalIndex + 1).join("/");
                return { href, label: SEGMENT_LABELS[segment] };
            });
    })();

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
            {crumbs.map((crumb, i) =>
                i < crumbs.length - 1 ? (
                    <Link
                        key={crumb.href}
                        component={NextLink}
                        href={crumb.href}
                        underline="hover"
                        color="inherit"
                    >
                        {crumb.label}
                    </Link>
                ) : (
                    <Typography key={crumb.href} color="text.primary">
                        {crumb.label}
                    </Typography>
                )
            )}
        </Breadcrumbs>
    );
};

export default AppBreadcrumbs;
