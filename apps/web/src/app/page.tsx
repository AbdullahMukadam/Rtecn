import Link from "next/link";
import { Button } from "@rtecn/ui/components/button";
import { EditorSection } from "@/components/editor-section";
import Header from "@/components/header";

export const GITHUB_URL = "https://github.com/AbdullahMukadam/Rtecn";

const editorCode = `import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { RichTextEditor, Link } from "@rtecn/editor";
import "@rtecn/editor/style.css";

export function MyEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Link,
      Underline,
      Highlight,
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start typing..." }),
    ],
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.Code />
          <RichTextEditor.ClearFormatting />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
          <RichTextEditor.H5 />
          <RichTextEditor.H6 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignRight />
          <RichTextEditor.AlignJustify />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Highlight />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
          <RichTextEditor.CodeBlock />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}`;

const blockEditorCode = `import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Link from "@tiptap/extension-link";
import {
  BlockEditor,
  SlashCommand,
  defaultSlashCommandItems,
  getSlashCommandSuggestion,
} from "@rtecn/block-editor";
import type { SlashCommandSuggestionItem } from "@rtecn/block-editor";
import "@rtecn/block-editor/style.css";

const DEMO_CONTENT = "
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
".trim();

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
      editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
    },
  },
  {
    id: "table",
    title: "Table",
    description: "Insert a table.",
    keywords: ["table", "grid"],
    command: ({ editor, range }) => {
      editor
        .chain().focus()
        .deleteRange(range)
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
  },
];

export function MyBlockEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({ placeholder: "Type / for commands..." }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Image,
      SlashCommand.configure({
        suggestion: getSlashCommandSuggestion(myItems),
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
    ],
    content: DEMO_CONTENT,
  });

  return <BlockEditor editor={editor} />;
}`;

const editorCodeData = [
  {
    language: "tsx",
    filename: "editor.tsx",
    code: editorCode,
  },
];

const blockEditorCodeData = [
  {
    language: "tsx",
    filename: "block-editor.tsx",
    code: blockEditorCode,
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex max-w-3xl flex-col items-center px-8 pt-24 pb-16 text-center">
          <h1 className="text-5xl font-medium leading-tight tracking-tighter text-foreground sm:text-6xl">
            Rich text editors
            <br />
            for shadcn/ui
          </h1>

          <p className="mt-5 max-w-md text-base text-muted-foreground">
            Two editors. One design system. Built on Tiptap with shadcn/ui
            tokens.
          </p>

          <div className="mt-8 flex gap-3">
            <Link href="/docs">
              <Button>Explore docs &rarr;</Button>
            </Link>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">GitHub</Button>
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-4xl space-y-12 px-4 md:px-8 pb-24">
          <EditorSection
            type="editor"
            title="@rtecn/editor"
            badge="Toolbar"
            description="A traditional toolbar-style rich text editor. 20+ built-in controls including text formatting, headings, lists, links, alignment, and history."
            codeData={editorCodeData}
            docsHref="/docs/editor"
          />

          <EditorSection
            type="block-editor"
            title="@rtecn/block-editor"
            badge="Blocks"
            badgeClass="inline-flex h-5 items-center rounded-full bg-primary px-2 text-[11px] font-medium tracking-wider text-primary-foreground"
            description="A Notion-style block-based editor with slash commands, drag handles, and a bubble menu. Supports images, tables, code blocks, and task lists."
            codeData={blockEditorCodeData}
            docsHref="/docs/block-editor"
          />
        </section>
      </main>

      <footer className="flex h-12 items-center justify-between border-t border-border px-8 text-xs text-muted-foreground">
        <span>Rtecn</span>
        <span>MIT License</span>
      </footer>
    </div>
  );
}
