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

const educationCollection = defineCollection({
  type: 'data',
  schema: z.object({
    institute: z.string(),
    date: z.date(),
    title: z.string(),
  }),
});

export const collections = {
  jobs: jobCollection,
  education: educationCollection,
};
