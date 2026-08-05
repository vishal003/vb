import { Roboto, Poppins } from 'next/font/google';
import { ThemeProvider } from './components/ThemeProvider';
import { DataProvider } from './components/DataProvider';
import './globals.css';

const bodyFont = Roboto({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '700'],
});

const headingFont = Poppins({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: 'Portfolio',
  description: 'Academic Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`} suppressHydrationWarning>
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
