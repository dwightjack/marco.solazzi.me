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

const skillCollection = defineCollection({
  type: 'data',
  schema: z.object({
    label: z.string(),
    icon: z.string(),
    data: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        icon: z.string(),
      }),
    ),
  }),
});

const talkCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    conf: z.string(),
    href: z.string().url(),
    media: z.array(
      z.object({
        icon: z.string().optional(),
        type: z.enum(['video', 'slides'] as const),
        lang: z.string().optional(),
        href: z.string().url(),
      }),
    ),
  }),
});

const workCollection = defineCollection({
  type: 'data',
  schema: z.object({
    project: z.string(),
    date: z.date(),
    stack: z.array(z.string()),
    tasks: z.array(z.string()).optional(),
    href: z.string().url().optional(),
    media: z
      .array(
        z.object({
          icon: z.string().optional(),
          href: z.string().url(),
          label: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

const personalWorksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    project: z.string(),
    stack: z.array(z.string()),
    href: z.string().url().optional(),
    source: z
      .object({
        href: z.string().url(),
        label: z.string().default('source'),
      })
      .optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    isDraft: z.boolean().default(true),
    publishDate: z.date(),
  }),
});

export const collections = {
  jobs: jobCollection,
  education: educationCollection,
  skills: skillCollection,
  talks: talkCollection,
  works: workCollection,
  personalWorks: personalWorksCollection,
  blog: blogCollection,
};
