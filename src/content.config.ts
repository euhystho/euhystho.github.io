import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectsCollection = defineCollection({
  // Load MDX files in the `src/content/projects/` directory.
  loader: glob({ base: "./src/projects", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
  }),
});

const writingCollection = defineCollection({
  // Load MDX files in the `src/content/projects/` directory.
  loader: glob({ base: "./src/writings", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
    modDate: z.coerce.date(),
  }),
});

export const collections = {
  projects: projectsCollection,
  writings: writingCollection,
};
