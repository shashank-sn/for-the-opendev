import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "@ftod/ui/styles/tokens.css";
import "@ftod/ui/styles/base.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "for the open dev",
  description: "discover open source worth your time",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://fortheopen.dev"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ftod-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}