import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const jobs = defineCollection({
  loader: glob({ base: './src/content/jobs', pattern: '*.md' }),
  schema: z.object({
    company: z.string(),
    from: z.coerce.date(),
    to: z.coerce.date().optional(),
    title: z.string(),
    href: z.url(),
  }),
});

const education = defineCollection({
  loader: glob({ base: './src/content/education', pattern: '*.yaml' }),
  schema: z.object({
    institute: z.string(),
    date: z.coerce.date(),
    title: z.string(),
  }),
});

const skills = defineCollection({
  loader: glob({ base: './src/content/skills', pattern: '*.yaml' }),
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

const talks = defineCollection({
  loader: glob({ base: './src/content/talks', pattern: '*.yaml' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    conf: z.string(),
    href: z.url(),
    media: z.array(
      z.object({
        icon: z.string().optional(),
        type: z.enum(['video', 'slides'] as const),
        lang: z.string().optional(),
        href: z.url(),
      }),
    ),
  }),
});

const works = defineCollection({
  loader: glob({ base: './src/content/works', pattern: '*.yaml' }),
  schema: z.object({
    project: z.string(),
    date: z.coerce.date(),
    stack: z.array(z.string()),
    tasks: z.array(z.string()).optional(),
    href: z.url().optional(),
    media: z
      .array(
        z.object({
          icon: z.string().optional(),
          href: z.url(),
          label: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

const personalWorks = defineCollection({
  loader: glob({ base: './src/content/personalWorks', pattern: '*.md' }),
  schema: z.object({
    project: z.string(),
    stack: z.array(z.string()),
    href: z.url().optional(),
    source: z
      .object({
        href: z.url(),
        label: z.string().default('source'),
      })
      .optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    isDraft: z.boolean().default(false),
    publishDate: z.coerce.date(),
    lastUpdateDate: z.coerce.date().optional(),
    mark: z.string().default('記事'),
    excerpt: z.string().optional(),
  }),
});

export const collections = {
  jobs,
  education,
  skills,
  talks,
  works,
  personalWorks,
  blog,
};
