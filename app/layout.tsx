import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'iPhone Evolution Sentiment Lens — 11 to 17 Pro',
  description:
    'A sentiment analysis dashboard tracking customer opinions across every iPhone from 11 to 17 Pro Max, comparing Amazon and Takealot reviews.',
  openGraph: {
    title: 'iPhone Evolution Sentiment Lens',
    description: 'How has iPhone sentiment evolved from 11 to 17 Pro? Is it worth upgrading?',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#FFFAF9] text-stone-800 antialiased">{children}</body>
    </html>
  );
}
