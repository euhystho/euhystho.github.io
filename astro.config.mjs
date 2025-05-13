// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://eugenehysthompson.com',
  output: 'static',
  integrations: [mdx(), sitemap(), svelte(), partytown()],

  vite: {
    plugins: [tailwindcss()],
  },
});