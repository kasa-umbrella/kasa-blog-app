'use client';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#add8e8',
        },
        secondary: {
            main: '#333333',
        },
        text: {
            primary: '#1a2a3a',
            secondary: '#52595dff',
        },
        background: {
            default: '#f7fbfe',
        }
    },
    typography: {
        fontFamily: 'var(--font-noto-sans-jp), sans-serif',
    },
});

const AppTheme = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default AppTheme;