import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Material Web Showcase",
  description: "Complete Material Web 3 feature showcase — dark expressive aesthetic",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-color="blue">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="bg-shape bg-shape-1" aria-hidden="true" />
        <div className="bg-shape bg-shape-2" aria-hidden="true" />
        <div className="bg-shape bg-shape-3" aria-hidden="true" />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

function ScrollProgress() {
  return <div className="scroll-progress" id="scroll-progress" />;
}
