import { getCollection } from 'astro:content';

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
