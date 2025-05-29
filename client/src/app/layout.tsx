import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snap Cart",
  description: "Snap Cart, o seu carrinho de compras online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased bg-white dark:bg-black text-black dark:text-white flex flex-col min-h-screen w-screen items-center justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
