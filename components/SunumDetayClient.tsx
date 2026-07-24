"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const thumbs = ["ön", "arka", "imza", "COA", "kitapçık", "disk"];

export function SunumDetayClient() {
  const [aktifFoto, setAktifFoto] = useState(0);
  const [teklif, setTeklif] = useState(false);
  const [video, setVideo] = useState(false);
  const [raporlandi, setRaporlandi] = useState(false);

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-16 pt-[18px]">
      <style>{`@keyframes bbSunumProgress{from{width:0}to{width:100%}}`}</style>

      {/* Breadcrumb + gezinme */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-1.5 pb-3.5">
        <nav
          aria-label="Sayfa yolu"
          className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-ink-400"
        >
          <Link href="/ilan-yonetimi" className="text-ink-400 hover:text-primary">
            İlanım: İmzalı The Weeknd "Dawn FM" CD arıyorum
          </Link>
          <span aria-hidden>›</span>
          <Link href="/ilan-yonetimi" className="text-ink-400 hover:text-primary">
            Gelen Sunumlar (12)
          </Link>
          <span aria-hidden>›</span>
          <span className="font-semibold text-ink-900">plakdukkani34</span>
        </nav>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ink-400">Sunum 1 / 12</span>
          <span
            aria-disabled
            title="İlk sunum"
            className="flex h-[30px] w-[30px] cursor-not-allowed items-center justify-center rounded-lg bg-[#efebf5] text-sm font-bold text-[#cdc2e0]"
          >
            ‹
          </span>
          <span
            aria-disabled
            title="Yakında"
            className="flex h-[30px] w-[30px] cursor-not-allowed items-center justify-center rounded-lg bg-[#efebf5] text-sm font-bold text-[#cdc2e0]"
          >
            ›
          </span>
        </div>
      </div>

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_384px]">
        {/* ── Galeri + video ── */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="rounded-[18px] border border-border bg-card p-3.5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <span className="pointer-events-none absolute left-3.5 top-3.5 z-[3] rounded-lg bg-ink-900/[0.82] px-[11px] py-[7px] text-[11px] font-semibold text-white">
                Satıcının ürün fotoğrafları · 7 adet
              </span>
              <div className="ref-image absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[11px] text-[#968cac]">
                  {aktifFoto === 0
                    ? "ürün fotoğrafı — jelatinli Dawn FM + imza kartı"
                    : `ürün fotoğrafı — ${thumbs[aktifFoto - 1]}`}
                </span>
              </div>
            </div>
            <div className="mt-2.5 grid grid-cols-6 gap-2">
              {thumbs.map((t, i) => {
                const active = aktifFoto === i + 1;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAktifFoto(i + 1)}
                    aria-label={`${t} fotoğrafı`}
                    className={`ref-image flex aspect-square items-center justify-center overflow-hidden rounded-lg border-2 text-[9px] font-semibold text-[#968cac] transition-colors ${
                      active
                        ? "border-primary shadow-[0_0_0_2px_var(--color-primary-soft)]"
                        : "border-transparent hover:border-border-input"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video */}
          <div className="rounded-[18px] border border-border bg-card p-3.5">
            <div className="mb-2.5 flex items-baseline justify-between px-1">
              <span className="text-sm font-extrabold text-ink-900">
                Satıcı videosu
              </span>
              <span className="text-[11.5px] font-medium text-ink-300">
                0:42 · imza ve jelatin kontrolü
              </span>
            </div>
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-ink-900">
              {!video ? (
                <>
                  <button
                    type="button"
                    onClick={() => setVideo(true)}
                    aria-label="Videoyu oynat"
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-[22px] font-extrabold text-ink-900 hover:bg-accent-hover"
                  >
                    ▶
                  </button>
                  <span className="absolute bottom-3.5 left-3.5 text-[11.5px] font-semibold text-[#b4a8d6]">
                    video önizlemesi — temsili
                  </span>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setVideo(false)}
                    className="rounded-full bg-white/[0.14] px-[18px] py-3 text-[12.5px] font-bold text-white"
                  >
                    ❚❚ Duraklat
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-white/[0.18]">
                    <div
                      className="h-full bg-accent"
                      style={{ animation: "bbSunumProgress 42s linear forwards" }}
                    />
                  </div>
                  <span className="absolute bottom-3.5 left-3.5 text-[11.5px] font-semibold text-accent">
                    oynatılıyor... (temsili)
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Sağ panel ── */}
        <aside className="flex flex-col gap-3.5 lg:sticky lg:top-[150px]">
          {/* Satıcı güven kartı */}
          <div className="rounded-[18px] border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-accent">
                PD
              </div>
              <div className="flex-1">
                <Link
                  href="/satici-profili"
                  className="block text-[15px] font-bold leading-tight text-ink-900 hover:text-primary"
                >
                  plakdukkani34
                </Link>
                <div className="mt-1 text-[12px] font-medium text-ink-400">
                  <span className="font-bold text-star">★ 4.8</span> · 214 satış ·
                  2023&apos;ten beri
                </div>
              </div>
              <span className="rounded-full bg-primary-soft px-[9px] py-1.5 text-[10.5px] font-bold text-primary-hover">
                Hızlı kargo
              </span>
            </div>
            <div className="mt-3.5 flex justify-between border-t border-hairline pt-3.5 text-[12.5px] font-medium">
              <span className="text-ink-400">Konum</span>
              <span className="font-semibold text-ink-900">
                Beyoğlu, İstanbul
              </span>
            </div>
            <div className="mt-2 flex justify-between text-[12.5px] font-medium">
              <span className="text-ink-400">Ort. kargolama</span>
              <span className="font-semibold text-ink-900">1 gün</span>
            </div>
          </div>

          {/* Sunum kartı */}
          <div className="rounded-[18px] border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-2.5">
              <span className="text-[15px] font-extrabold text-ink-900">
                Sunum
              </span>
              <span className="text-[11.5px] font-medium text-ink-300">
                1 gün önce gönderildi
              </span>
            </div>
            <p className="mt-3 text-[13.5px] font-medium leading-relaxed text-ink-700">
              Jelatininde Avrupa baskısı Dawn FM. İmza kartla birlikte, COA
              sertifikası mevcut — sertifika numarası videoda ve 4. fotoğrafta
              görünüyor. Aynı gün kargolarım.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Durum: Yeni", "COA sertifikalı", "7 fotoğraf · 1 video"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-lg bg-page px-[9px] py-1.5 text-[11px] font-semibold text-ink-900"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>

            {!teklif ? (
              <>
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-4 w-full"
                  onClick={() => setTeklif(true)}
                >
                  Teklif İste
                </Button>
                <p className="mt-2.5 text-center text-[11.5px] font-medium leading-relaxed text-ink-300">
                  Teklif istersen sohbet hemen açılır; satıcı fiyatını sohbette
                  verir. Ücretsiz.
                </p>
              </>
            ) : (
              <div className="mt-4 rounded-[13px] border border-[#ddd6fe] bg-primary-soft p-3.5 text-center">
                <div className="text-sm font-extrabold text-primary-hover">
                  Teklif istendi ✓
                </div>
                <div className="mt-1.5 text-[11.5px] font-medium leading-relaxed text-ink-500">
                  Sohbet açıldı; plakdukkani34 fiyatını sohbette verecek ve
                  bildirim alacaksın.
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center justify-center gap-4">
              <Link
                href="/ilan-yonetimi"
                className="text-xs font-semibold text-ink-400 hover:text-primary"
              >
                Gizle
              </Link>
              {!raporlandi ? (
                <button
                  type="button"
                  onClick={() => setRaporlandi(true)}
                  className="cursor-pointer text-xs font-semibold text-ink-300 hover:text-primary"
                >
                  Sunumu bildir
                </button>
              ) : (
                <span className="text-xs font-semibold leading-snug text-accent-ink">
                  Bildirimin alındı, ekibimiz inceleyecek.
                </span>
              )}
            </div>
          </div>

          {/* İnceleme ipucu */}
          <div className="rounded-card border border-[#f1e3b8] bg-[#f7fceb] p-4">
            <div className="text-xs font-bold leading-snug text-accent-ink">
              İnceleme ipucu
            </div>
            <p className="mt-1.5 text-xs font-medium leading-relaxed text-accent-ink">
              İmzalı ürünlerde sertifika numarasını ve imza fotoğrafını mutlaka
              karşılaştır; şüphen varsa teklif istemeden önce sunumu bildir.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
