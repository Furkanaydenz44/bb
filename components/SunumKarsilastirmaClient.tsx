"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Chip } from "@/components/ui/Chip";

type Cell = { node: ReactNode; best?: boolean };

const gridCols = "grid grid-cols-[150px_1fr_1fr_1fr]";

function DataRow({ label, cells }: { label: string; cells: Cell[] }) {
  return (
    <div className={`${gridCols} border-b border-hairline`}>
      <div className="px-4 py-3.5 text-[12.5px] font-semibold text-ink-500">
        {label}
      </div>
      {cells.map((c, i) => (
        <div
          key={i}
          className={`border-l border-hairline px-4 py-3.5 ${
            c.best ? "bg-[#f7fceb]" : ""
          }`}
        >
          {c.node}
        </div>
      ))}
    </div>
  );
}

function Tile({ children }: { children?: ReactNode }) {
  return (
    <div
      className={`flex h-[52px] w-[52px] items-center justify-center rounded-lg ${
        children
          ? "bg-page text-[11px] font-bold text-ink-500"
          : "ref-image"
      }`}
    >
      {children}
    </div>
  );
}

function DurumEtiket({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-lg bg-page px-2.5 py-1.5 text-[11.5px] font-bold text-ink-900">
      {children}
    </span>
  );
}

export function SunumKarsilastirmaClient() {
  const [mertIstendi, setMertIstendi] = useState(false);

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-16 pt-6">
      {/* Breadcrumb */}
      <nav
        aria-label="Sayfa yolu"
        className="flex flex-wrap items-center gap-1.5 py-1.5 text-[12.5px] font-medium text-ink-400"
      >
        <Link href="/ilan/dawn-fm-imzali-cd" className="text-ink-400 hover:text-primary">
          İmzalı The Weeknd "Dawn FM" CD arıyorum
        </Link>
        <span aria-hidden>›</span>
        <span className="font-semibold text-ink-900">Sunumları Karşılaştır</span>
      </nav>

      <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-[28px] font-extrabold tracking-[-0.7px] text-ink-900">
          Sunumları Karşılaştır
        </h1>
        <Link href="/ilan/dawn-fm-imzali-cd" className="text-[13px] font-semibold">
          ‹ İlana dön
        </Link>
      </div>
      <p className="mb-5 text-[13px] font-medium leading-relaxed text-ink-400">
        Seçtiğin 3 sunum yan yana — bu karşılaştırmayı yalnızca sen görürsün.{" "}
        <span className="rounded-md bg-[#f7fceb] px-2 py-[3px] font-bold text-accent-ink">
          En iyi
        </span>{" "}
        rozetleri satırın öne çıkanını işaretler.
      </p>

      <div className="overflow-x-auto rounded-[18px] border border-border bg-card">
        <div className="min-w-[760px]">
          {/* ── Satıcı başlıkları ── */}
          <div className={`${gridCols} border-b border-hairline`}>
            <div className="self-end px-4 py-[18px] text-[11px] font-bold uppercase tracking-[1px] text-ink-300">
              Satıcı
            </div>

            {/* Kolon 1 — plakdukkani34 */}
            <div className="border-l border-hairline px-4 py-[18px]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-ink-900 text-[12px] font-bold text-accent">
                  PD
                </span>
                <div>
                  <Link
                    href="/satici-profili"
                    className="text-sm font-bold text-ink-900"
                  >
                    plakdukkani34
                  </Link>
                  <div className="mt-[3px] text-[11.5px] font-medium text-ink-400">
                    <span className="text-star">★ 4.8</span> · Mağaza
                  </div>
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <Chip variant="violet">Sohbette</Chip>
                <Link href="/sunum-detay" className="text-[11.5px] font-semibold">
                  Sunumu aç ›
                </Link>
              </div>
            </div>

            {/* Kolon 2 — koleksiyoner.mert */}
            <div className="border-l border-hairline px-4 py-[18px]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary text-[12px] font-bold text-white">
                  KM
                </span>
                <div>
                  <Link
                    href="/satici-profili"
                    className="text-sm font-bold text-ink-900"
                  >
                    koleksiyoner.mert
                  </Link>
                  <div className="mt-[3px] text-[11.5px] font-medium text-ink-400">
                    <span className="text-star">★ 4.6</span> · Bireysel
                  </div>
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                {mertIstendi ? (
                  <span className="rounded-full bg-[#f7fceb] px-[9px] py-1.5 text-[10.5px] font-bold text-accent-ink">
                    Teklif istendi ✓
                  </span>
                ) : (
                  <span className="rounded-full bg-page px-[9px] py-1.5 text-[10.5px] font-bold text-ink-500">
                    Yeni sunum
                  </span>
                )}
                <Link href="/sunum-detay" className="text-[11.5px] font-semibold">
                  Sunumu aç ›
                </Link>
              </div>
            </div>

            {/* Kolon 3 — muzikmarket */}
            <div className="border-l border-hairline px-4 py-[18px]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent text-[12px] font-bold text-ink-900">
                  MM
                </span>
                <div>
                  <Link
                    href="/satici-profili"
                    className="text-sm font-bold text-ink-900"
                  >
                    muzikmarket
                  </Link>
                  <div className="mt-[3px] text-[11.5px] font-medium text-ink-400">
                    <span className="text-star">★ 4.9</span> · Mağaza
                  </div>
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <Chip variant="lime">Teklif istendi · bekleniyor</Chip>
                <Link href="/sunum-detay" className="text-[11.5px] font-semibold">
                  Sunumu aç ›
                </Link>
              </div>
            </div>
          </div>

          {/* ── Fotoğraflar ── */}
          <DataRow
            label="Fotoğraflar"
            cells={[
              {
                node: (
                  <div className="flex gap-1.5">
                    <Tile />
                    <Tile />
                    <Tile>+5</Tile>
                  </div>
                ),
              },
              {
                node: (
                  <div className="flex gap-1.5">
                    <Tile />
                    <Tile />
                    <Tile />
                  </div>
                ),
              },
              {
                node: (
                  <div className="flex gap-1.5">
                    <Tile />
                    <Tile />
                    <Tile>+7</Tile>
                  </div>
                ),
              },
            ]}
          />

          {/* ── Açıklama ── */}
          <DataRow
            label="Açıklama"
            cells={[
              {
                node: (
                  <p className="text-[12.5px] font-medium leading-relaxed text-ink-700">
                    Jelatininde Avrupa baskısı. İmza kartla birlikte, COA
                    sertifikası mevcut.
                  </p>
                ),
              },
              {
                node: (
                  <p className="text-[12.5px] font-medium leading-relaxed text-ink-700">
                    Kişisel koleksiyondan, kapakta imza. Kutuda ince çizik;
                    kitapçık ve disk temiz.
                  </p>
                ),
              },
              {
                node: (
                  <p className="text-[12.5px] font-medium leading-relaxed text-ink-700">
                    Mağaza stoğundan sıfır. Etkinlik imzası, kanıt fotoğraflı.
                    Aynı gün kargo.
                  </p>
                ),
              },
            ]}
          />

          {/* ── Ürün durumu ── */}
          <DataRow
            label="Ürün durumu"
            cells={[
              { node: <DurumEtiket>Yeni · jelatinli</DurumEtiket> },
              { node: <DurumEtiket>Az kullanılmış</DurumEtiket> },
              { node: <DurumEtiket>Yeni · etiketli</DurumEtiket> },
            ]}
          />

          {/* ── İmza kanıtı ── */}
          <DataRow
            label="İmza kanıtı"
            cells={[
              {
                node: (
                  <span className="text-[12.5px] font-semibold text-accent-ink">
                    COA sertifikası ✓
                  </span>
                ),
              },
              {
                node: (
                  <span className="text-[12.5px] font-semibold text-ink-500">
                    Yok — fotoğraf üzerinden
                  </span>
                ),
              },
              {
                node: (
                  <span className="text-[12.5px] font-semibold text-accent-ink">
                    Etkinlik kanıt fotoğrafı ✓
                  </span>
                ),
              },
            ]}
          />

          {/* ── Video ── */}
          <DataRow
            label="Video"
            cells={[
              {
                node: (
                  <span className="text-[12.5px] font-semibold text-accent-ink">
                    ▸ Var
                  </span>
                ),
              },
              {
                node: (
                  <span className="text-[12.5px] font-semibold text-ink-300">
                    —
                  </span>
                ),
              },
              {
                node: (
                  <span className="text-[12.5px] font-semibold text-accent-ink">
                    ▸ Var
                  </span>
                ),
              },
            ]}
          />

          {/* ── Tamamlanan satış ── */}
          <DataRow
            label="Tamamlanan satış"
            cells={[
              {
                node: (
                  <span className="text-[13px] font-bold text-ink-900">214</span>
                ),
              },
              {
                node: (
                  <span className="text-[13px] font-bold text-ink-900">58</span>
                ),
              },
              {
                best: true,
                node: (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-ink-900">
                      1.204
                    </span>
                    <Chip variant="lime">En iyi</Chip>
                  </span>
                ),
              },
            ]}
          />

          {/* ── Ort. yanıt süresi ── */}
          <DataRow
            label="Ort. yanıt süresi"
            cells={[
              {
                best: true,
                node: (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-ink-900">
                      ~1 saat
                    </span>
                    <Chip variant="lime">En iyi</Chip>
                  </span>
                ),
              },
              {
                node: (
                  <span className="text-[13px] font-bold text-ink-900">
                    ~5 saat
                  </span>
                ),
              },
              {
                node: (
                  <span className="text-[13px] font-bold text-ink-900">
                    ~2 saat
                  </span>
                ),
              },
            ]}
          />

          {/* ── Zamanında kargo ── */}
          <DataRow
            label="Zamanında kargo"
            cells={[
              {
                best: true,
                node: (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-ink-900">
                      %98
                    </span>
                    <Chip variant="lime">En iyi</Chip>
                  </span>
                ),
              },
              {
                node: (
                  <span className="text-[13px] font-bold text-ink-900">%91</span>
                ),
              },
              {
                node: (
                  <span className="text-[13px] font-bold text-ink-900">%96</span>
                ),
              },
            ]}
          />

          {/* ── Konum ── */}
          <DataRow
            label="Konum"
            cells={[
              {
                node: (
                  <span className="text-[12.5px] font-medium text-ink-700">
                    Beyoğlu, İstanbul
                  </span>
                ),
              },
              {
                node: (
                  <span className="text-[12.5px] font-medium text-ink-700">
                    Karşıyaka, İzmir
                  </span>
                ),
              },
              {
                node: (
                  <span className="text-[12.5px] font-medium text-ink-700">
                    Şişli, İstanbul
                  </span>
                ),
              },
            ]}
          />

          {/* ── Sunum tarihi ── */}
          <DataRow
            label="Sunum tarihi"
            cells={[
              {
                node: (
                  <span className="text-[12.5px] font-medium text-ink-700">
                    Dün
                  </span>
                ),
              },
              {
                node: (
                  <span className="text-[12.5px] font-medium text-ink-700">
                    5 saat önce
                  </span>
                ),
              },
              {
                node: (
                  <span className="text-[12.5px] font-medium text-ink-700">
                    Dün
                  </span>
                ),
              },
            ]}
          />

          {/* ── Aksiyon ── */}
          <div className={`${gridCols} bg-subtle`}>
            <div className="p-4" />
            <div className="border-l border-hairline p-4">
              <Link
                href="/mesajlar"
                className="block rounded-[11px] bg-primary px-3 py-3.5 text-center text-[13px] font-bold text-white transition-colors hover:bg-primary-hover"
              >
                Sohbete Git
              </Link>
            </div>
            <div className="border-l border-hairline p-4">
              {mertIstendi ? (
                <div className="rounded-[11px] bg-[#f7fceb] px-3 py-3.5 text-center text-[12.5px] font-bold leading-tight text-accent-ink">
                  Satıcıya iletildi ✓
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setMertIstendi(true)}
                  className="w-full cursor-pointer rounded-[11px] bg-ink-900 px-3 py-3.5 text-center text-[13px] font-bold text-white transition-colors hover:bg-footer"
                >
                  Teklif İste
                </button>
              )}
            </div>
            <div className="border-l border-hairline p-4">
              <div className="rounded-[11px] bg-page px-3 py-3.5 text-center text-[12.5px] font-bold leading-tight text-ink-500">
                Yanıt bekleniyor…
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3.5 px-0.5 text-[12px] font-medium leading-relaxed text-ink-300">
        Satış, yanıt ve kargo metrikleri satıcının BulBana geçmişinden gelir.
        Teklif istemek ücretsizdir; fiyat pazarlığı teklif sonrası açılan
        sohbette yapılır.
      </p>
    </main>
  );
}
