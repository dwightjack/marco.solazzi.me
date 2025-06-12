import { getCollection, type CollectionEntry } from 'astro:content';
import { NAV_PATH_BLOG } from './constants';

export async function getJobs() {
  const jobs = (await getCollection('jobs'))
    .sort((a, b) => b.data.from.getTime() - a.data.from.getTime())
    .map(({ data, body, slug }) => {
      const { href, title, company } = data;

      return {
        title: company,
        id: `job-${slug}`,
        href,
        data: {
          from: data.from,
          to: data.to,
          title,
          description: body.trim(),
        },
      };
    });

  return {
    current: jobs.find(({ data }) => !data.to),
    previous: jobs.filter(({ data }) => !!data.to),
  };
}

export async function getEducation() {
  return (await getCollection('education'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((entry) => {
      const { title, ...data } = entry.data;

      return { id: `education-${entry.id}`, title, data };
    });
}

export async function getSkills() {
  const rawSkills = await getCollection('skills');
  const order = [
    'languages',
    'architecture',
    'libraries',
    'dx',
    'build_tools',
    'tools',
    'backlog',
  ];

  const skills: CollectionEntry<'skills'>['data'][] = [];

  for (const item of order) {
    const skill = rawSkills.find(({ id }) => id === item);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    skill && skills.push(skill.data);
  }
  return skills;
}

export async function getWorks() {
  return (await getCollection('works'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((entry) => {
      const { project: title, stack, tasks, media, href, ...data } = entry.data;

      return {
        details: {
          id: `works-${entry.id}`,
          title,
          href,
          data: {
            ...data,
            stack: stack.join(', '),
            tasks: tasks?.join(', ') || '',
          },
        },
        media,
      };
    });
}

export async function getPersonalWorks() {
  return (await getCollection('personalWorks'))
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((entry) => {
      const { project: title, stack, source, href, ...data } = entry.data;

      return {
        details: {
          id: `works-personal-${entry.id}`,
          title,
          href,
          data: {
            description: entry.body.trim(),
            ...data,
            stack: stack.join(', '),
          },
        },
        source,
      };
    });
}

export async function getTalks() {
  return (await getCollection('talks'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((entry) => {
      const { title, media, href, ...data } = entry.data;

      return {
        details: {
          id: `talks-${entry.id}`,
          title,
          href,
          data,
        },
        media,
      };
    });
}

export async function getBlogPosts() {
  return (await getCollection('blog'))
    .filter((entry) => {
      if (import.meta.env.PUBLIC_PREVIEW === 'true') {
        return true;
      }
      if (import.meta.env.PROD) {
        return (
          entry.data.isDraft !== true &&
          entry.data.publishDate.getTime() <= Date.now()
        );
      }
      return true;
    })
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime())
    .map((entry) => {
      const { title, mark, isDraft, ...data } = entry.data;

      return {
        mark,
        isDraft,
        details: {
          id: `talks-${entry.id}`,
          title,
          href: NAV_PATH_BLOG + '/' + entry.slug,
          data: {
            date: data.publishDate,
            ...data,
            publishDate: null,
          },
        },
      };
    });
}
