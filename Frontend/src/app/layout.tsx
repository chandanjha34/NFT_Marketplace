import React from "react";
import Navbar from "@/components/Navbar";
import './globals.css'
import { Provider } from 'react-redux';
import { store } from "@/Redux/store";
import { NFTProvider } from "@/Wallet/contracts/NFTContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Awesome NFT Marketplace',
  description: 'Discover, collect, and sell amazing NFTs from around the world.',
  // You can also add metadata for social media sharing (Open Graph)
  openGraph: {
    title: 'My Awesome NFT Marketplace',
    description: 'The best place to find unique digital art.',
    images: ['/logo.png'], // Place this image in your `public` folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#2B2B2B]">
      <NFTProvider>
          <Provider store={store}>
            <Navbar/>
            {children}
            <ToastContainer position="top-right" autoClose={5000} />
          </Provider>
      </NFTProvider>
      </body>
    </html>
  );
}
