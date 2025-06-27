import React from "react";
import Navbar from "@/components/Navbar";
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#2B2B2B]">
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
