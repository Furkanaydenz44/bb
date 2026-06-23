'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  demands as seedDemands,
  offers as seedOffers,
  presentations as seedPresentations,
} from '../data/demands';
import { imageIds } from '../data/images';
import type {
  AppNotification,
  CategoryId,
  Deal,
  Demand,
  Message,
  MessageKind,
  NotificationKind,
  Offer,
  Presentation,
  Thread,
  UserId,
} from '../data/types';
import { findUser } from '../services/session';
import { offerCreditCost } from '../lib/credits';
import { demandSlug } from '../utils/routes';

/**
 * Çalışan akış deposu (localStorage kalıcı). Supabase gelene kadar tüm iş mantığı burada:
 * talep → sunum(görsel) → onay → sohbet → teklif → pazarlık → anlaşma → kargo → takip + bildirim.
 */

const LS = {
  demands: 'bulbana.userDemands',
  presentations: 'bulbana.userPresentations',
  presentationPatches: 'bulbana.presentationPatches',
  offers: 'bulbana.offers',
  deals: 'bulbana.deals',
  threads: 'bulbana.threads',
  messages: 'bulbana.messages',
  notifications: 'bulbana.notifications',
  creditDeltas: 'bulbana.creditDeltas',
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function genId() {
  return Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
}

function nameOf(userId: UserId) {
  return findUser(userId)?.name ?? 'Bir kullanıcı';
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
  district?: string;
  condition?: string;
  hasDefect?: string;
  referenceImages?: string[];
}

export interface CreatePresentationInput {
  demandId: string;
  sellerId: UserId;
  city: string;
  description?: string;
  condition?: string;
  images?: string[];
  videos?: number;
}

export interface SendOfferInput {
  presentationId: string;
  price: number;
  note?: string;
  delivery?: string;
}

interface AppDataValue {
  demands: Demand[];
  presentations: Presentation[];
  offers: Offer[];
  deals: Deal[];
  threads: Thread[];
  messages: Message[];
  notifications: AppNotification[];

  // --- selectors ---
  getDemands: (categoryId?: string) => Demand[];
  getDemandByRoute: (slug: string) => Demand | undefined;
  getDemandPresentations: (demandId: string) => Presentation[];
  getDemandOffers: (demandId: string) => Offer[];
  getPresentation: (id: string) => Presentation | undefined;
  getOfferForPresentation: (presentationId: string) => Offer | undefined;
  getOffer: (offerId: string) => Offer | undefined;
  getDeal: (dealId: string) => Deal | undefined;
  getDealForPresentation: (presentationId: string) => Deal | undefined;
  getThread: (threadId: string) => Thread | undefined;
  findThread: (demandId: string, buyerId: UserId, sellerId: UserId) => Thread | undefined;
  getUserThreads: (userId: UserId) => Thread[];
  getThreadMessages: (threadId: string) => Message[];
  getUserNotifications: (userId: UserId) => AppNotification[];
  unreadCount: (userId: UserId) => number;
  creditsOf: (userId: UserId) => number;

  // --- actions ---
  createDemand: (input: CreateDemandInput) => Demand;
  createPresentation: (input: CreatePresentationInput) => Presentation;
  requestOffer: (presentationId: string, byUserId: UserId) => void;
  rejectPresentation: (presentationId: string, byUserId: UserId) => void;
  sendOffer: (input: SendOfferInput, byUserId: UserId) => Thread | undefined;
  counterOffer: (offerId: string, price: number, byUserId: UserId, note?: string) => void;
  acceptOffer: (offerId: string, byUserId: UserId) => Deal | undefined;
  rejectOffer: (offerId: string, byUserId: UserId) => void;
  markShipped: (dealId: string, info: { trackingNo?: string; carrier?: string }, byUserId: UserId) => void;
  markDelivered: (dealId: string, byUserId: UserId) => void;
  sendMessage: (threadId: string, senderId: UserId, body: string) => void;
  markNotificationsRead: (userId: UserId) => void;
}

const Ctx = createContext<AppDataValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [userDemands, setUserDemands] = useState<Demand[]>(() => read(LS.demands, []));
  const [userPresentations, setUserPresentations] = useState<Presentation[]>(() => read(LS.presentations, []));
  const [presentationPatches, setPresentationPatches] = useState<Record<string, Partial<Presentation>>>(() =>
    read(LS.presentationPatches, {}),
  );
  const [offers, setOffers] = useState<Offer[]>(() => read(LS.offers, []));
  const [deals, setDeals] = useState<Deal[]>(() => read(LS.deals, []));
  const [threads, setThreads] = useState<Thread[]>(() => read(LS.threads, []));
  const [messages, setMessages] = useState<Message[]>(() => read(LS.messages, []));
  const [notifications, setNotifications] = useState<AppNotification[]>(() => read(LS.notifications, []));
  const [creditDeltas, setCreditDeltas] = useState<Record<string, number>>(() => read(LS.creditDeltas, {}));

  useEffect(() => void localStorage.setItem(LS.demands, JSON.stringify(userDemands)), [userDemands]);
  useEffect(() => void localStorage.setItem(LS.presentations, JSON.stringify(userPresentations)), [userPresentations]);
  useEffect(() => void localStorage.setItem(LS.presentationPatches, JSON.stringify(presentationPatches)), [presentationPatches]);
  useEffect(() => void localStorage.setItem(LS.offers, JSON.stringify(offers)), [offers]);
  useEffect(() => void localStorage.setItem(LS.deals, JSON.stringify(deals)), [deals]);
  useEffect(() => void localStorage.setItem(LS.threads, JSON.stringify(threads)), [threads]);
  useEffect(() => void localStorage.setItem(LS.messages, JSON.stringify(messages)), [messages]);
  useEffect(() => void localStorage.setItem(LS.notifications, JSON.stringify(notifications)), [notifications]);
  useEffect(() => void localStorage.setItem(LS.creditDeltas, JSON.stringify(creditDeltas)), [creditDeltas]);

  const demands: Demand[] = [...userDemands, ...seedDemands];
  const presentations: Presentation[] = [...seedPresentations, ...userPresentations].map((p) =>
    presentationPatches[p.id] ? { ...p, ...presentationPatches[p.id] } : p,
  );
  const allOffers: Offer[] = [...offers, ...seedOffers];

  // ---- internal helpers (capture current render state) ----
  const notify = (userId: UserId, kind: NotificationKind, text: string, href?: string) =>
    setNotifications((prev) => [
      { id: genId(), userId, kind, text, href, read: false, at: Date.now() },
      ...prev,
    ]);

  const pushMessage = (threadId: string, senderId: UserId, kind: MessageKind, body: string, price?: number) => {
    const at = Date.now();
    setMessages((prev) => [...prev, { id: genId(), threadId, senderId, kind, body, price, at }]);
    setThreads((prev) => prev.map((t) => (t.id === threadId ? { ...t, lastAt: at } : t)));
  };

  const patchPresentation = (id: string, patch: Partial<Presentation>) =>
    setPresentationPatches((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const patchOffer = (id: string, patch: Partial<Offer>) =>
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  const ensureThread = (demandId: string, presentationId: string, buyerId: UserId, sellerId: UserId): Thread => {
    const existing = threads.find((t) => t.demandId === demandId && t.buyerId === buyerId && t.sellerId === sellerId);
    if (existing) return existing;
    const now = Date.now();
    const thread: Thread = { id: genId(), demandId, presentationId, buyerId, sellerId, createdAt: now, lastAt: now };
    setThreads((prev) => [...prev, thread]);
    return thread;
  };

  const threadHref = (t: Thread) => `/mesajlar/${t.id}`;

  const creditsOf = (userId: UserId) => (findUser(userId)?.credits ?? 0) + (creditDeltas[userId] ?? 0);

  const value: AppDataValue = {
    demands,
    presentations,
    offers: allOffers,
    deals,
    threads,
    messages,
    notifications,

    getDemands: (categoryId) => demands.filter((d) => !categoryId || d.categoryId === categoryId),
    getDemandByRoute: (slug) => demands.find((d) => demandSlug(d) === slug || slug.endsWith(`-${d.id}`)),
    getDemandPresentations: (demandId) => presentations.filter((p) => p.demandId === demandId),
    getDemandOffers: (demandId) => allOffers.filter((o) => o.demandId === demandId),
    getPresentation: (id) => presentations.find((p) => p.id === id || p.sellerId === id),
    getOfferForPresentation: (presentationId) => allOffers.find((o) => o.presentationId === presentationId),
    getOffer: (offerId) => allOffers.find((o) => o.id === offerId),
    getDeal: (dealId) => deals.find((d) => d.id === dealId),
    getDealForPresentation: (presentationId) => deals.find((d) => d.presentationId === presentationId),
    getThread: (threadId) => threads.find((t) => t.id === threadId),
    findThread: (demandId, buyerId, sellerId) =>
      threads.find((t) => t.demandId === demandId && t.buyerId === buyerId && t.sellerId === sellerId),
    getUserThreads: (userId) =>
      threads
        .filter((t) => t.buyerId === userId || t.sellerId === userId)
        .sort((a, b) => b.lastAt - a.lastAt),
    getThreadMessages: (threadId) =>
      messages.filter((m) => m.threadId === threadId).sort((a, b) => a.at - b.at),
    getUserNotifications: (userId) =>
      notifications.filter((n) => n.userId === userId).sort((a, b) => b.at - a.at),
    unreadCount: (userId) => notifications.filter((n) => n.userId === userId && !n.read).length,
    creditsOf,

    createDemand: (input) => {
      const demand: Demand = {
        id: genId(),
        ownerId: input.ownerId,
        categoryId: input.categoryId,
        title: input.title.trim() || 'Yeni talep',
        description: input.description.trim() || 'Yeni alıcı talebi.',
        price: input.price || 0,
        city: input.city || 'İstanbul',
        district: input.district?.trim() || undefined,
        condition: input.condition || undefined,
        hasDefect: input.hasDefect || undefined,
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
      const images = input.images && input.images.length ? input.images : [demand?.coverImage || CATEGORY_COVER[demand?.categoryId ?? 'foto']];
      const presentation: Presentation = {
        id: genId(),
        demandId: input.demandId,
        sellerId: input.sellerId,
        condition: input.condition || 'İkinci el · iyi durumda',
        city: input.city || 'İstanbul',
        coverImage: images[0],
        images,
        videos: input.videos ?? 0,
        description: input.description?.trim() || 'Aradığın ürünü sunuyorum.',
        status: 'submitted',
        createdAt: Date.now(),
      };
      setUserPresentations((prev) => [presentation, ...prev]);
      if (demand) {
        notify(demand.ownerId, 'presentation', `${nameOf(input.sellerId)} talebine ürün sundu`, `/ilan/${demandSlug(demand)}`);
      }
      return presentation;
    },

    requestOffer: (presentationId, byUserId) => {
      const pres = presentations.find((p) => p.id === presentationId);
      const demand = pres && demands.find((d) => d.id === pres.demandId);
      if (!pres || !demand) return;
      patchPresentation(presentationId, { status: 'offer_requested' });
      const sellerName = findUser(pres.sellerId)?.username ?? pres.sellerId;
      notify(
        pres.sellerId,
        'approved',
        `${nameOf(demand.ownerId)} sunumunu beğendi — senden resmi teklif istiyor`,
        `/ilan/${demandSlug(demand)}/sunum/${sellerName}`,
      );
    },

    rejectPresentation: (presentationId, byUserId) => {
      const pres = presentations.find((p) => p.id === presentationId);
      if (!pres) return;
      patchPresentation(presentationId, { status: 'rejected' });
      notify(pres.sellerId, 'rejected', `${nameOf(byUserId)} sunumunu beğenmedi`, undefined);
    },

    sendOffer: (input, byUserId) => {
      const pres = presentations.find((p) => p.id === input.presentationId);
      const demand = pres && demands.find((d) => d.id === pres.demandId);
      if (!pres || !demand) return undefined;
      const existing = allOffers.find((o) => o.presentationId === pres.id);
      if (existing) return ensureThread(demand.id, pres.id, demand.ownerId, pres.sellerId); // teklif zaten var; sohbete götür
      const cost = offerCreditCost(demand, findUser(demand.ownerId)?.score);
      if (creditsOf(byUserId) < cost) return undefined; // kredi yetersiz
      setCreditDeltas((prev) => ({ ...prev, [byUserId]: (prev[byUserId] ?? 0) - cost }));
      const at = Date.now();
      const offer: Offer = {
        id: genId(),
        demandId: demand.id,
        presentationId: pres.id,
        sellerId: pres.sellerId,
        buyerId: demand.ownerId,
        price: input.price,
        note: input.note,
        delivery: input.delivery,
        status: 'pending',
        creditCost: cost,
        createdAt: at,
        history: [{ actor: 'seller', action: 'offer', price: input.price, at }],
      };
      setOffers((prev) => [offer, ...prev]);
      const thread = ensureThread(demand.id, pres.id, demand.ownerId, pres.sellerId);
      pushMessage(thread.id, byUserId, 'system', `Sohbet açıldı · teklif maliyeti ${cost} kredi (ilanda yalnız 1 kez; pazarlık ücretsiz).`);
      pushMessage(thread.id, byUserId, 'offer', input.note?.trim() ?? '', input.price);
      notify(demand.ownerId, 'offer', `${nameOf(pres.sellerId)} ${input.price.toLocaleString('tr-TR')}₺ resmi teklif verdi`, threadHref(thread));
      return thread;
    },

    counterOffer: (offerId, price, byUserId, note) => {
      const offer = allOffers.find((o) => o.id === offerId);
      if (!offer) return;
      const isBuyer = byUserId === offer.buyerId;
      patchOffer(offerId, {
        status: 'countered',
        price,
        history: [...offer.history, { actor: isBuyer ? 'buyer' : 'seller', action: 'counter', price, at: Date.now() }],
      });
      const thread = ensureThread(offer.demandId, offer.presentationId, offer.buyerId, offer.sellerId);
      pushMessage(thread.id, byUserId, 'offer', note?.trim() ?? '', price);
      const other = isBuyer ? offer.sellerId : offer.buyerId;
      notify(other, 'counter', `${nameOf(byUserId)} karşı teklif verdi: ${price.toLocaleString('tr-TR')}₺`, threadHref(thread));
    },

    acceptOffer: (offerId, byUserId) => {
      const offer = allOffers.find((o) => o.id === offerId);
      if (!offer) return undefined;
      patchOffer(offerId, {
        status: 'accepted',
        history: [...offer.history, { actor: byUserId === offer.buyerId ? 'buyer' : 'seller', action: 'accept', price: offer.price, at: Date.now() }],
      });
      const deal: Deal = {
        id: genId(),
        offerId: offer.id,
        demandId: offer.demandId,
        presentationId: offer.presentationId,
        buyerId: offer.buyerId,
        sellerId: offer.sellerId,
        price: offer.price,
        status: 'awaiting_shipment',
        createdAt: Date.now(),
        deadlineAt: Date.now() + 3 * 24 * 60 * 60 * 1000,
      };
      setDeals((prev) => [deal, ...prev]);
      const thread = ensureThread(offer.demandId, offer.presentationId, offer.buyerId, offer.sellerId);
      pushMessage(thread.id, byUserId, 'system', `Anlaşma sağlandı: ${offer.price.toLocaleString('tr-TR')}₺. Satıcı 3 gün içinde kargolamalı; kargo no + firma sohbete yazılacak.`);
      notify(offer.sellerId, 'deal', `Anlaşma! ${offer.price.toLocaleString('tr-TR')}₺ — 3 gün içinde kargola`, threadHref(thread));
      notify(offer.buyerId, 'deal', `Anlaşma sağlandı: ${offer.price.toLocaleString('tr-TR')}₺`, threadHref(thread));
      return deal;
    },

    rejectOffer: (offerId, byUserId) => {
      const offer = allOffers.find((o) => o.id === offerId);
      if (!offer) return;
      patchOffer(offerId, {
        status: 'rejected',
        history: [...offer.history, { actor: byUserId === offer.buyerId ? 'buyer' : 'seller', action: 'reject', at: Date.now() }],
      });
      const thread = ensureThread(offer.demandId, offer.presentationId, offer.buyerId, offer.sellerId);
      pushMessage(thread.id, byUserId, 'system', 'Teklif reddedildi.');
      const other = byUserId === offer.buyerId ? offer.sellerId : offer.buyerId;
      notify(other, 'offer', `${nameOf(byUserId)} teklifi reddetti`, threadHref(thread));
    },

    markShipped: (dealId, info, byUserId) => {
      const deal = deals.find((d) => d.id === dealId);
      if (!deal) return;
      setDeals((prev) =>
        prev.map((d) =>
          d.id === dealId ? { ...d, status: 'shipped', carrier: info.carrier, trackingNo: info.trackingNo, shippedAt: Date.now() } : d,
        ),
      );
      const thread = ensureThread(deal.demandId, deal.presentationId, deal.buyerId, deal.sellerId);
      pushMessage(
        thread.id,
        byUserId,
        'shipping',
        `Kargolandı${info.carrier ? ' · ' + info.carrier : ''}${info.trackingNo ? ' · Takip no: ' + info.trackingNo : ''}`,
      );
      notify(deal.buyerId, 'shipped', `Siparişin kargolandı${info.trackingNo ? ' — takip: ' + info.trackingNo : ''}`, threadHref(thread));
    },

    markDelivered: (dealId, byUserId) => {
      const deal = deals.find((d) => d.id === dealId);
      if (!deal) return;
      setDeals((prev) => prev.map((d) => (d.id === dealId ? { ...d, status: 'delivered', deliveredAt: Date.now() } : d)));
      const thread = ensureThread(deal.demandId, deal.presentationId, deal.buyerId, deal.sellerId);
      pushMessage(thread.id, byUserId, 'system', 'Teslim alındı — işlem tamamlandı. 🎉');
      notify(deal.sellerId, 'delivered', `${nameOf(deal.buyerId)} teslim aldı — işlem tamamlandı`, threadHref(thread));
    },

    sendMessage: (threadId, senderId, body) => {
      const text = body.trim();
      if (!text) return;
      const thread = threads.find((t) => t.id === threadId);
      pushMessage(threadId, senderId, 'text', text);
      if (thread) {
        const other = senderId === thread.buyerId ? thread.sellerId : thread.buyerId;
        notify(other, 'message', `${nameOf(senderId)}: ${text.slice(0, 40)}`, `/mesajlar/${threadId}`);
      }
    },

    markNotificationsRead: (userId) =>
      setNotifications((prev) => prev.map((n) => (n.userId === userId ? { ...n, read: true } : n))),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppData() {
  const value = useContext(Ctx);
  if (!value) throw new Error('useAppData AppDataProvider içinde kullanılmalı');
  return value;
}
