import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Define and export the schema types
const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  icon: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  tags: z.array(z.string()),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  featured: z.boolean().default(false),
  date: z.coerce.date(),
  modDate: z.coerce.date(),
});

const writingSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean().default(false),
  date: z.coerce.date(),
  modDate: z.coerce.date(),
});

// Export type definitions from the schemas
export type ProjectSchema = z.infer<typeof projectSchema>;
export type WritingSchema = z.infer<typeof writingSchema>;

const projectsCollection = defineCollection({
  loader: glob({ base: "./src/projectposts", pattern: "**/*.mdx" }),
  schema: projectSchema,
});

const writingCollection = defineCollection({
  loader: glob({ base: "./src/writingposts", pattern: "**/*.mdx" }),
  schema: writingSchema,
});

export const collections = {
  projects: projectsCollection,
  writings: writingCollection,
};
