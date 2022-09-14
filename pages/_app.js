import '../styles/globals.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import AppLayout from '../components/AppLayout';

function MyApp({ Component, pageProps }) {
    const lightTheme = createTheme({
        type: 'light',
        theme: {
            colors: {}, // optional
        },
    });

    const darkTheme = createTheme({
        type: 'dark',
        theme: {
            colors: {}, // optional
        },
    });

    return (
        <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            value={{
                light: lightTheme.className,
                dark: darkTheme.className,
            }}
        >
            <NextUIProvider>
                <AppLayout>
                    <Component {...pageProps} />
                </AppLayout>
            </NextUIProvider>
        </NextThemesProvider>
    );
}

export default MyApp;
