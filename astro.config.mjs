import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://eugenehysthompson.com",
  output: "static",
  build: { format: "file" },
  integrations: [
    mdx({
      shikiConfig: {
        themes: { light: "min-light", dark: "everforest-dark" },
      },
      defaultColor: false,
    }),
    sitemap(),
    svelte(),
    pagefind(),
  ],
  image: {
    responsiveStyles: true,
    layout: "constrained",
    objectFit: "fill",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
