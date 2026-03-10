import { defineConfig, fontProviders } from "astro/config";
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
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Montserrat",
      cssVariable: "--font-heading",
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/Montserrat-Regular.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Figtree",
      cssVariable: "--font-sans",
      fallbacks: ["system-ui", "sans-serif"],
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/Figtree-Regular.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/JetBrainsMono-Regular.woff2"],
          },
        ],
      },
    },
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes("node_modules/svelte") ||
              id.includes("node_modules/svelte-toolbelt")
            ) {
              return "svelte-vendor";
            }
          },
        },
      },
    },
    plugins: [tailwindcss()],
  },
});
