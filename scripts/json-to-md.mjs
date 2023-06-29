import { promises as fs } from 'fs';
import path from 'path';

/* eslint-env node */

(async function () {
  const database = path.resolve(process.cwd(), './src/database');
  const jobsFolder = path.resolve(process.cwd(), './src/content/jobs');

  const jobs = JSON.parse(
    await fs.readFile(path.join(database, 'jobs.json'), 'utf-8'),
  );

  const fields = ['company', 'from', 'to', 'title', 'href'];

  for (const job of jobs) {
    const fm = fields
      .map((f) => (job[f] ? `${f}: ${job[f]}` : ''))
      .filter(Boolean)
      .join('\n');
    const content = `---\n${fm}\n---\n\n${job.description}\n`;

    const fileName =
      job.company
        .toLowerCase()
        .replace(/(\s+|)(\W|Srl|Inc\W?)$/i, '')
        .replaceAll(/\W+/g, '_') + '.md';

    await fs.writeFile(path.join(jobsFolder, fileName), content, 'utf-8');
  }
})();
