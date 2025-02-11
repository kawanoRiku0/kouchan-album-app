import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { Providers } from './components/providers';

export const metadata: Metadata = {
  title: 'こうちゃんアルバム',
  description: 'こうちゃんのアルバム',
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased" style={{ margin: 0 }}>
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
