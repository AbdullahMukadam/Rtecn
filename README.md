# shadcn-RTE

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Self, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **Shared UI package** - shadcn/ui primitives live in `packages/ui`
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the fullstack application.

## UI Customization

React web apps in this stack share shadcn/ui primitives through `packages/ui`.

- Change design tokens and global styles in `packages/ui/src/styles/globals.css`
- Update shared primitives in `packages/ui/src/components/*`
- Adjust shadcn aliases or style config in `packages/ui/components.json` and `apps/web/components.json`

### Add more shared components

Run this from the project root to add more primitives to the shared UI package:

```bash
npx shadcn@latest add accordion dialog popover sheet table -c packages/ui
```

Import shared components like this:

```tsx
import { Button } from "@shadcn-RTE/ui/components/button";
```

### Add app-specific blocks

If you want to add app-specific blocks instead of shared primitives, run the shadcn CLI from `apps/web`.

## Project Structure

```
shadcn-RTE/
├── apps/
│   └── web/         # Fullstack application (Next.js) + registry
├── packages/
│   ├── editor/      # @rtecn/editor — toolbar-style rich text editor
│   ├── block-editor/ # @rtecn/block-editor — block-type editor
│   └── ui/          # Shared shadcn/ui components and styles
```

## Registry Installation

Both editor packages are available via the shadcn registry. Add the rtecn registry to your `components.json`:

```json
{
  "importPaths": {
    "@rtecn": "https://rtecn.space/r/{name}.json"
  }
}
```

Then install either package:

```bash
npx shadcn@latest add @rtecn/editor
npx shadcn@latest add @rtecn/block-editor
```

The registry is built from source via `pnpm build:registry`.

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications
- `pnpm run dev:web`: Start only the web application
- `pnpm run check-types`: Check TypeScript types across all apps
