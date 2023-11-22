"use client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Inter } from "next/font/google";
import "the-new-css-reset/css/reset.css";
import "./globals.css";

import { RecoilRoot } from "recoil";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ height: "100%", width: "100%" }}
      >
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
