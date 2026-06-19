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

// Sunum: satıcı görselleri gönderir -> alıcı TEKLİF İSTER veya reddeder.
export type PresentationStatus = 'submitted' | 'offer_requested' | 'rejected';
// Teklif: satıcı resmi teklif verir -> pazarlık -> anlaşma.
export type OfferStatus = 'pending' | 'countered' | 'accepted' | 'rejected';
// Anlaşma sonrası teslimat.
export type DealStatus = 'awaiting_shipment' | 'shipped' | 'delivered';

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
  images: string[]; // unsplash id, http URL veya yüklenmiş base64 data URL
  videos: number;
  description: string;
  status: PresentationStatus;
  createdAt?: number;
}

export interface OfferEvent {
  actor: 'buyer' | 'seller';
  action: 'offer' | 'counter' | 'accept' | 'reject';
  price?: number;
  at: number;
}

export interface Offer {
  id: string;
  demandId: string;
  presentationId: string;
  sellerId: UserId;
  buyerId: UserId;
  price: number;
  note?: string;
  delivery?: string;
  status: OfferStatus;
  creditCost?: number;
  createdAt: number;
  history: OfferEvent[];
}

export interface Deal {
  id: string;
  offerId: string;
  demandId: string;
  presentationId: string;
  buyerId: UserId;
  sellerId: UserId;
  price: number;
  status: DealStatus;
  carrier?: string;
  trackingNo?: string;
  createdAt: number;
  deadlineAt?: number; // satıcının kargolaması için son tarih (anlaşma + 3 gün)
  shippedAt?: number;
  deliveredAt?: number;
}

export interface Thread {
  id: string;
  demandId: string;
  presentationId: string;
  buyerId: UserId;
  sellerId: UserId;
  createdAt: number;
  lastAt: number;
}

export type MessageKind = 'text' | 'system' | 'offer' | 'shipping';

export interface Message {
  id: string;
  threadId: string;
  senderId: UserId;
  kind: MessageKind;
  body: string;
  price?: number;
  at: number;
}

export type NotificationKind =
  | 'presentation'
  | 'approved'
  | 'rejected'
  | 'offer'
  | 'counter'
  | 'deal'
  | 'shipped'
  | 'delivered'
  | 'message';

export interface AppNotification {
  id: string;
  userId: UserId;
  kind: NotificationKind;
  text: string;
  href?: string;
  read: boolean;
  at: number;
}

export interface Demand {
  id: string;
  ownerId: UserId;
  categoryId: CategoryId;
  title: string;
  description: string;
  price: number;
  city: string;
  district?: string;
  badge: string;
  createdAtLabel: string;
  coverImage: string;
  referenceImages: string[];
  featured?: boolean;
}
