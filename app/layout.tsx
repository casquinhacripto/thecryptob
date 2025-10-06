import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/shared/MainLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TheCrypto_B Hub | Live Bitcoin Tracker & Crypto Tools",
  description: "Your personal crypto hub featuring real-time Bitcoin price tracking, project showcase, and community updates. Built by TheCrypto_B.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
