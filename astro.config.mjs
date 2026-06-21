// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },

  outDir: './docs',

  build: {
    // 3. FIX THE 404: Rename the asset folder from '_astro' to 'assets'
    // This stops GitHub Pages from blocking your files!
    assets: "assets",
  },

  integrations: [mdx()],
});
