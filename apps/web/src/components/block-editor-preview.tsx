"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import {
  BlockEditor,
  SlashCommand,
  getSlashCommandSuggestion,
} from "@rtecn/block-editor";
import type { BlockEditorVariant } from "@rtecn/block-editor";
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
      }),
      Placeholder.configure({ placeholder: "Type / for commands..." }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      SlashCommand.configure({
        suggestion: getSlashCommandSuggestion(),
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
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
