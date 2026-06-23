"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import TableKit from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlock from '@tiptap/extension-code-block'
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import {
  BlockEditor,
  SlashCommand,
  defaultSlashCommandItems,
  getSlashCommandSuggestion,
} from "@rtecn/block-editor";
import type {
  BlockEditorVariant,
  SlashCommandSuggestionItem,
} from "@rtecn/block-editor";
import "@rtecn/block-editor/style.css";

const DEMO_CONTENT = `
<h2>Getting Started</h2>
<p>The <code>BlockEditor</code> is a block-style editor. Type <code>/</code> to open the command menu and insert blocks.</p>
<h3>Text Formatting</h3>
<p>Select any text to see the <strong>bubble menu</strong> with <em>formatting</em> options.</p>
<h3>Task List</h3>
<ul data-type="taskList">
   <li data-type="taskItem" data-checked="true">A list item</li>
   <li data-type="taskItem" data-checked="false">And another one</li>
</ul>
<h3>Code Block</h3>
<pre><code class="language-javascript">function greet(name) {
  return \`Hello, \${name}!\`;
}</code></pre>
<h3>Blockquote</h3>
<blockquote><p>Block-level content with drag handles for reordering.</p></blockquote>
`.trim();

const myItems: SlashCommandSuggestionItem[] = [
  ...defaultSlashCommandItems,
  {
    id: "custom",
    title: "Custom",
    description: "A custom command",
    keywords: ["custom"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent("Hello!").run();
    },
  },
  {
    id: "image",
    title: "Image",
    description: "Insert an image.",
    keywords: ["image", "img", "picture", "photo"],
    command: ({ editor, range }) => {
      const url = window.prompt("Enter image URL");
      if (!url) return;
      (editor.chain().focus() as any)
        .deleteRange(range)
        .setImage({ src: url })
        .run();
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

const lowlight = createLowlight(common);

export function BlockEditorPreview({
  variant = "default",
}: {
  variant?: BlockEditorVariant;
}) {

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: false,
      }),
      Placeholder.configure({ placeholder: "Type / for commands..." }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      CodeBlock,
      CodeBlockLowlight.configure({ lowlight}),
      SlashCommand.configure({
        suggestion: getSlashCommandSuggestion(myItems),
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TableKit,
      TableRow,
      TableCell,
      TableHeader,
      Image,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
    ],
    content: DEMO_CONTENT,
  });

  return (
    <div className="overflow-hidden rounded-md border border-border">
      <BlockEditor editor={editor} variant={variant} />
    </div>
  );
}
