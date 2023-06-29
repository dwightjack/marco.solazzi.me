import { z, defineCollection } from 'astro:content';

const jobCollection = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    from: z.date(),
    to: z.date().optional(),
    title: z.string(),
    href: z.string().url(),
  }),
});

export const collections = {
  jobs: jobCollection,
};
