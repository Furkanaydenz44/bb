// Demo: dinamik hesaplar (localStorage) için string. Seed kullanıcılar yine bu id'leri kullanır.
export type UserId = string;

export type CategoryId =
  | 'foto'
  | 'muzik'
  | 'sneaker'
  | 'saat'
  | 'koleksiyon'
  | 'teknoloji'
  | 'oto';

export type PresentationStatus = 'submitted' | 'offer_requested' | 'offer_sent' | 'rejected';

export interface User {
  id: UserId;
  username: string;
  name: string;
  avatar: string;
  city: string;
  credits: number;
  score: number;
  reviews: number;
  sales: number;
  responseTime: string;
  completionRate: number;
  trustSignals: string[];
}

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  icon: string;
}

export interface Presentation {
  id: string;
  demandId: string;
  sellerId: UserId;
  condition: string;
  city: string;
  coverImage: string;
  images: string[];
  videos: number;
  description: string;
  status: PresentationStatus;
}

export interface Offer {
  id: string;
  demandId: string;
  sellerId: UserId;
  price: number;
  delivery: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Demand {
  id: string;
  ownerId: UserId;
  categoryId: CategoryId;
  title: string;
  description: string;
  price: number;
  city: string;
  badge: string;
  createdAtLabel: string;
  coverImage: string;
  referenceImages: string[];
  featured?: boolean;
}
