"use client";

import { Toaster } from "@rtecn/ui/components/sonner";
import { ThemeProvider } from "./theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { ImagePromptPortal } from "./image-prompt";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster richColors />
      <Analytics />
      <ImagePromptPortal />
    </ThemeProvider>
  );
}
