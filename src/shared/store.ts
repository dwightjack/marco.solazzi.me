import { atom } from 'nanostores';
import { NAV_PATH_HOME, type Themes, THEME_DEFAULT } from './constants';
import type { Route } from './routes';

export const currentRoute = atom<Route>(NAV_PATH_HOME);
export const theme = atom<Themes>(THEME_DEFAULT);
