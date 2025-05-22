import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  // Load MDX files in the `src/content/projects/` directory.
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
  }),
});

const writingCollection = defineCollection({
  // Load MDX files in the `src/content/projects/` directory.
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
    mod_date: z.coerce.date()
  }),
});

export const collections = {
  projects: projectsCollection,
  writings: writingCollection,
};
