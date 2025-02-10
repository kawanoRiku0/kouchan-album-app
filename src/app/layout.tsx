import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { Providers } from './components/providers';

export const metadata: Metadata = {
  title: 'JStack App',
  description: 'Created using JStack',
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Box bgcolor="beige" minHeight="100vh">
            {children}
          </Box>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
