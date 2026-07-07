import { categories } from '../data/categories';
import { demands, offers, presentations } from '../data/demands';
import type { UserId } from '../data/types';
import { demandSlug } from '../utils/routes';
import { findUser, getAllUsers } from './session';

export function getUser(username = 'ahmetsafak') {
  return findUser(username) ?? getAllUsers()[0];
}

export function getCategory(categoryId?: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getDemands(categoryId?: string) {
  return demands.filter((demand) => !categoryId || demand.categoryId === categoryId);
}

export function getDemandBySlug(slug = '') {
  return demands.find((demand) => demandSlug(demand) === slug || slug.endsWith(`-${demand.id}`));
}

export function getDemandPresentations(demandId: string) {
  return presentations.filter((presentation) => presentation.demandId === demandId);
}

export function getPresentation(presentationId: string) {
  return presentations.find((presentation) => presentation.id === presentationId || presentation.sellerId === presentationId);
}

export function getDemandOffers(demandId: string) {
  return offers.filter((offer) => offer.demandId === demandId);
}

export function getSellerDemands(userId: UserId) {
  return demands.filter((demand) => demand.ownerId !== userId);
}
