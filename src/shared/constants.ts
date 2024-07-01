// NAV PATHS
export const NAV_PATH_HOME = 'home';
export const NAV_PATH_JOBS = 'jobs';
export const NAV_PATH_EDUCATION = 'education';
export const NAV_PATH_SKILLS = 'skills';
export const NAV_PATH_WORKS = 'works';
export const NAV_PATH_TALKS = 'talks';

export const THEMES = ['red', 'green', 'purple', 'blue'] as const;
export const THEME_DEFAULT = 'red';

export type Themes = (typeof THEMES)[number];
