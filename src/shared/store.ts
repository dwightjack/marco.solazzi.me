import { atom } from 'nanostores';
import { NAV_PATH_HOME, THEMES, THEME_DEFAULT } from './constants';
import type { Route } from './routes';

export const menuExpanded = atom(false);
export const currentRoute = atom<Route>(NAV_PATH_HOME);
export const theme = atom<(typeof THEMES)[number]>(THEME_DEFAULT);
