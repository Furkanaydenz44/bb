import type { CategoryId, Demand } from '../data/types';

// Kategori bazlı çarpan (nadir/değerli kategoriler daha pahalı lead).
const CATEGORY_MULTIPLIER: Record<CategoryId, number> = {
  foto: 1.2,
  muzik: 1.2,
  sneaker: 1.1,
  saat: 1.5,
  koleksiyon: 1.4,
  teknoloji: 1.05,
  oto: 1.3,
};

// Alıcı kalitesi: daha yüksek puanlı/ciddi alıcı = daha değerli lead = biraz daha yüksek kredi.
function buyerQualityFactor(buyerScore = 4.5): number {
  return Math.max(0.85, Math.min(1.2, 0.9 + (buyerScore - 4) * 0.25));
}

/**
 * Bir ilana resmi teklif vermenin KREDİ maliyeti.
 * formül(kategori, ürün/fiyat, alıcı kalitesi) — her ilanda farklı, 1..30 arası.
 * Bu bedel ilanda 1 KEZ (ilk teklifte) ödenir; revize/pazarlık ücretsizdir.
 */
export function offerCreditCost(demand: Pick<Demand, 'price' | 'categoryId'>, buyerScore?: number): number {
  const price = demand.price || 0;
  const rate =
    price <= 1000 ? 0.01 : price <= 5000 ? 0.006 : price <= 15000 ? 0.0035 : price <= 50000 ? 0.002 : 0.0012;
  const cat = CATEGORY_MULTIPLIER[demand.categoryId] ?? 1;
  const cost = (price * rate * cat * buyerQualityFactor(buyerScore)) / 10;
  return Math.max(1, Math.min(30, Math.round(cost)));
}
