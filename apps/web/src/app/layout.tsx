import type { Metadata } from "next";
import { Montserrat, Fira_Code  } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";

import "../index.css";
import Providers from "@/components/providers";

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

// const fontSerif = Georgia({
//   subsets: ["latin"],
//   variable: "--font-serif",
// });

const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});


export const metadata: Metadata = {
  title: "rtecn",
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
        className={`${fontSans.variable} ${fontMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <RootProvider theme={{ enabled: false }}>
          <Providers>{children}</Providers>
        </RootProvider>
      </body>
    </html>
  );
}
