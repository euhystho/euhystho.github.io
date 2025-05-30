import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://eugenehysthompson.com",
  output: "static",
  integrations: [mdx(), sitemap(), svelte(), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});