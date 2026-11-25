import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import type { ImageMetadata } from "astro";

// Base schemas for type generation (without image function dependency)
const baseProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.custom<ImageMetadata>().optional(),
  imageAlt: z.string().optional(),
  icon: z.custom<ImageMetadata>().optional(),
  iconAlt: z.string().optional(),
  tags: z.array(z.string()),
  github: z.url().optional(),
  demo: z.url().optional(),
  featured: z.boolean().default(false),
  date: z.coerce.date(),
  modDate: z.coerce.date(),
});

// Export the generated types
export type ProjectSchema = z.infer<typeof baseProjectSchema>;

// Define Project Schema
const projectSchema = ({ image }: { image: any }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    image: image().optional(),
    imageAlt: z.string().optional(),
    icon: image().optional(),
    iconAlt: z.string().optional(),
    tags: z.array(z.string()),
    github: z.url().optional(),
    demo: z.url().optional(),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
    modDate: z.coerce.date(),
  });

// Define Project
const projectsCollection = defineCollection({
  loader: glob({
    base: "./src/projectposts",
    pattern: "**/*.mdx",
  }),
  schema: projectSchema,
});


export const collections = {
  projects: projectsCollection
};
