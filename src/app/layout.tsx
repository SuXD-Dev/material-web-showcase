import type { Metadata } from "next";
import "./globals.css";
import { MaterialProvider } from "@/components/MaterialProvider";

export const metadata: Metadata = {
  title: "Material Web Showcase — M3 Expressive",
  description: "A comprehensive showcase of all 48 Material Web Components with M3 Expressive theming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body>
        <MaterialProvider>{children}</MaterialProvider>
      </body>
    </html>
  );
}
