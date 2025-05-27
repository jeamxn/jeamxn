import type { Metadata } from "next";
import "./globals.css";
import React from "react";

import Header from "@front/components/header";
import Providers from "@front/providers";

export const metadata: Metadata = {
  title: "Jeamin Choi · 최재민",
  description: "Jeamin Choi's personal website",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" className="h-full w-full overflow-x-hidden">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className="antialiased bg-stone-50 dark:bg-stone-800 h-full w-full">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
};


export default RootLayout;