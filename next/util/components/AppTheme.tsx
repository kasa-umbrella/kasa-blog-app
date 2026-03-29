'use client';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";


const theme = createTheme({
    palette: {
        primary: {
            light: '#c4e3ef',
            main: '#add8e8',
            dark: '#7aafc0',
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
        },
        error: {
            main: '#e57373',
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