import './globals.css';
import type { Metadata } from 'next';
import { Inter, Mochiy_Pop_One } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const mochiy = Mochiy_Pop_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mochiy',
});

export const metadata: Metadata = {
  title: 'KidsConnect - LINE連携の保育園・幼稚園向けデジタルサービス',
  description: 'LINEを活用した写真共有、コミュニケーション、入退園管理を提供する保育園・幼稚園向けサービス',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${inter.variable} ${mochiy.variable} font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}