import { Inter } from 'next/font/google';
import { ThemeProvider } from './components/ThemeProvider';
import { DataProvider } from './components/DataProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const interHeading = Inter({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

export const metadata = {
  title: 'Portfolio',
  description: 'Academic Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${interHeading.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <DataProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </DataProvider>
      </body>
    </html>
  );
}
