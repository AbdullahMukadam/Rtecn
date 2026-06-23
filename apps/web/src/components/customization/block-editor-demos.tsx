"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import {
  BlockEditor,
  SlashCommand,
  defaultSlashCommandItems,
  getSlashCommandSuggestion,
} from "@rtecn/block-editor";
import type { SlashCommandSuggestionItem } from "@rtecn/block-editor";
import "@rtecn/block-editor/style.css";

const BLOCK_CONTENT = `
<h2>Getting Started</h2>
<p>Type <code>/</code> to open the command menu. Hover the left edge to see the drag handle.</p>
<blockquote><p>Block-level content with drag handles.</p></blockquote>
<ul data-type="taskList">
   <li data-type="taskItem" data-checked="true">Done task</li>
   <li data-type="taskItem" data-checked="false">Pending task</li>
</ul>
<pre><code class="language-javascript">console.log("Hello, world!");</code></pre>
`.trim();

const lowlight = createLowlight(common);

const blockItems = [
  ...defaultSlashCommandItems,
  {
    id: "image",
    title: "Image",
    description: "Insert an image.",
    keywords: ["image", "img"],
    command: ({ editor, range }: any) => {
      const url = window.prompt("Enter image URL");
      if (!url) return;
      (editor.chain().focus() as any).deleteRange(range).setImage({ src: url }).run();
    },
  },
  {
    id: "table",
    title: "Table",
    description: "Insert a table.",
    keywords: ["table"],
    command: ({ editor, range }: any) => {
      (editor.chain().focus() as any)
        .deleteRange(range)
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
  },
];

const extensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] }, codeBlock: false }),
  Placeholder.configure({ placeholder: "Type / for commands..." }),
  Underline,
  TaskList,
  TaskItem.configure({ nested: true }),
  CodeBlockLowlight.configure({ lowlight }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Table,
  TableRow,
  TableCell,
  TableHeader,
  Image,
  Link.configure({ openOnClick: true, autolink: true, defaultProtocol: "https" }),
  SlashCommand.configure({ suggestion: getSlashCommandSuggestion(blockItems) }),
];

export function BlockEditorVariantsDemo() {
  const a = useEditor({ immediatelyRender: false, shouldRerenderOnTransaction: false, extensions, content: BLOCK_CONTENT });
  const b = useEditor({ immediatelyRender: false, shouldRerenderOnTransaction: false, extensions, content: BLOCK_CONTENT });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">default</p>
        <div className="overflow-hidden rounded-md border border-border">
          <BlockEditor editor={a} variant="default" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">minimal</p>
        <div className="overflow-hidden rounded-md border border-border">
          <BlockEditor editor={b} variant="minimal" />
        </div>
      </div>
    </div>
  );
}

export function BlockEditorThemingDemo() {
  const editor = useEditor({ immediatelyRender: false, shouldRerenderOnTransaction: false, extensions, content: BLOCK_CONTENT });
  return (
    <div style={{ "--primary": "oklch(0.55 0.25 280)", "--radius": "0.5rem", "--accent": "oklch(0.9 0.06 280)", "--accent-foreground": "oklch(0.3 0.1 280)", "--muted": "oklch(0.93 0.03 280)", "--muted-foreground": "oklch(0.5 0.05 280)" } as React.CSSProperties}>
      <BlockEditor editor={editor} />
    </div>
  );
}

export function BlockEditorClassNameDemo() {
  const editor = useEditor({ immediatelyRender: false, shouldRerenderOnTransaction: false, extensions, content: BLOCK_CONTENT });
  return (
    <BlockEditor editor={editor} className="border-2 border-dashed border-primary/50 rounded-xl" />
  );
}

/* ───── Custom Slash Commands ───── */

const customSlashItems: SlashCommandSuggestionItem[] = [
  {
    id: "greeting",
    title: "Greeting",
    description: "Insert a friendly greeting.",
    keywords: ["hello", "hi", "greeting"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent("Hello there! 👋").run();
    },
  },
  {
    id: "image",
    title: "Image",
    description: "Insert an image.",
    keywords: ["image", "img", "picture"],
    command: ({ editor, range }) => {
      const url = window.prompt("Enter image URL");
      if (!url) return;
      (editor.chain().focus() as any).deleteRange(range).setImage({ src: url }).run();
    },
  },
  {
    id: "table",
    title: "Table",
    description: "Insert a table.",
    keywords: ["table", "grid"],
    command: ({ editor, range }) => {
      (editor.chain().focus() as any)
        .deleteRange(range)
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
  },
];

const customSlashExtensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] }, codeBlock: false }),
  Placeholder.configure({ placeholder: "Type / for commands..." }),
  Underline,
  TaskList,
  TaskItem.configure({ nested: true }),
  CodeBlockLowlight.configure({ lowlight }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Table,
  TableRow,
  TableCell,
  TableHeader,
  Image,
  Link.configure({ openOnClick: true, autolink: true, defaultProtocol: "https" }),
  SlashCommand.configure({ suggestion: getSlashCommandSuggestion(customSlashItems) }),
];

export function BlockEditorCustomSlashCommandsDemo() {
  const editor = useEditor({ immediatelyRender: false, shouldRerenderOnTransaction: false, extensions: customSlashExtensions, content: BLOCK_CONTENT });
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <BlockEditor editor={editor} />
    </div>
  );
}
