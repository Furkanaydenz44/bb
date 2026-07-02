import type { CategoryId } from '../data/types';

/**
 * Demo: kullanıcının Keşfet dışında hangi kategori/ilanlarda gezindiğini
 * tarayıcıda (localStorage) sayar. "Sana Özel" önerileri bu sayımdan beslenir.
 */

const KEY_PREFIX = 'bulbana.browsingHistory.';

interface CategoryStat {
  count: number;
  lastAt: number;
}

type HistoryMap = Partial<Record<CategoryId, CategoryStat>>;

function read(userId: string): HistoryMap {
  try {
    const raw = localStorage.getItem(KEY_PREFIX + userId);
    return raw ? (JSON.parse(raw) as HistoryMap) : {};
  } catch {
    return {};
  }
}

function write(userId: string, data: HistoryMap) {
  try {
    localStorage.setItem(KEY_PREFIX + userId, JSON.stringify(data));
  } catch {
    // kota dolu olabilir, sessizce yok say
  }
}

export function recordCategoryView(userId: string, categoryId: CategoryId) {
  if (typeof window === 'undefined' || !userId || !categoryId) return;
  const data = read(userId);
  const prev = data[categoryId];
  data[categoryId] = { count: (prev?.count ?? 0) + 1, lastAt: Date.now() };
  write(userId, data);
}

export function getTopCategories(userId: string, limit = 3): CategoryId[] {
  if (typeof window === 'undefined' || !userId) return [];
  const data = read(userId);
  return (Object.entries(data) as [CategoryId, CategoryStat][])
    .sort((a, b) => b[1].count - a[1].count || b[1].lastAt - a[1].lastAt)
    .slice(0, limit)
    .map(([categoryId]) => categoryId);
}
