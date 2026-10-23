import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'webnibo',
  description:
    'Browse our huge selection of affordable flooring and tile products and save money on your home renovation project. Shop online at Floor and Decor now!',
  keywords:
    'ceramic floor tiles, porcelain tiles, travertine tile, granite tiles, glass tiles, mosaic tile, marble tiles, tile store, tile flooring, tile floors',
  icons: {
    icon: [
      { url: '/fabicon.png', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/fabicon.png',
    apple: '/fabicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fabicon.png" type="image/png" />
        <link rel="shortcut icon" href="/fabicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/fabicon.png" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          {children}
          <CartDrawer />
          <CheckoutModal />
        </CartProvider>
      </body>
    </html>
  );
}
