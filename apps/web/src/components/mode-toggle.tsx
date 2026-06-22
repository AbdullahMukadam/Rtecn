"use client";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "@rtecn/ui/components/kibo-ui/theme-switcher";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <ThemeSwitcher defaultValue="system" onChange={setTheme} value={theme as any} />
  );
}
