import { categories } from '../data/categories';
import { demands, offers, presentations } from '../data/demands';
import type { CategoryId, UserId } from '../data/types';
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

export function offerCreditEstimate(price: number, categoryId: CategoryId) {
  const categoryMultiplier: Record<CategoryId, number> = {
    foto: 1.2,
    muzik: 1.2,
    sneaker: 1.1,
    saat: 1.5,
    koleksiyon: 1.4,
    teknoloji: 1.05,
    oto: 1.3,
  };
  const rate = price <= 1000 ? 0.01 : price <= 5000 ? 0.006 : price <= 15000 ? 0.0035 : price <= 50000 ? 0.002 : 0.0012;
  return Math.max(1, Math.min(30, Math.round((price * rate * categoryMultiplier[categoryId] * 0.9) / 10)));
}
