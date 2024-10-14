import type { Metadata } from "next";
import localFont from "next/font/local";

import Navbar from "@/components/navbar";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DevOpsify",
  description: "DevOpsify is a app for managment of deployments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1440px] mx-auto mb-8`}
      >
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-100px)] mt-1 px-4 flex flex-col items-center">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
