"use client";

import "@rtecn/block-editor/style.css";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { BlockEditor, SlashCommand, getSlashCommandSuggestion } from "@rtecn/block-editor";

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
      SlashCommand.configure({
        suggestion: getSlashCommandSuggestion(),
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
