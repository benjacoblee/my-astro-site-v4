import { defineCollection } from "astro:content";

import { glob } from "astro/loaders";

import { z } from "astro/zod";

const thoughts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/thoughts" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    date: z.date(),
    draft: z.boolean(),
    description: z.optional(z.string()),
  }),
});

const microposts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/microposts" }),
  schema: z.object({
    title: z.string(),
    modifiedDate: z.date(),
  }),
});

export const collections = { thoughts, microposts };
