"use client";

import "@rtecn/block-editor/style.css";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import {
  BlockEditor,
  SlashCommand,
  defaultSlashCommandItems,
  getSlashCommandSuggestion,
} from "@rtecn/block-editor";
import type { SlashCommandSuggestionItem } from "@rtecn/block-editor";

const myItems: SlashCommandSuggestionItem[] = [
  ...defaultSlashCommandItems,
  {
    id: "image",
    title: "Image",
    description: "Insert an image.",
    keywords: ["image", "img", "picture", "photo"],
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

const content = `
<h2>Welcome to the Block Editor</h2>
<p>Hover to the left edge of any block to see the drag handle. Click it for actions, or type <code>/</code> to open the slash command menu.</p>
<blockquote><p>This is a blockquote — each block has a drag handle on the left.</p></blockquote>
<ul>
  <li>Bullet list item</li>
  <li>Another item</li>
</ul>
<ol>
  <li>Numbered item one</li>
  <li>Numbered item two</li>
</ol>
<pre><code class="language-javascript">console.log("Hello from code block!");</code></pre>
`;

export default function BlockEditorPage() {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder: "Type / for commands, or start writing...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Image,
      SlashCommand.configure({
        suggestion: getSlashCommandSuggestion(myItems),
      }),
    ],
    content,
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Block Editor Demo</h1>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
        <BlockEditor editor={editor} />
      </div>
    </div>
  );
}
