import { defineCollection, z } from "astro:content";

import { glob, file } from "astro/loaders";

const journeyCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/journey" }),
    schema: z.object({
        sortOrder: z.number(),
        date: z.string(),
        title: z.string(),
        link: z
            .object({
                url: z.string(),
                text: z.string(),
            })
            .optional(),
    }),
});

export const collections = { journey: journeyCollection };
