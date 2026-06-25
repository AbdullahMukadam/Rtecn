"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@rtecn/ui/components/dialog";
import { Button } from "@rtecn/ui/components/button";

let resolveCurrent: ((url: string | null) => void) | null = null;
let listeners: Array<() => void> = [];
let isOpen = false;

function subscribe(cb: () => void) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

function getSnapshot() {
  return isOpen;
}

function open() {
  isOpen = true;
  listeners.forEach((l) => l());
}

function close() {
  isOpen = false;
  listeners.forEach((l) => l());
}

export function showImagePrompt(): Promise<string | null> {
  if (isOpen) return Promise.resolve(null);
  open();
  return new Promise((resolve) => {
    resolveCurrent = resolve;
  });
}

export function ImagePromptPortal() {
  const shown = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shown) {
      setUrl("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [shown]);

  const handleClose = useCallback((val: string | null) => {
    close();
    resolveCurrent?.(val);
    resolveCurrent = null;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = url.trim();
    if (!val) return;
    let finalUrl = val;
    if (!/^https?:\/\//i.test(finalUrl)) finalUrl = `https://${finalUrl}`;
    handleClose(finalUrl);
  };

  return (
    <Dialog
      open={shown}
      onOpenChange={(open) => {
        if (!open) handleClose(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Image URL</DialogTitle>
          <DialogDescription>
            Enter the URL of the image you want to insert.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <input
              ref={inputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/image.png"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleClose(null)}
            >
              Cancel
            </Button>
            <Button type="submit">Insert</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
