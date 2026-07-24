"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

const durumSecenekleri = [
  "Sıfır, kapalı kutu",
  "Yenilenmiş",
  "Çok iyi",
  "İyi",
  "Kullanılmış",
];
// Teslimat yalnızca kargo — süreler kargoya verme süresini anlatır.
const teslimSecenekleri = [
  "Bugün kargoda",
  "1–2 gün içinde kargoda",
  "3 gün içinde kargoda",
];

const fieldWrap = "flex flex-col gap-1.5";
const label = "text-[12.5px] font-bold text-ink-700";
const control =
  "w-full box-border rounded-control border-[1.5px] border-border-input bg-card px-3 py-2.5 text-[13px] font-medium text-ink-900 outline-none focus:border-primary";

export function SunumModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [gonderildi, setGonderildi] = useState(false);
  const [baslik, setBaslik] = useState("");
  const [durum, setDurum] = useState("");
  const [fotolar, setFotolar] = useState(0);
  const [fiyat, setFiyat] = useState("");
  const [teslim, setTeslim] = useState("");
  const [aciklama, setAciklama] = useState("");
  const ilkAlan = useRef<HTMLInputElement>(null);

  // Her açılışta formu sıfırla (bayat başarı ekranı gelmesin).
  useEffect(() => {
    if (!open) return;
    setGonderildi(false);
    setBaslik("");
    setDurum("");
    setFotolar(0);
    setFiyat("");
    setTeslim("");
    setAciklama("");
    // Açılışta odağı modala taşı.
    const t = setTimeout(() => ilkAlan.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const gecerli =
    baslik.trim().length > 0 &&
    durum !== "" &&
    fotolar >= 1 &&
    Number(fiyat) > 0 &&
    teslim !== "" &&
    aciklama.trim().length >= 20;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Sunum yap"
    >
      <div
        className="absolute inset-0 bg-footer/50"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative max-h-[88vh] w-[560px] max-w-full overflow-y-auto rounded-panel bg-card shadow-[var(--shadow-pop)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-ink-500 hover:text-primary"
        >
          ✕
        </button>

        <div className="p-6">
          {gonderildi ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-2xl text-accent-ink">
                ✓
              </div>
              <h2 className="mt-4 text-xl font-extrabold text-ink-900">
                Sunumun talep sahibine ulaştı
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-[13.5px] font-medium text-ink-500">
                Durumunu Sunumlarım alanından takip edebilirsin. Talep sahibi
                beğenirse teklif ister, sohbet açılır.
              </p>
              <Button variant="secondary" className="mt-5" onClick={onClose}>
                Kapat
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (gecerli) setGonderildi(true);
              }}
            >
              <span className="text-[11px] font-extrabold uppercase tracking-[0.07em] text-accent-ink">
                ● Bu talep sunuma açık
              </span>
              <h2 className="mt-1.5 text-[26px] font-extrabold text-ink-900">
                Sunum yap
              </h2>
              <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink-500">
                Uygun ürününü net fotoğraflar ve birkaç bilgiyle talep sahibine
                sun.
              </p>

              <div className="mt-5 flex flex-col gap-4">
                {/* Ürün fotoğrafları — sunum fotoğraflı olmalı */}
                <div className={fieldWrap}>
                  <label className={label}>
                    Ürün fotoğrafları{" "}
                    <span className="font-medium text-ink-400">
                      (en az 1 · kendi çektiğin gerçek fotoğraf)
                    </span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((i) => {
                      const dolu = i < fotolar;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() =>
                            setFotolar((n) =>
                              i < n ? i : Math.min(4, Math.max(n, i + 1)),
                            )
                          }
                          aria-label={
                            dolu ? `Fotoğraf ${i + 1} (ekli)` : "Fotoğraf ekle"
                          }
                          className={`flex aspect-square items-center justify-center rounded-control border-[1.5px] text-[11px] font-bold transition-colors ${
                            dolu
                              ? "border-primary bg-primary-soft text-primary-hover"
                              : "border-dashed border-border-input bg-subtle text-ink-400 hover:border-primary hover:text-primary"
                          }`}
                        >
                          {dolu ? `✓ ${i + 1}` : "+"}
                        </button>
                      );
                    })}
                  </div>
                  <small
                    className={`text-[11.5px] ${
                      fotolar === 0 ? "text-ink-400" : "text-accent-ink"
                    }`}
                  >
                    {fotolar === 0
                      ? "İmzalı/koleksiyon ürünlerde kanıt fotoğrafı sunumunu öne taşır."
                      : `${fotolar} fotoğraf eklendi`}
                  </small>
                </div>

                <div className={fieldWrap}>
                  <label className={label} htmlFor="s-baslik">
                    Sunum başlığı
                  </label>
                  <input
                    id="s-baslik"
                    ref={ilkAlan}
                    value={baslik}
                    onChange={(e) => setBaslik(e.target.value.slice(0, 80))}
                    placeholder="Örn. Jelatininde Dawn FM CD · imza kartlı"
                    className={control}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className={fieldWrap}>
                    <label className={label} htmlFor="s-durum">
                      Ürün durumu
                    </label>
                    <select
                      id="s-durum"
                      value={durum}
                      onChange={(e) => setDurum(e.target.value)}
                      className={`${control} cursor-pointer`}
                    >
                      <option value="" disabled>
                        Durum seç
                      </option>
                      {durumSecenekleri.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div className={fieldWrap}>
                    <label className={label} htmlFor="s-teslim">
                      Kargoya verme süresi
                    </label>
                    <select
                      id="s-teslim"
                      value={teslim}
                      onChange={(e) => setTeslim(e.target.value)}
                      className={`${control} cursor-pointer`}
                    >
                      <option value="" disabled>
                        Süre seç
                      </option>
                      {teslimSecenekleri.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={fieldWrap}>
                  <label className={label} htmlFor="s-fiyat">
                    Fiyat (TL)
                  </label>
                  <input
                    id="s-fiyat"
                    inputMode="numeric"
                    value={fiyat}
                    onChange={(e) =>
                      setFiyat(e.target.value.replace(/[^0-9]/g, "").slice(0, 8))
                    }
                    placeholder="Örn. 4.500"
                    className={control}
                  />
                  <small className="text-[11.5px] text-ink-400">
                    Talep sahibine sunduğun toplam fiyat.
                  </small>
                </div>

                <div className={fieldWrap}>
                  <label className={label} htmlFor="s-aciklama">
                    Açıklama
                  </label>
                  <textarea
                    id="s-aciklama"
                    rows={4}
                    value={aciklama}
                    onChange={(e) => setAciklama(e.target.value.slice(0, 600))}
                    placeholder="Ürünün kondisyonunu, kutu ve fatura durumunu anlat."
                    className={`${control} resize-y`}
                  />
                  <small
                    className={`text-[11.5px] ${
                      aciklama.trim().length > 0 && aciklama.trim().length < 20
                        ? "text-danger"
                        : "text-ink-400"
                    }`}
                  >
                    {aciklama.trim().length}/600 · en az 20 karakter
                  </small>
                </div>

                <div className="flex items-start gap-2.5 rounded-card bg-primary-soft/60 p-3">
                  <span aria-hidden>🔒</span>
                  <p className="text-[12px] font-medium leading-snug text-ink-700">
                    <b>Sunumun sana özeldir.</b> Fiyatın ve açıklaman yalnızca
                    talep sahibine görünür.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                variant="lime"
                size="lg"
                disabled={!gecerli}
                className="mt-5 w-full"
              >
                Sunum Yap
              </Button>
              <p className="mt-2.5 text-center text-[11.5px] font-medium text-ink-400">
                Sunum yaparak BulBana topluluk ve güvenli işlem kurallarını kabul
                edersin.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
