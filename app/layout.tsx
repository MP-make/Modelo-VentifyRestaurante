import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toast } from "@/components/ui/Toast";
import { GlobalCartDrawer } from "@/components/shared/GlobalCartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ventify Restaurante",
  description: "Web app para restaurantes con modos delivery, waiter y menu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16 bg-gray-50`}
      >
        <Navbar />
        {children}
        <Footer />
        <Toast />
        <GlobalCartDrawer />
      </body>
    </html>
  );
}