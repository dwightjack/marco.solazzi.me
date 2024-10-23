import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getBlogPosts } from '../shared/collections';

export const GET: APIRoute = async (context) => {
  const posts = await getBlogPosts();
  return rss({
    title: 'Marco Solazzi - UI Web Developer - Blog',
    description: 'Latest Blog Posts',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.details.title,
      pubDate: post.details.data.date,
      link: post.details.href,
    })),
    customData: `<language>en-us</language>`,
  });
};
