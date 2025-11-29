import { defineCollection, z } from "astro:content";

import { glob, file } from "astro/loaders";

const works = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/works" }),
    schema: z.object({
        sortOrder: z.number(),
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        icon: z.string().optional(),
        url: z.string().url().optional(),
        github: z.string().url().optional(),
    }),
});

const journey = defineCollection({
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

export const collections = {
    journey,
    works,
};
