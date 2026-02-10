import AppFooter from "@/util/components/AppFooter";
import AppHeader from "@/util/components/AppHeader";
import AppTheme from "@/util/components/AppTheme";
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
    title: "かさたたのブログ",
    description: "楽しいかさたたのブログです。",
};

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <html lang="ja">
            <AppRouterCacheProvider>
                <AppTheme>
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
                                mb: 20,  
                                mx: "auto",
                                px: 2,
                                flexGrow: 1,
                            }}
                        >
                            {children}
                        </Box>
                        <AppFooter />
                    </body>
                </AppTheme>
            </AppRouterCacheProvider>
        </html>
    );
}

export default RootLayout;