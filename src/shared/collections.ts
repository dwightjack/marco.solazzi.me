import { getCollection, type CollectionEntry } from 'astro:content';

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
    'libraries',
    'dx',
    'build_tools',
    'architecture',
    'tools',
  ];

  const skills: CollectionEntry<'skills'>['data'][] = [];

  for (const item of order) {
    const skill = rawSkills.find(({ id }) => id === item);
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
  return (await getCollection('personalWorks')).map((entry) => {
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
