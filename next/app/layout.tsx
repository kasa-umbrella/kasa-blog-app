import AppErrorSnackbar from "@/util/components/AppErrorSnackbar";
import AppSuccessSnackbar from "@/util/components/AppSuccessSnackbar";
import AppFooter from "@/util/components/AppFooter";
import AppHeader from "@/util/components/AppHeader";
import AppLoadingSnackbar from "@/util/components/AppLoadingSnackbar";
import AppTheme from "@/util/components/AppTheme";
import { AppSnackbarProvider } from "@/util/context/AppSnackbarContext";
import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-noto-sans-jp",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: {
        default: "かさたたのブログ",
        template: "%s - かさたたのブログ",
    },
    description: "楽しいかさたたのブログです。",
    openGraph: {
        url: process.env.NEXT_PUBLIC_SITE_URL,
        siteName: "かさたたのブログ",
        description: "楽しいかさたたのブログです。",
        locale: "ja_JP",
        type: "website",
    },
};

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <html lang="ja">
            <AppRouterCacheProvider>
                <AppTheme>
                    <AppSnackbarProvider>
                        <body
                            className={`${notoSansJP.variable}`}
                            style={{ margin: 0, padding: 0, minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", }}
                        >
                            <AppHeader />
                            <Box
                                component="main"
                                sx={{
                                    width: "100%",
                                    maxWidth: 900,
                                    minWidth: 250,
                                    mt: 3,
                                    mb: 15,
                                    mx: "auto",
                                    px: 2,
                                    flexGrow: 1,
                                }}
                            >
                                {children}
                            </Box>
                            <AppFooter />
                            <AppErrorSnackbar />
                            <AppLoadingSnackbar />
                            <AppSuccessSnackbar />
                        </body>
                    </AppSnackbarProvider>
                </AppTheme>
            </AppRouterCacheProvider>
        </html>
    );
}

export default RootLayout;