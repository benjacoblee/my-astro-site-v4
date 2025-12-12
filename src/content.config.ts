import { defineCollection } from "astro:content";

import { glob, file } from "astro/loaders";

import { z } from "astro/zod";

const thoughts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/thoughts" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    date: z.date(),
    draft: z.boolean(),
  }),
});

export const collections = { thoughts };
