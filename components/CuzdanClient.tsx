"use client";

import { useState } from "react";
import Link from "next/link";
import { HesapNav } from "@/components/HesapNav";
import { HesapKart } from "@/components/HesapKart";

type Islem = {
  baslik: string;
  alt: string;
  brut: string;
  komisyon: string;
  net: string;
  netCls: string;
  st: string;
  stCls: string;
};

const islemler: Islem[] = [
  {
    baslik: "Commodore 64 satışı",
    alt: "retro.adana talebi · 10 Tem",
    brut: "4.500 TL",
    komisyon: "−315 TL",
    net: "4.185 TL",
    netCls: "text-accent-ink",
    st: "Alıcı onayı bekleniyor",
    stCls: "bg-accent-soft text-accent-ink",
  },
  {
    baslik: 'Radiohead "OK Computer" CD satışı',
    alt: "cdkolik talebi · 6 Tem",
    brut: "2.800 TL",
    komisyon: "−196 TL",
    net: "2.604 TL",
    netCls: "text-accent-ink",
    st: "Bakiyede",
    stCls: "bg-primary-soft text-primary-hover",
  },
  {
    baslik: "IBAN'a aktarım",
    alt: "TR33 ... 8413 26 · 1 Tem",
    brut: "—",
    komisyon: "—",
    net: "9.810 TL",
    netCls: "text-ink-900",
    st: "Aktarıldı ✓",
    stCls: "bg-page text-ink-500",
  },
  {
    baslik: "Pioneer pikap iğnesi satışı",
    alt: "analogsever talebi · 28 Haz",
    brut: "1.900 TL",
    komisyon: "−133 TL",
    net: "1.767 TL",
    netCls: "text-accent-ink",
    st: "Aktarıldı ✓",
    stCls: "bg-page text-ink-500",
  },
];

export function CuzdanClient() {
  const [aktarimTalebi, setAktarimTalebi] = useState(false);

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-16 pt-6">
      <HesapNav active="/cuzdan" />

      <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <HesapKart />

        <div className="min-w-0">
          <h1 className="text-[24px] font-extrabold tracking-[-0.5px] text-ink-900">
            Kazançlarım
          </h1>
          <p className="mb-4 mt-1 text-[13px] font-medium text-ink-400">
            Satış gelirlerin, aktarımların ve komisyon dökümü.
          </p>

          {/* ── Özet kartları ── */}
          <div className="grid gap-3.5 md:grid-cols-3">
        <div className="rounded-card bg-ink-900 p-5 text-white">
          <div className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#8b7bb0]">
            Aktarılabilir bakiye
          </div>
          <div className="mt-2.5 text-[30px] font-extrabold leading-none text-accent">
            2.604 TL
          </div>
          {aktarimTalebi ? (
            <div className="mt-3.5 rounded-control bg-accent/10 px-3 py-[11px] text-xs font-bold leading-relaxed text-accent">
              Aktarım talebin alındı ✓ — tutar hafta içi aynı gün, hafta sonu
              ilk iş günü IBAN&apos;ına geçer.
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAktarimTalebi(true)}
              className="mt-3.5 cursor-pointer rounded-control bg-accent px-[18px] py-3 text-[13px] font-extrabold leading-none text-ink-900 transition-colors hover:bg-accent-hover"
            >
              IBAN&apos;a Aktar
            </button>
          )}
        </div>

        <div className="rounded-card border border-border bg-card p-5">
          <div className="text-[11px] font-bold uppercase tracking-[1.2px] text-ink-400">
            Onay bekleyen
          </div>
          <div className="mt-2.5 text-[30px] font-extrabold leading-none text-accent-ink">
            4.185 TL
          </div>
          <p className="mt-3 text-[11.5px] font-medium leading-relaxed text-ink-300">
            Alıcı ürünü onayladığında bakiyene geçer.
          </p>
        </div>

        <div className="rounded-card border border-border bg-card p-5">
          <div className="text-[11px] font-bold uppercase tracking-[1.2px] text-ink-400">
            Bu ay aktarılan
          </div>
          <div className="mt-2.5 text-[30px] font-extrabold leading-none text-primary-hover">
            9.810 TL
          </div>
          <p className="mt-3 text-[11.5px] font-medium leading-relaxed text-ink-300">
            Toplam: 86.400 TL · 28 satış
          </p>
        </div>
      </div>

      {/* ── Kayıtlı IBAN ── */}
      <div className="mt-3.5 flex flex-wrap items-center gap-3.5 rounded-card border border-border bg-card px-[18px] py-4">
        <div className="flex h-7 w-10 flex-none items-center justify-center rounded-md bg-primary-soft text-[9px] font-extrabold text-primary-hover">
          IBAN
        </div>
        <div className="min-w-[240px] flex-1">
          <div className="text-[13.5px] font-bold leading-tight text-ink-900">
            TR33 0006 1005 1978 6457 8413 26
          </div>
          <div className="mt-[3px] text-[11.5px] font-medium text-ink-400">
            Emre Kaya · Varsayılan aktarım hesabı
          </div>
        </div>
        <Link href="/ayarlar" className="text-[12.5px] font-semibold">
          Düzenle
        </Link>
      </div>

      {/* ── İşlem listesi ── */}
      <div className="mt-3.5 overflow-x-auto rounded-card border border-border bg-card">
        <div className="min-w-[640px]">
          <div className="flex gap-3 bg-subtle px-[18px] py-3 text-[11px] font-bold uppercase tracking-[1px] text-ink-400">
            <span className="flex-[1.6]">İşlem</span>
            <span className="flex-[0.8] text-right">Brüt</span>
            <span className="flex-[0.8] text-right">Komisyon (%7)</span>
            <span className="flex-[0.8] text-right">Net</span>
            <span className="flex-1 text-right">Durum</span>
          </div>
          {islemler.map((i) => (
            <div
              key={i.baslik}
              className="flex items-center gap-3 border-t border-hairline px-[18px] py-3.5 text-[12.5px] font-medium"
            >
              <span className="flex-[1.6]">
                <span className="font-bold text-ink-900">{i.baslik}</span>
                <br />
                <span className="text-[11px] text-ink-300">{i.alt}</span>
              </span>
              <span className="flex-[0.8] text-right text-ink-900">
                {i.brut}
              </span>
              <span className="flex-[0.8] text-right text-danger">
                {i.komisyon}
              </span>
              <span
                className={`flex-[0.8] text-right font-extrabold ${i.netCls}`}
              >
                {i.net}
              </span>
              <span className="flex flex-1 justify-end">
                <span
                  className={`inline-flex items-center rounded-full px-[9px] py-[6px] text-[10.5px] font-bold leading-none ${i.stCls}`}
                >
                  {i.st}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

          <p className="mt-3 text-[11.5px] font-medium leading-relaxed text-ink-300">
            Aktarımlar hafta içi aynı gün, hafta sonu ilk iş günü gerçekleşir.
            Her satış için e-fatura, e-posta adresine gönderilir.
          </p>
        </div>
      </div>
    </main>
  );
}
