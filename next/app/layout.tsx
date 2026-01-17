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

export const metadata: Metadata = {
    title: "かさたたのブログ",
    description: "楽しいかさたたのブログです。",
};

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <html lang="ja">
            <AppRouterCacheProvider>
                <AppTheme>
                    <body className={`${notoSansJP.variable}`} style={{ margin: 0, padding: 0 }}>
                        <AppHeader />
                        <Box
                            component="main"
                            sx={{
                                maxWidth: 900,
                                minWidth: 250,
                                mt: 3,
                                mb: 15,
                                mx: "auto",
                                px: 2,
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