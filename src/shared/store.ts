import { atom } from 'nanostores';
import { NAV_PATH_HOME } from './constants';
import type { Route } from './routes';

export const menuExpanded = atom(false);
export const currentRoute = atom<Route>(NAV_PATH_HOME);

currentRoute.subscribe(console.log);
