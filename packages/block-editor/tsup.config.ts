import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  external: [
    "react",
    "react-dom",
    /^@tiptap\//,
    "lowlight",
    /^@base-ui\//,
    "class-variance-authority",
  ],
  sourcemap: true,
  clean: true,
})
