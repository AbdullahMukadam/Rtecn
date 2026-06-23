"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { GITHUB_URL } from "@/app/page";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: GITHUB_URL, label: "GitHub", external: true },
  { href: "/docs/customization", label: "Customize" },
];

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Prevent scrolling when mobile menu is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Close on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="flex h-12 items-center justify-between border-b border-border px-4 sm:px-8">
      <Link
        href="/"
        className="relative z-50 text-sm font-medium tracking-tight text-foreground no-underline"
      >
        Rtecn
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-6 md:flex">
        {navLinks.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm text-muted-foreground no-underline transition-colors hover:text-foreground",
                pathname === link.href && "text-foreground font-medium"
              )}
            >
              {link.label}
            </Link>
          )
        )}
        <ModeToggle />
      </nav>

      {/* Mobile Navigation */}
      <div className="flex items-center gap-2 md:hidden">
        <ModeToggle />

        <button
          className="relative z-50 flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {open && (
          <div className="fixed inset-0 top-12 z-40 grid h-[calc(100vh-3rem)] grid-flow-row auto-rows-max overflow-auto bg-background/90 p-6 pb-32 shadow-md backdrop-blur-md animate-in slide-in-from-bottom-10 md:hidden">
            <div className="relative z-20 grid text-popover-foreground">
              <nav className="grid grid-flow-row auto-rows-max gap-4">
                {navLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center rounded-md py-2 text-lg font-medium capitalize hover:underline"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex w-full items-center rounded-md py-2 text-lg font-medium capitalize hover:underline text-muted-foreground",
                        pathname === link.href && "text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
