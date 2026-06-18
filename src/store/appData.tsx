import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  demands as seedDemands,
  offers as seedOffers,
  presentations as seedPresentations,
} from '../data/demands';
import { imageIds } from '../data/images';
import type { CategoryId, Demand, Offer, Presentation, UserId } from '../data/types';
import { demandSlug } from '../utils/routes';

/**
 * Demo veri deposu — talep/sunum/teklif burada yaşar ve localStorage'a kalıcı yazılır.
 * Seed (data/*.ts) salt-okunur taban; kullanıcı oluşturduğu kayıtlar localStorage'da tutulur.
 * Gerçek üründe bu katman API + DB ile değişecek; sayfalar aynı kalır.
 */

const LS = {
  demands: 'bulbana.userDemands',
  presentations: 'bulbana.userPresentations',
  offers: 'bulbana.userOffers',
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function genId() {
  return Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
}

const CATEGORY_COVER: Record<CategoryId, string> = {
  foto: imageIds.polaroid,
  muzik: imageIds.guitar,
  sneaker: imageIds.sneaker,
  saat: imageIds.watch,
  koleksiyon: imageIds.vinyl,
  teknoloji: imageIds.drone,
  oto: imageIds.car,
};

export interface CreateDemandInput {
  ownerId: UserId;
  categoryId: CategoryId;
  title: string;
  description: string;
  price: number;
  city: string;
  referenceImages?: string[];
}

export interface CreatePresentationInput {
  demandId: string;
  sellerId: UserId;
  city: string;
  description?: string;
  condition?: string;
}

interface AppDataValue {
  demands: Demand[];
  presentations: Presentation[];
  offers: Offer[];
  getDemands: (categoryId?: string) => Demand[];
  getDemandByRoute: (slug: string) => Demand | undefined;
  getDemandPresentations: (demandId: string) => Presentation[];
  getDemandOffers: (demandId: string) => Offer[];
  getPresentation: (id: string) => Presentation | undefined;
  createDemand: (input: CreateDemandInput) => Demand;
  createPresentation: (input: CreatePresentationInput) => Presentation;
}

const Ctx = createContext<AppDataValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [userDemands, setUserDemands] = useState<Demand[]>(() => read(LS.demands, []));
  const [userPresentations, setUserPresentations] = useState<Presentation[]>(() => read(LS.presentations, []));
  const [userOffers] = useState<Offer[]>(() => read(LS.offers, []));

  useEffect(() => {
    localStorage.setItem(LS.demands, JSON.stringify(userDemands));
  }, [userDemands]);
  useEffect(() => {
    localStorage.setItem(LS.presentations, JSON.stringify(userPresentations));
  }, [userPresentations]);

  // Kullanıcı oluşturdukları en üstte (en yeni), sonra seed.
  const demands = useMemo(() => [...userDemands, ...seedDemands], [userDemands]);
  const presentations = useMemo(() => [...seedPresentations, ...userPresentations], [userPresentations]);
  const offers = useMemo(() => [...seedOffers, ...userOffers], [userOffers]);

  const value = useMemo<AppDataValue>(
    () => ({
      demands,
      presentations,
      offers,
      getDemands: (categoryId) => demands.filter((d) => !categoryId || d.categoryId === categoryId),
      getDemandByRoute: (slug) =>
        demands.find((d) => demandSlug(d) === slug || slug.endsWith(`-${d.id}`)),
      getDemandPresentations: (demandId) => presentations.filter((p) => p.demandId === demandId),
      getDemandOffers: (demandId) => offers.filter((o) => o.demandId === demandId),
      getPresentation: (id) => presentations.find((p) => p.id === id || p.sellerId === id),
      createDemand: (input) => {
        const demand: Demand = {
          id: genId(),
          ownerId: input.ownerId,
          categoryId: input.categoryId,
          title: input.title.trim() || 'Yeni talep',
          description: input.description.trim() || 'Yeni alıcı talebi.',
          price: input.price || 0,
          city: input.city || 'İstanbul',
          badge: 'Aktif Alıcı',
          createdAtLabel: 'az önce',
          coverImage: input.referenceImages?.[0] || CATEGORY_COVER[input.categoryId] || imageIds.camera,
          referenceImages: input.referenceImages ?? [],
        };
        setUserDemands((prev) => [demand, ...prev]);
        return demand;
      },
      createPresentation: (input) => {
        const demand = demands.find((d) => d.id === input.demandId);
        const cover = demand?.coverImage || CATEGORY_COVER[demand?.categoryId ?? 'foto'] || imageIds.camera;
        const presentation: Presentation = {
          id: genId(),
          demandId: input.demandId,
          sellerId: input.sellerId,
          condition: input.condition || 'İkinci el · iyi durumda',
          city: input.city || 'İstanbul',
          coverImage: cover,
          images: [cover],
          videos: 0,
          description: input.description?.trim() || 'Aradığın ürünü sunuyorum; durum ve detaylar için yaz.',
          status: 'submitted',
        };
        setUserPresentations((prev) => [presentation, ...prev]);
        return presentation;
      },
    }),
    [demands, presentations, offers],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppData() {
  const value = useContext(Ctx);
  if (!value) throw new Error('useAppData AppDataProvider içinde kullanılmalı');
  return value;
}
