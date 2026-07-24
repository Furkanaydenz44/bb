"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Talep } from "@/lib/data";
import { fiyatText, talepGorselleri, talepNo } from "@/lib/data";
import { Chip } from "@/components/ui/Chip";
import { Button, ButtonLink } from "@/components/ui/Button";
import { TalepCard } from "@/components/TalepCard";
import { SunumModal } from "@/components/SunumModal";

// İlan Aç formundaki alanların birebir yansıması — alıcının aradığı ürünün
// tarifi. Değeri olmayan satırlar gizlenir.
const detaySatirlari = (t: Talep) => {
  const defo =
    t.defoKabul === undefined
      ? null
      : t.defoKabul
        ? "Defolu olabilir"
        : "Defosuz olmalı";
  return [
    { k: "Kategori", v: t.kategori },
    { k: "Marka / sanatçı", v: t.marka },
    { k: "Model", v: t.model ?? null },
    { k: "Yıl", v: t.yil ?? null },
    { k: "Renk", v: t.renk ?? null },
    { k: "Kabul edilen durum", v: t.durum },
    { k: "Ürün defosu", v: defo },
    { k: "Konum", v: `${t.ilce}, ${t.il}` },
  ].filter((r): r is { k: string; v: string } => Boolean(r.v));
};

// 5 üzerinden yıldız puanı — yan yana yıldızlar, puana göre kısmi dolu.
function Yildizlar({ puan }: { puan: number }) {
  const yuzde = Math.max(0, Math.min(100, (puan / 5) * 100));
  const yildiz = (
    <svg
      viewBox="0 0 24 24"
      className="h-[16px] w-[16px] flex-none"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.4l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.4l-5.9 3.1 1.13-6.57L2.45 9.34l6.6-.96z" />
    </svg>
  );
  return (
    <span
      className="relative inline-flex flex-none"
      role="img"
      aria-label={`5 üzerinden ${puan} yıldız`}
    >
      <span className="flex text-[#d7d1e4]">
        {yildiz}
        {yildiz}
        {yildiz}
        {yildiz}
        {yildiz}
      </span>
      <span
        className="absolute inset-0 flex overflow-hidden text-star"
        style={{ width: `${yuzde}%` }}
      >
        {yildiz}
        {yildiz}
        {yildiz}
        {yildiz}
        {yildiz}
      </span>
    </span>
  );
}

export function IlanDetay({
  talep,
  benzer,
}: {
  talep: Talep;
  benzer: Talep[];
}) {
  const [aktifFoto, setAktifFoto] = useState(0);
  const [modal, setModal] = useState(false);
  const [takip, setTakip] = useState(false);
  const [kopyalandi, setKopyalandi] = useState(false);
  const [bildirildi, setBildirildi] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const gorseller = talepGorselleri(talep.id);
  const varMi = gorseller.length > 0;

  const ileri = () => setAktifFoto((i) => (i + 1) % gorseller.length);
  const geri = () =>
    setAktifFoto((i) => (i - 1 + gorseller.length) % gorseller.length);

  useEffect(() => {
    if (!lightbox) return;
    const n = gorseller.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      else if (e.key === "ArrowRight") setAktifFoto((i) => (i + 1) % n);
      else if (e.key === "ArrowLeft") setAktifFoto((i) => (i - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, gorseller.length]);

  const talebiPaylas = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setKopyalandi(true);
        setTimeout(() => setKopyalandi(false), 2000);
      });
    }
  };

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-16 pt-5">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
        <nav
          aria-label="Sayfa yolu"
          className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-ink-400"
        >
          <Link href="/" className="text-ink-400 hover:text-primary">
            Ana Sayfa
          </Link>
          <span aria-hidden>›</span>
          <Link href="/kesfet" className="text-ink-400 hover:text-primary">
            {talep.kategori}
          </Link>
          <span aria-hidden>›</span>
          <span className="font-semibold text-ink-900">{talep.baslik}</span>
        </nav>
        <span className="whitespace-nowrap text-[11.5px] font-medium text-ink-400">
          Talep no:{" "}
          <span className="font-semibold text-ink-500">{talepNo(talep.id)}</span>
        </span>
      </div>

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_384px]">
        {/* ── Sol sütun ── */}
        <div className="flex flex-col gap-4">
          {/* Galeri + Talep detayları (yan yana) */}
          <section className="rounded-panel border border-border bg-card p-5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              {/* Galeri: dikey küçük görsel rayı + ana görsel */}
              <div className="flex gap-3 lg:flex-none">
                <div className="flex flex-col gap-2.5">
                  {(varMi ? gorseller : ["", "", ""]).map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAktifFoto(i)}
                      aria-label={`${i + 1}. görsel`}
                      className={`relative h-14 w-14 flex-none overflow-hidden rounded-lg border-2 transition-colors ${
                        varMi ? "bg-subtle" : "ref-image"
                      } ${
                        aktifFoto === i
                          ? "border-primary shadow-[0_0_0_3px_var(--color-primary-soft)]"
                          : "border-border hover:border-border-input"
                      }`}
                    >
                      {varMi && (
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  disabled={!varMi}
                  aria-label="Görseli büyüt ve incele"
                  className={`group relative aspect-[3/4] w-full max-w-[290px] flex-1 overflow-hidden rounded-2xl border border-border lg:w-[290px] lg:flex-none ${
                    varMi
                      ? "cursor-zoom-in bg-subtle"
                      : "ref-image flex cursor-default items-center justify-center"
                  }`}
                >
                  {varMi ? (
                    <Image
                      src={gorseller[aktifFoto]}
                      alt={`${talep.baslik} — görsel ${aktifFoto + 1}`}
                      fill
                      sizes="290px"
                      className="object-contain"
                      priority
                    />
                  ) : (
                    <span className="font-mono text-[11px] text-[#968cac]">
                      referans görsel {aktifFoto + 1}
                    </span>
                  )}
                  <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-accent px-2.5 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[1.2px] text-ink-900">
                    Talep
                  </span>
                  {varMi && (
                    <span className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full bg-ink-900/75 px-2.5 py-1.5 text-[11px] font-semibold text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                      🔍 İncele
                    </span>
                  )}
                </button>
              </div>

              {/* Talep detayları */}
              <div className="min-w-0 flex-1 lg:border-l lg:border-hairline lg:pl-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-primary">
                      Beklentiler
                    </p>
                    <h2 className="mt-1 text-lg font-extrabold text-ink-900">
                      Talep detayları
                    </h2>
                  </div>
                  <span className="whitespace-nowrap rounded-md bg-page px-2 py-1 text-[11px] font-bold text-ink-400">
                    {varMi ? `${gorseller.length} görsel` : "3 görsel"}
                  </span>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-5">
                  {(() => {
                    const detay = detaySatirlari(talep);
                    // Son satırdaki hücrelerin alt çizgisini kaldır (2 sütun).
                    const sonSatirBasi = Math.floor((detay.length - 1) / 2) * 2;
                    return detay.map((row, i) => (
                      <div
                        key={row.k}
                        className={`py-2.5 ${
                          i < sonSatirBasi ? "border-b border-hairline" : ""
                        }`}
                      >
                        <dt className="text-[10.5px] font-bold uppercase tracking-[0.05em] text-ink-400">
                          {row.k}
                        </dt>
                        <dd className="mt-1 text-sm font-bold text-ink-900">
                          {row.v}
                        </dd>
                      </div>
                    ));
                  })()}
                </dl>
                <p className="mt-3 text-[12px] leading-relaxed text-ink-400">
                  Görseller yalnızca modeli ve beklenen genel kondisyonu anlatmak
                  için eklendi; teslimatta ürünün açıklamaya uygunluğu esastır.
                </p>
              </div>
            </div>
          </section>

          {/* Talep notu */}
          <section className="rounded-panel border border-border bg-card p-6">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-primary">
              Talep notu
            </p>
            <h2 className="mt-1 text-lg font-extrabold text-ink-900">
              Aradığım ürün hakkında
            </h2>
            <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-ink-700">
              <p>
                {talep.baslik}. Ürünün orijinal, temiz ve açıklamaya uygun olması
                önemli. Kutulu ve faturalı olması tercih sebebi.
              </p>
              <p>
                Ürünü {talep.ilce}, {talep.il} adresime kargoyla göndermeni
                bekliyorum; ödeme, sen ürünü teslim edene kadar BulBana
                güvencesinde tutulur.
              </p>
            </div>
            <div className="mt-5 rounded-2xl border border-accent-soft bg-accent-soft/60 p-4">
              <h3 className="text-sm font-bold text-ink-900">Olmazsa olmazlar</h3>
              <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-ink-700">
                <li>✓ Açıklamaya uygun kondisyon</li>
                <li>✓ Orijinal ürün</li>
                <li>✓ Kutu ve fatura tercihli</li>
              </ul>
            </div>
          </section>
        </div>

        {/* ── Sağ sütun (sticky) ── */}
        <aside className="lg:sticky lg:top-[150px]">
          <div className="rounded-[24px] border border-primary/25 bg-gradient-to-b from-primary-soft/40 to-card p-6 shadow-[var(--shadow-pop)]">
            {/* Talep sahibi */}
            <div className="flex items-center gap-3.5">
              <div className="relative flex-none">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-[18px] font-extrabold text-primary">
                  ED
                </span>
                {/* doğrulanmış rozeti */}
                <span
                  className="absolute -bottom-1 -right-1 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-primary text-white ring-[3px] ring-card"
                  title="Kimliği doğrulandı"
                  aria-label="Kimliği doğrulandı"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                    aria-hidden
                  >
                    <path d="M5 12.5l4 4 10-10" />
                  </svg>
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-primary">
                  Talep sahibi
                </p>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                  <h3 className="text-[19px] font-extrabold leading-tight text-ink-900">
                    Elif Doğan
                  </h3>
                  <span className="flex items-center gap-1.5">
                    <Yildizlar puan={4.9} />
                    <span className="text-[14px] font-extrabold leading-none text-ink-900">
                      4,9
                    </span>
                  </span>
                </div>
                <div className="mt-1 text-[13px] font-medium text-ink-400">
                  12 talep tamamladı · 2024&apos;ten beri
                </div>
              </div>
            </div>
            {/* Güven rozetleri */}
            <div className="mt-3.5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-bold text-accent-ink">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[15px] w-[15px] flex-none"
                  aria-hidden
                >
                  <path d="M12 3l7 3v5c0 4.4-3 8-7 9-4-1-7-4.6-7-9V6z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Kimlik doğrulandı
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-bold text-accent-ink">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[15px] w-[15px] flex-none"
                  aria-hidden
                >
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />
                </svg>
                İletişim doğrulandı
              </span>
            </div>

            <p className="mt-5 border-t border-hairline pt-5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-ink-400">
              Alıcının belirlediği fiyat
            </p>
            <div className="mt-2 flex items-baseline gap-2.5">
              <div className="text-[38px] font-extrabold tracking-[-1px] text-ink-900">
                {fiyatText(talep.fiyatNum)}
              </div>
              <Chip variant="lime" className="text-[11px]">
                Tek fiyat
              </Chip>
            </div>

            {(talep.pazarlik || talep.acil) && (
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {talep.pazarlik && (
                  <Chip variant="pazarlik" className="text-[12px]">
                    Pazarlığa açık
                  </Chip>
                )}
                {talep.acil && (
                  <Chip variant="acil" className="text-[12px]">
                    ! Acil
                  </Chip>
                )}
              </div>
            )}

            <Button
              variant="lime"
              size="lg"
              className="mt-5 w-full"
              onClick={() => setModal(true)}
            >
              Sunum Yap
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="mt-2.5 w-full"
              onClick={() => setTakip((v) => !v)}
            >
              {takip ? "Takip ediliyor ✓" : "Talebi Takip Et"}
            </Button>

            <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-accent-soft/50 p-3.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-px h-[18px] w-[18px] flex-none text-accent-ink"
                aria-hidden
              >
                <path d="M12 3l7 3v5c0 4.4-3 8-7 9-4-1-7-4.6-7-9V6z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-[11.5px] font-medium leading-snug text-ink-700">
                <b>BulBana güvencesi.</b>{" "}
                Ödemen, sen ürünü teslim alıp onaylayana kadar BulBana&apos;da
                tutulur — sorun çıkarsa iade edilir. Ödeme ve iletişimi platform
                içinde sürdür.
              </p>
            </div>

            <div className="mt-3 flex items-center justify-center gap-3 text-[12px] font-semibold text-ink-400">
              <button
                type="button"
                onClick={talebiPaylas}
                className="transition-colors hover:text-primary"
              >
                {kopyalandi ? "Bağlantı kopyalandı ✓" : "Talebi paylaş"}
              </button>
              <span aria-hidden className="text-ink-300">
                ·
              </span>
              <button
                type="button"
                onClick={() => setBildirildi(true)}
                className="transition-colors hover:text-danger"
              >
                {bildirildi ? "Bildirimin alındı ✓" : "Şikâyet et"}
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Benzer talepler */}
      {benzer.length > 0 && (
        <section className="mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-extrabold text-ink-900">
              Benzer Talepler
            </h2>
            <Link href="/kesfet" className="text-[13px] font-semibold">
              Tümünü gör ›
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {benzer.map((t) => (
              <TalepCard key={t.id} talep={t} />
            ))}
          </div>
        </section>
      )}

      <SunumModal open={modal} onClose={() => setModal(false)} />

      {/* Görsel inceleme (lightbox) */}
      {lightbox && varMi && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-ink-900/95 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Görsel inceleme"
        >
          {/* Üst bar */}
          <div className="flex items-center justify-between gap-4 px-5 py-4 text-white">
            <span className="truncate text-sm font-semibold">
              {talep.baslik}
            </span>
            <div className="flex flex-none items-center gap-4">
              <span className="text-[13px] font-medium text-white/70">
                {aktifFoto + 1} / {gorseller.length}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(false);
                }}
                aria-label="Kapat"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg text-white transition-colors hover:bg-white/20"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Görsel + oklar */}
          <div className="relative flex flex-1 items-center justify-center px-4">
            {gorseller.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  geri();
                }}
                aria-label="Önceki görsel"
                className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 sm:left-6"
              >
                ‹
              </button>
            )}
            <div
              className="relative h-full w-full max-w-[900px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gorseller[aktifFoto]}
                alt={`${talep.baslik} — görsel ${aktifFoto + 1}`}
                fill
                sizes="(max-width: 900px) 92vw, 900px"
                className="object-contain"
              />
            </div>
            {gorseller.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  ileri();
                }}
                aria-label="Sonraki görsel"
                className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 sm:right-6"
              >
                ›
              </button>
            )}
          </div>

          {/* Küçük görsel şeridi */}
          {gorseller.length > 1 && (
            <div className="flex justify-center gap-2 px-4 pb-6 pt-4">
              {gorseller.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAktifFoto(i);
                  }}
                  aria-label={`${i + 1}. görsel`}
                  className={`relative h-14 w-14 flex-none overflow-hidden rounded-lg border-2 transition ${
                    aktifFoto === i
                      ? "border-white"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
