"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getTalep } from "@/lib/data";
import type { Talep } from "@/lib/data";
import { TalepCard } from "@/components/TalepCard";
import { Chip } from "@/components/ui/Chip";
import { ButtonLink } from "@/components/ui/Button";
import { HesapNav } from "@/components/HesapNav";
import { HesapKart } from "@/components/HesapKart";

type Tab = "talepler" | "sunumlar" | "takip" | "yorumlar";

const pill =
  "inline-flex flex-none items-center rounded-full px-[11px] py-[7px] text-[11.5px] font-bold leading-none";

// Kendi açık taleplerim (3) ve takip ettiklerim (3) — seed'ten seçili.
const taleplerimIds = [
  "dawn-fm-imzali-cd",
  "kraftwerk-man-machine-plak",
  "tutunamayanlar-ilk-baski",
];
const takipIds = [
  "daft-punk-discovery-plak",
  "nokia-3310-kutulu",
  "polaroid-600-film",
];

// Satıcı olarak gönderdiğim sunumlar — aciliyet sırasına dizili.
const sunumlarim = [
  {
    talep: "Commodore 64 arıyorum — çalışır, kutulu",
    sahibi: "retro.adana",
    butce: "5.500 TL",
    tarih: "5 gün önce",
    grup: "kargo" as const,
    st: "Ödeme alındı · kargo bekliyor",
    stCls: "bg-accent text-ink-900",
    href: "/siparislerim",
    aksiyon: { label: "Kargoya Ver", variant: "lime" as const, href: "/siparislerim" },
    not: "Alıcı ödemeyi güvenceye aldı — 3 gün içinde kargola.",
  },
  {
    talep: "Sega Dreamcast tam set arıyorum (2 kol)",
    sahibi: "egem.izmir",
    butce: "4.250 TL",
    tarih: "2 gün önce",
    grup: "sohbet" as const,
    st: "Pazarlık sürüyor",
    stCls: "bg-primary-soft text-primary-hover",
    href: "/mesajlar",
    aksiyon: { label: "Sohbete Git", variant: "primary" as const, href: "/mesajlar" },
    not: "Sohbette fiyatta anlaşmaya çalışıyorsunuz.",
  },
  {
    talep: "Nokia 3310 arıyorum — kutulu, çalışır",
    sahibi: "aysenur.a",
    butce: "1.500 TL",
    tarih: "Dün",
    grup: "sohbet" as const,
    st: "Teklif istendi · yanıt bekliyor",
    stCls: "bg-accent-soft text-accent-ink",
    href: "/mesajlar",
    aksiyon: { label: "Sohbete Git", variant: "primary" as const, href: "/mesajlar" },
    not: "Alıcı senden teklif istedi — yanıtla.",
  },
  {
    talep: 'Daft Punk "Discovery" ilk baskı plak arıyorum',
    sahibi: "berk.plak",
    butce: "6.000 TL",
    tarih: "3 gün önce",
    grup: "inceleme" as const,
    st: "İnceleniyor",
    stCls: "bg-page text-ink-500",
    href: "/ilan/daft-punk-discovery-plak",
    aksiyon: null,
    not: "Alıcı gönderdiğin sunumu inceliyor.",
  },
];

const yorumlar = [
  {
    ad: "analogmarket",
    harf: "AM",
    rol: "Satıcıdan",
    rolVariant: "violet" as const,
    urun: "Polaroid 600 talebi",
    tarih: "Haziran 2026",
    text: "Hızlı karar verdi, ödeme anında onaylandı. Kargo adresi ve iletişim netti — harika bir alıcı.",
  },
  {
    ad: "retrodukkan",
    harf: "RD",
    rol: "Satıcıdan",
    rolVariant: "violet" as const,
    urun: "Sega Dreamcast talebi",
    tarih: "Mayıs 2026",
    text: "İletişimi çok net, pazarlık centilmence geçti. Teslimat onayını hiç geciktirmedi.",
  },
  {
    ad: "cdkolik",
    harf: "CK",
    rol: "Alıcıdan",
    rolVariant: "lime" as const,
    urun: 'Radiohead "OK Computer" CD satışı',
    tarih: "Nisan 2026",
    text: "Ürün anlatıldığı gibi geldi, paketleme çok özenliydi. Güvenilir satıcı, teşekkürler.",
  },
];

const kisayollar = [
  { label: "Talep Alarmlarım", href: "/talep-alarmlari" },
  { label: "Performans Panelim", href: "/satici-performansi" },
];

// Küçük, sade çizgi ikonlar (renkli/zıplayan değil — işi tatlandıran dokunuş).
function TabIcon({ tip }: { tip: Tab }) {
  const cls = "h-[15px] w-[15px] flex-none";
  const p = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (tip === "talepler")
    // büyüteç — aradıklarım
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden {...p}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M20 20l-4.5-4.5" />
      </svg>
    );
  if (tip === "sunumlar")
    // koli — sattıklarım / sunumlarım
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden {...p}>
        <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
        <path d="M3.3 8L12 13l8.7-5M12 13v8.5" />
      </svg>
    );
  if (tip === "takip")
    // yer imi — takip
    return (
      <svg viewBox="0 0 24 24" className={cls} aria-hidden {...p}>
        <path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z" />
      </svg>
    );
  // yıldız — değerlendirmeler
  return (
    <svg viewBox="0 0 24 24" className={cls} aria-hidden {...p}>
      <path d="M12 3l2.7 5.8 6.3.6-4.8 4.2 1.5 6.2L12 16.9 6.3 20l1.5-6.2L3 9.6l6.3-.6z" />
    </svg>
  );
}

// Rol rengi: alıcı=mor (talepler/takip), satıcı=yeşil (sunumlar), nötr (yorumlar).
type TabRenk = "mor" | "yesil" | "notr";
const tabs: { value: Tab; label: string; renk: TabRenk }[] = [
  { value: "talepler", label: "Taleplerim (3)", renk: "mor" },
  { value: "sunumlar", label: "Sunumlarım (4)", renk: "yesil" },
  { value: "takip", label: "Takip Ettiklerim (3)", renk: "mor" },
  { value: "yorumlar", label: "Değerlendirmeler (15)", renk: "notr" },
];

// Aktif ve hover renk sınıfları — renk eşlemesini hissettirir.
const tabRenkCls: Record<TabRenk, { aktif: string; pasif: string }> = {
  mor: {
    aktif: "border-primary font-bold text-primary",
    pasif: "border-transparent font-semibold text-ink-400 hover:text-primary",
  },
  yesil: {
    aktif: "border-accent-ink font-bold text-accent-ink",
    pasif: "border-transparent font-semibold text-ink-400 hover:text-accent-ink",
  },
  notr: {
    aktif: "border-ink-900 font-bold text-ink-900",
    pasif: "border-transparent font-semibold text-ink-400 hover:text-ink-900",
  },
};

const tabValues: Tab[] = ["talepler", "sunumlar", "takip", "yorumlar"];

export function ProfilClient() {
  const params = useSearchParams();
  const istenenTab = params.get("tab");
  const baslangicTab: Tab = tabValues.includes(istenenTab as Tab)
    ? (istenenTab as Tab)
    : "talepler";
  const [tab, setTab] = useState<Tab>(baslangicTab);

  const taleplerim = taleplerimIds
    .map((id) => getTalep(id))
    .filter((t): t is Talep => Boolean(t));
  const takipEttiklerim = takipIds
    .map((id) => getTalep(id))
    .filter((t): t is Talep => Boolean(t));

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-16 pt-6">
      <HesapNav active="/profil" />

      <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <HesapKart />

        {/* ── Sağ: sekmeler + içerik ── */}
        <div className="min-w-0">
      <div className="mb-4">
        <h1 className="text-[24px] font-extrabold tracking-[-0.5px] text-ink-900">
          Profilim
        </h1>
        <p className="mt-1 text-[13px] font-medium text-ink-400">
          Taleplerin, sunumların ve değerlendirmelerin — hepsi tek yerde.
        </p>
      </div>
      {/* ── Sekmeler ── */}
      <div role="tablist" className="flex flex-wrap gap-1 border-b border-border">
        {tabs.map((t) => {
          const active = tab === t.value;
          const renk = tabRenkCls[t.renk];
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.value)}
              className={`-mb-px flex cursor-pointer items-center gap-1.5 border-b-[2.5px] px-3.5 py-2.5 text-[13px] leading-none transition-colors ${
                active ? renk.aktif : renk.pasif
              }`}
            >
              <TabIcon tip={t.value} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* ── Taleplerim ── */}
      {tab === "talepler" && (
        <section className="mt-4">
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[13px] font-medium text-ink-500">
              Açık taleplerin — satıcılar buralara sunum gönderiyor.
            </p>
            <ButtonLink href="/ilan-ac" variant="primary" size="sm">
              + Yeni Talep Aç
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {taleplerim.map((t) => (
              <TalepCard key={t.id} talep={t} />
            ))}
          </div>
        </section>
      )}

      {/* ── Sunumlarım ── */}
      {tab === "sunumlar" && (
        <section className="mt-4">
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
            <p className="max-w-[560px] text-[13px] font-medium leading-relaxed text-ink-500">
              Satıcı olarak başka alıcıların taleplerine gönderdiğin sunumlar —
              en acil olan üstte. Süreç{" "}
              <Link href="/mesajlar" className="font-bold">
                Mesajlar
              </Link>
              &apos;da yürür.
            </p>
            <div className="flex flex-wrap gap-2">
              {kisayollar.map((k) => (
                <Link
                  key={k.href}
                  href={k.href}
                  className="rounded-full bg-primary-soft px-[13px] py-[9px] text-xs font-bold text-primary-hover hover:bg-primary-soft-hover"
                >
                  {k.label} ›
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sunumlarim.map((s) => (
              <article
                key={s.talep}
                className="flex flex-col overflow-hidden rounded-card border border-border bg-card transition-colors hover:border-primary"
              >
                <div className="ref-image relative flex aspect-[4/3] items-center justify-center">
                  <span className="font-mono text-[10px] text-[#968cac]">
                    sunum görseli
                  </span>
                  <span className={`absolute left-2.5 top-2.5 ${pill} ${s.stCls}`}>
                    {s.st}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <Link
                    href={s.href}
                    className="text-[13.5px] font-bold leading-snug text-ink-900 hover:text-primary"
                  >
                    {s.talep}
                  </Link>
                  <div className="mt-1.5 text-[11.5px] font-medium text-ink-400">
                    İlan sahibi:{" "}
                    <span className="font-semibold text-ink-900">
                      {s.sahibi}
                    </span>{" "}
                    · {s.tarih}
                  </div>
                  <div className="mt-0.5 text-[11.5px] font-medium text-ink-400">
                    Alıcının fiyatı:{" "}
                    <span className="font-bold text-ink-900">{s.butce}</span>
                  </div>
                  <p className="mt-2 text-[11.5px] font-medium leading-snug text-ink-400">
                    {s.not}
                  </p>
                  <div className="mt-auto pt-3.5">
                    {s.aksiyon ? (
                      <ButtonLink
                        href={s.aksiyon.href}
                        variant={s.aksiyon.variant}
                        size="sm"
                        className="w-full"
                      >
                        {s.aksiyon.label}
                      </ButtonLink>
                    ) : (
                      <span className="block rounded-xl bg-page py-2.5 text-center text-[12px] font-semibold text-ink-400">
                        Yanıt bekleniyor
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── Takip Ettiklerim ── */}
      {tab === "takip" && (
        <section className="mt-4">
          <p className="mb-3.5 text-[13px] font-medium leading-relaxed text-ink-500">
            Takip ettiğin taleplerde yeni gelişme olduğunda (yeni sunum, fiyat
            güncellemesi) bildirim alırsın.
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {takipEttiklerim.map((t) => (
              <TalepCard key={t.id} talep={t} />
            ))}
          </div>
        </section>
      )}

      {/* ── Değerlendirmeler ── */}
      {tab === "yorumlar" && (
        <section className="mt-4">
          <div className="mb-3.5 flex items-center gap-2 text-[13px] font-semibold text-ink-500">
            <span className="text-[15px] font-extrabold text-star">★ 4,9</span>
            <span>· 15 değerlendirme — alım ve satış işlemlerinden</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {yorumlar.map((y) => (
              <article
                key={y.ad}
                className="rounded-card border border-border bg-card px-[18px] py-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary-soft text-[11.5px] font-bold text-primary-hover">
                    {y.harf}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[13.5px] font-bold text-ink-900">
                        {y.ad}
                      </span>
                      <Chip variant={y.rolVariant}>{y.rol}</Chip>
                    </div>
                    <div className="mt-[3px] text-[11.5px] font-medium text-ink-400">
                      {y.urun} · {y.tarih}
                    </div>
                  </div>
                  <span className="flex-none text-[13px] font-bold text-star">
                    ★★★★★
                  </span>
                </div>
                <p className="mt-3 text-[13.5px] font-medium leading-relaxed text-ink-700">
                  {y.text}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
        </div>
      </div>
    </main>
  );
}
