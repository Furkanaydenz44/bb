"use client";

import { useState } from "react";
import Link from "next/link";
import { HesapNav } from "@/components/HesapNav";
import { HesapKart } from "@/components/HesapKart";

type Tab = "alim" | "satis";

type Siparis = {
  baslik: string;
  no: string;
  karsi: string;
  tarih: string;
  tutar: string;
  st: string;
  stCls: string;
};

const pill =
  "inline-flex flex-none items-center rounded-full px-[10px] py-[7px] text-[11px] font-bold leading-none";

const alimlar: Siparis[] = [
  {
    baslik: 'İmzalı The Weeknd "Dawn FM" CD',
    no: "#BB-78412",
    karsi: "Satıcı: plakdukkani34",
    tarih: "Bugün",
    tutar: "4.500 TL",
    st: "Kargo yolda",
    stCls: "bg-primary-soft text-primary-hover",
  },
  {
    baslik: "Polaroid 600 — film ile birlikte",
    no: "#BB-77103",
    karsi: "Satıcı: analogmarket",
    tarih: "8 Tem",
    tutar: "2.200 TL",
    st: "Tamamlandı ✓",
    stCls: "bg-page text-ink-500",
  },
  {
    baslik: "Sega Dreamcast — tam set",
    no: "#BB-76890",
    karsi: "Satıcı: retrodukkan",
    tarih: "24 Haz",
    tutar: "4.100 TL",
    st: "Tamamlandı ✓",
    stCls: "bg-page text-ink-500",
  },
];

const satislar: Siparis[] = [
  {
    baslik: "Commodore 64 — çalışır, kutulu",
    no: "#BB-78395",
    karsi: "Alıcı: retro.adana",
    tarih: "Dün",
    tutar: "4.500 TL",
    st: "Kargola — son 2 gün",
    stCls: "bg-accent-soft text-accent-ink",
  },
  {
    baslik: 'Radiohead "OK Computer" CD',
    no: "#BB-77521",
    karsi: "Alıcı: cdkolik",
    tarih: "6 Tem",
    tutar: "2.800 TL",
    st: "Tamamlandı ✓",
    stCls: "bg-page text-ink-500",
  },
  {
    baslik: "Pioneer pikap iğnesi",
    no: "#BB-76112",
    karsi: "Alıcı: analogsever",
    tarih: "28 Haz",
    tutar: "1.900 TL",
    st: "Tamamlandı ✓",
    stCls: "bg-page text-ink-500",
  },
];

export function SiparislerimClient() {
  const [tab, setTab] = useState<Tab>("alim");
  const liste = tab === "alim" ? alimlar : satislar;

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-16 pt-6">
      <HesapNav active="/siparislerim" />

      <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <HesapKart />

        <div className="min-w-0">
          <h1 className="text-[24px] font-extrabold tracking-[-0.5px] text-ink-900">
            Siparişlerim
          </h1>
          <p className="mb-4 mt-1 text-[13px] font-medium text-ink-400">
            Aldıkların ve sattıkların — hepsi tek yerde.
          </p>

          {/* ── Sekmeler ── */}
          <div className="mb-[18px] flex gap-1.5">
        <button
          type="button"
          onClick={() => setTab("alim")}
          className={`cursor-pointer rounded-full px-4 py-[11px] text-[13px] leading-none transition-colors ${
            tab === "alim"
              ? "bg-primary font-bold text-white"
              : "bg-card font-semibold text-ink-500 ring-1 ring-inset ring-border hover:text-primary"
          }`}
        >
          Alımlarım ({alimlar.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("satis")}
          className={`cursor-pointer rounded-full px-4 py-[11px] text-[13px] leading-none transition-colors ${
            tab === "satis"
              ? "bg-primary font-bold text-white"
              : "bg-card font-semibold text-ink-500 ring-1 ring-inset ring-border hover:text-primary"
          }`}
        >
          Satışlarım ({satislar.length})
        </button>
      </div>

      {/* ── Sipariş satırları ── */}
      <div className="flex flex-col gap-2.5">
        {liste.map((s) => (
          <Link
            key={s.no}
            href="/siparis"
            className="flex flex-wrap items-center gap-3.5 rounded-[14px] border border-border bg-card px-[18px] py-[15px] transition-colors hover:border-primary"
          >
            <div className="ref-image flex h-[50px] w-[50px] flex-none items-center justify-center rounded-[10px] font-mono text-[8px] text-[#968cac]">
              görsel
            </div>
            <div className="min-w-[220px] flex-1">
              <div className="text-sm font-bold leading-snug text-ink-900">
                {s.baslik}
              </div>
              <div className="mt-[3px] text-[11.5px] font-medium text-ink-400">
                {s.no} · {s.karsi} · {s.tarih}
              </div>
            </div>
            <span className="flex-none text-[15px] font-extrabold leading-none text-ink-900">
              {s.tutar}
            </span>
            <span className={`${pill} ${s.stCls}`}>{s.st}</span>
          </Link>
        ))}
          </div>
        </div>
      </div>
    </main>
  );
}
