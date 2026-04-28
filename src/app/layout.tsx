import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'GreenPenny',
  description: 'Wealth management, beautifully engineered.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen bg-navy text-slate-200 selection:bg-primary/30 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
