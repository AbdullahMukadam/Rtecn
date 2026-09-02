import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: false,
  entry: ["src/server.ts", "src/web.ts"],
  format: ["esm"],
});
