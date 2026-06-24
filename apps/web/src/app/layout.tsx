import type { Metadata } from "next";
import { Montserrat, Fira_Code, Inter } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";

import "../index.css";
import Providers from "@/components/providers";

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Montserrat({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: "Rtecn",
  description: "Rich text editor components for the shadcn/ui ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} ${fontInter.variable} antialiased flex flex-col min-h-screen`}
      >
        <RootProvider theme={{ enabled: false }}>
          <Providers>{children}</Providers>
        </RootProvider>
      </body>
    </html>
  );
}
