import { defineConfig } from "vitepress";

// Refer to https://vitepress.dev/reference/site-config for details
export default defineConfig({
  title: "Docs",
  themeConfig: {
    search: {
      provider: "local",
    },
  },
  outDir: "../dist/",
  vite: {
    // Don't interfere with turbo
    clearScreen: false,
  },
});
