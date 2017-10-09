import jobs from '@/database/jobs.json';
import education from '@/database/education.json';
import tech from '@/database/skills.tech.json';
import team from '@/database/skills.team.json';
import works from '@/database/portfolio.works.json';
import talks from '@/database/portfolio.talks.json';
import socials from '@/database/social.json';

export default {

    namespaced: true,

    state: {
        jobs,
        education,
        works,
        talks,
        socials,
        skills: {
            _byId: ['tech', 'team'],
            tech: { label: 'Technological stack', list: tech },
            team: { label: 'Teamwork skills and tools', list: team }
        }
    }

};