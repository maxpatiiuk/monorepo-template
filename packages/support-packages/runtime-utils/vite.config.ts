import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// Consider externalizing such build complexity into a reusable Vite preset
export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: {
        "number/index": "./src/number/index.ts",
      },
      formats: ["es"],
    },
    target: "es2024",
    sourcemap: mode === "development",
    minify: mode !== "development",
  },
  plugins: [
    dts({
      compilerOptions: {
        rootDir: ".",
      },
      beforeWriteFile: async (filePath, content) => {
        // Don't emit .d.ts for vite.config.ts
        if (filePath.includes("/dist/") && !filePath.includes(".test.")) {
          return {
            filePath: filePath.replace("/dist/src/", "/dist/"),
            content,
          };
        } else {
          return false;
        }
      },
    }),
  ],
}));
