"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor, useRichTextEditorContext } from "@rtecn/editor";
import "@rtecn/editor/style.css";

function subscribeToDarkClass(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getDarkSnapshot() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

function useIsDark() {
  return useSyncExternalStore(subscribeToDarkClass, getDarkSnapshot, () => false);
}

const LIGHT_VARS = {
  "--background": "oklch(0.96 0.02 50)",
  "--foreground": "oklch(0.2 0.04 50)",
  "--primary": "oklch(0.6 0.18 45)",
  "--primary-foreground": "oklch(1 0 0)",
  "--border": "oklch(0.82 0.05 50)",
  "--accent": "oklch(0.88 0.04 50)",
  "--accent-foreground": "oklch(0.25 0.06 50)",
  "--muted": "oklch(0.92 0.03 50)",
  "--muted-foreground": "oklch(0.5 0.05 50)",
  "--radius": "0.5rem",
} as const;

const DARK_VARS = {
  "--background": "oklch(0.18 0.04 260)",
  "--foreground": "oklch(0.92 0.02 260)",
  "--primary": "oklch(0.55 0.22 260)",
  "--primary-foreground": "oklch(1 0 0)",
  "--border": "oklch(0.3 0.06 260)",
  "--accent": "oklch(0.28 0.08 260)",
  "--accent-foreground": "oklch(0.92 0.02 260)",
  "--muted": "oklch(0.24 0.05 260)",
  "--muted-foreground": "oklch(0.58 0.04 260)",
  "--radius": "0.5rem",
} as const;

export function ThemeCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const isDark = useIsDark();
  const vars = isDark ? DARK_VARS : LIGHT_VARS;
  return (
    <div className={className} style={vars as React.CSSProperties}>
      {children}
    </div>
  );
}

const extensions = [StarterKit.configure({ heading: { levels: [1, 2, 3] } })];

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

export function IconsPreview() {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    extensions,
    content:
      "<p>Bold is a <strong>heart</strong>, italic is a <strong>star</strong>.</p>",
  });

  return (
    <RichTextEditor
      editor={editor}
      icons={{
        boldControlIcon: <HeartIcon />,
        italicControlIcon: <StarIcon />,
      }}
    >
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export function ThemePreview() {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    extensions,
    content: "<p>A warm sepia theme using CSS variables.</p>",
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

function EmojiControl() {
  const { editor } = useRichTextEditorContext();
  return (
    <RichTextEditor.Control
      onClick={() => editor?.chain().focus().insertContent("😊 ").run()}
      title="Insert smile emoji"
    >
      <SmileIcon />
    </RichTextEditor.Control>
  );
}

function WaveControl() {
  const { editor } = useRichTextEditorContext();
  return (
    <RichTextEditor.Control
      onClick={() => editor?.chain().focus().insertContent("👋 ").run()}
      title="Insert wave emoji"
    >
      <span className="text-sm">👋</span>
    </RichTextEditor.Control>
  );
}

export function ControlsPreview() {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    extensions,
    content: "<p>Custom controls let you insert emoji with one click.</p>",
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <EmojiControl />
          <WaveControl />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
