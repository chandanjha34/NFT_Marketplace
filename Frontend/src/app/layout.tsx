'use client'
import React from "react";
import Navbar from "@/components/Navbar";
import './globals.css'
import { Provider } from 'react-redux';
import { store } from "@/Redux/store";
import { NFTProvider } from "@/Wallet/contracts/NFTContext";

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
        </Provider>
      </NFTProvider>
      </body>
    </html>
  );
}
