import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Bulbana — Ters Pazar',
  description: 'Aradığın ürün için talep aç; satıcılar sana sunsun. Komisyonsuz ters pazaryeri.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Figtree:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
