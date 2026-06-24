# Rtecn

Rich text editor components for [shadcn/ui](https://ui.shadcn.com/) projects, built on [Tiptap](https://tiptap.dev/).

Two editor variants are available via the [shadcn registry](https://ui.shadcn.com/docs/registry):

| Package | Description |
|---------|-------------|
| [`@rtecn/editor`](https://rtecn.space/docs/editor) | Toolbar-style rich text editor with 20+ built-in controls |
| [`@rtecn/block-editor`](https://rtecn.space/docs/block-editor) | Notion-style block editor with slash commands, drag handles, and bubble menu |

## Quick start

Add the rtecn registry to your `components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "registries": {
    "@rtecn": "https://rtecn.space/r/{name}.json"
  }
}
```

Install an editor:

```bash
npx shadcn@latest add @rtecn/editor
npx shadcn@latest add @rtecn/block-editor
```

Then install the Tiptap peer dependencies and import the components. See the [registry docs](https://rtecn.space/docs/registry) for full usage instructions.

## npm

Both packages are also available on npm:

```bash
npm install @rtecn/editor @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link
```

```bash
npm install @rtecn/block-editor @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/suggestion @tiptap/extension-drag-handle-react
```

## Documentation

Full documentation is available at [rtecn.space](https://rtecn.space/docs):

- [Getting started](https://rtecn.space/docs/getting-started)
- [Editor API](https://rtecn.space/docs/editor)
- [Block Editor API](https://rtecn.space/docs/block-editor)
- [Customization](https://rtecn.space/docs/customization)
- [Registry](https://rtecn.space/docs/registry)

## Project structure

```
shadcn-RTE/
├── apps/
│   └── web/               # Documentation site (Next.js) + registry JSON
├── packages/
│   ├── editor/            # @rtecn/editor — toolbar-style editor
│   ├── block-editor/      # @rtecn/block-editor — block-type editor
│   └── ui/                # Shared shadcn/ui primitives (button, popover, etc.)
└── scripts/
    └── build-registry.mjs # Builds registry JSON from source files
```

## Development

```bash
pnpm install
pnpm run dev              # Start all apps in development mode
pnpm run dev:web          # Start only the documentation site
pnpm run build:registry   # Rebuild registry JSON files
```

## Built with

- [Tiptap](https://tiptap.dev/) — Headless rich text editor framework
- [shadcn/ui](https://ui.shadcn.com/) — Component primitives and design tokens
- [Next.js](https://nextjs.org/) — React framework
- [Turborepo](https://turbo.build/repo) — Monorepo tooling
- [TypeScript](https://www.typescriptlang.org/) — Type safety
