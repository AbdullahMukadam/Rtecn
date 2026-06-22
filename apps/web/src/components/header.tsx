"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="flex h-12 items-center justify-between border-b border-border px-8">
      <Link
        href="/"
        className="text-sm font-medium tracking-tight text-foreground no-underline"
      >
        Rtecn
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href="/docs"
          className="text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
        >
          Docs
        </Link>
        <a
          href="https://github.com/anomalyco/shadcn-RTE"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
        >
          GitHub
        </a>
        <ModeToggle />
      </nav>
    </header>
  );
}
