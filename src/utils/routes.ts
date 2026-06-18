import type { Demand, User } from '../data/types';

export const APP_BASE = '/bulbana-web';

export function slugify(value: string) {
  return value
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function demandSlug(demand: Demand) {
  return `${slugify(demand.title)}-${demand.id}`;
}

export function userBase(userOrUsername: Pick<User, 'username'> | string) {
  const username = typeof userOrUsername === 'string' ? userOrUsername.replace(/^@/, '') : userOrUsername.username;
  return `${APP_BASE}/@${username}`;
}

export function categoryPath(username: string, categoryId: string) {
  return `${userBase(username)}/kategori/${categoryId}`;
}

export function demandPath(username: string, demand: Demand) {
  return `${userBase(username)}/ilan/${demandSlug(demand)}`;
}

export function presentationPath(username: string, demand: Demand, presentationId: string) {
  return `${demandPath(username, demand)}/sunum/${presentationId}`;
}
