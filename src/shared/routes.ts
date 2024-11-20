import {
  NAV_PATH_HOME,
  NAV_PATH_JOBS,
  NAV_PATH_EDUCATION,
  NAV_PATH_SKILLS,
  NAV_PATH_WORKS,
  NAV_PATH_TALKS,
  NAV_PATH_BLOG,
  NAV_PATH_404,
} from './constants';

const routes = [
  {
    path: NAV_PATH_HOME,
    label: 'Home',
  },
  {
    path: NAV_PATH_JOBS,
    label: 'Jobs',
  },
  {
    path: NAV_PATH_EDUCATION,
    label: 'Education',
  },
  {
    path: NAV_PATH_SKILLS,
    label: 'Skills',
  },
  {
    path: NAV_PATH_WORKS,
    label: 'Works',
  },
  {
    path: NAV_PATH_TALKS,
    label: 'Talks',
  },
  {
    path: NAV_PATH_BLOG,
    label: 'Blog',
  },
] as const;

export type Route = (typeof routes)[number]['path'] | typeof NAV_PATH_404;

export default routes;
