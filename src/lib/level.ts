import type { User } from '../data/types';

// Seviye rütbeleri (seviye 1'den itibaren). Üstü "Efsane Satıcı"ya sabitlenir.
const TIERS = [
  'Yeni Üye',
  'Acemi',
  'Çırak Satıcı',
  'Deneyimli Satıcı',
  'Kalfa Satıcı',
  'Usta Satıcı',
  'Üst Düzey Satıcı',
  'Elit Satıcı',
  'Efsane Satıcı',
];

const PER_LEVEL = 100;

export interface LevelInfo {
  level: number;
  tier: string;
  xp: number;
  intoLevel: number; // mevcut seviyenin içindeki puan
  toNext: number; // bir sonraki seviyeye kalan puan
  pct: number; // mevcut seviyedeki ilerleme yüzdesi
  perLevel: number;
}

/**
 * Kullanıcı seviyesi: işlem + değerlendirme + puan'dan türetilen basit XP.
 * Her seviye PER_LEVEL puan; rütbe ismi seviye bandına göre.
 */
export function userLevel(user: Pick<User, 'sales' | 'reviews' | 'score'>): LevelInfo {
  const xp = (user.sales ?? 0) * 10 + (user.reviews ?? 0) * 5 + Math.round((user.score ?? 0) * 8);
  const level = Math.floor(xp / PER_LEVEL) + 1;
  const intoLevel = xp % PER_LEVEL;
  const toNext = PER_LEVEL - intoLevel;
  const pct = Math.round((intoLevel / PER_LEVEL) * 100);
  const tier = TIERS[Math.min(level - 1, TIERS.length - 1)];
  return { level, tier, xp, intoLevel, toNext, pct, perLevel: PER_LEVEL };
}
