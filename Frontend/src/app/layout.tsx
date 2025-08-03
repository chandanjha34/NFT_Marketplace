'use client'
import React from "react";
import Navbar from "@/components/Navbar";
import './globals.css'
import { Provider } from 'react-redux';
import { store } from "@/Redux/store";
import { NFTProvider } from "@/Wallet/contracts/NFTContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
