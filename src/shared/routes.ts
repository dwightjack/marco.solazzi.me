import {
  NAV_PATH_HOME,
  NAV_PATH_JOBS,
  NAV_PATH_EDUCATION,
  NAV_PATH_SKILLS,
  NAV_PATH_WORKS,
  NAV_PATH_TALKS,
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
] as const;

export type Route = (typeof routes)[number]['path'];

export default routes;
