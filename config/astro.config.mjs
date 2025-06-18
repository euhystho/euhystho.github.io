import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://eugenehysthompson.com",
  output: "static",
  integrations: [mdx(), sitemap(), svelte()],
  experimental: {
    responsiveImages: true,
  },
  image: {
    experimentalLayout: "constrained",
    experimentalDefaultStyles: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
