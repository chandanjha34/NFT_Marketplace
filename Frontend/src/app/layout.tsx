// app/layout.tsx
import './globals.css';
import { AppProviders } from './providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Awesome NFT Marketplace',
  description: 'Discover, collect, and sell amazing NFTs from around the world.',
  metadataBase: new URL('https://nft-marketplace-jhachanda-chandan-jhas-projects.vercel.app'), // <-- set your actual domain here
  openGraph: {
    title: 'My Awesome NFT Marketplace',
    description: 'The best place to find unique digital art.',
    images: ['/logo.png'], // Will resolve to https://your-domain.com/logo.png
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#2B2B2B]">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
