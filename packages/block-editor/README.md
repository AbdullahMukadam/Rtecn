# @rtecn/block-editor

A **Notion-style** block-type rich text editor built on [Tiptap](https://tiptap.dev/) with shadcn/ui design tokens. Part of the [rtecn](https://rtecn.space) editor suite.

## Features

- Block-based editing (Notion, Linear-style)
- Slash command menu — type `/` to insert blocks
- Bubble menu for inline formatting
- Block-level actions (copy, delete, reorder via drag handle)
- Built-in image and table blocks
- Fully typed with TypeScript
- Extensible via Tiptap extensions
- Built with shadcn/ui CSS variables — matches your theme

## Installation

### npm

```bash
npm install @rtecn/block-editor @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link
```

### shadcn registry

```bash
npx shadcn@latest add @rtecn/block-editor
```

Make sure your `components.json` includes the rtecn registry:

```json
{
  "registries": {
    "@rtecn": "https://rtecn.space/r/{name}.json"
  }
}
```

## Usage

```tsx
"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { BlockEditor } from "@rtecn/block-editor";
import "@rtecn/block-editor/style.css";

export function MyEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Placeholder.configure({ placeholder: "Type / for commands..." }),
      Underline,
    ],
  });

  return <BlockEditor editor={editor} />;
}
```

## Documentation

Full API reference at [rtecn.space/docs/block-editor](https://rtecn.space/docs/block-editor).

## License

MIT
