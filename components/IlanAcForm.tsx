"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { kategoriler, iller, fiyatText, getTalep } from "@/lib/data";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/Button";

const MIN_ACIKLAMA = 30;

// Alıcının kabul ettiği ürün durumu (tek seçim).
const durumList = ["Fark etmez", "Kutusu açılmamış", "Az kullanılmış", "Kullanılmış"];
// Teslimat yalnızca kargo — elden teslim hizmeti yok.
const TESLIMAT = "Kargo";
const sureList = [7, 14, 30];
const ilList = [...iller, "Diğer"];

const inputCls =
  "w-full box-border rounded-control border-[1.5px] border-border-input px-3.5 py-[13px] text-sm font-semibold leading-snug text-ink-900 outline-none focus:border-primary";

const pillActive =
  "cursor-pointer rounded-full border-[1.5px] border-primary bg-primary-soft px-3.5 py-[11px] text-[12.5px] font-bold text-primary-hover";
const pillPassive =
  "cursor-pointer rounded-full border-[1.5px] border-border-input bg-card px-3.5 py-[11px] text-[12.5px] font-semibold text-ink-500 hover:border-primary hover:text-primary";

const stepBadge =
  "flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-primary text-[12.5px] font-bold text-white";

const labelCls = "mb-2 block text-[13px] font-bold text-ink-900";

export function IlanAcForm() {
  const [kategori, setKategori] = useState("");
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState(""); // Talep notu
  const [fiyat, setFiyat] = useState("");
  const [acilSecim, setAcilSecim] = useState(false);
  const [pazarlikSecim, setPazarlikSecim] = useState(false);
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [yil, setYil] = useState("");
  const [renk, setRenk] = useState("");
  const [defo, setDefo] = useState<null | boolean>(null);
  const [durum, setDurum] = useState("Fark etmez");
  const [il, setIl] = useState<string>("İstanbul");
  const [ilce, setIlce] = useState("");
  const [fotolar, setFotolar] = useState(0);
  const [sure, setSure] = useState(30);
  const [published, setPublished] = useState(false);
  const [toastOn, setToastOn] = useState(false);
  const toastRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const teslimat = TESLIMAT;

  // Düzenleme modu: ?duzenle=<id> ile gelindiğinde mevcut talebi ön-doldur.
  const params = useSearchParams();
  const duzenleId = params.get("duzenle");
  const duzenleModu = !!duzenleId && !!getTalep(duzenleId);

  useEffect(() => () => clearTimeout(toastRef.current), []);

  useEffect(() => {
    if (!duzenleId) return;
    const t = getTalep(duzenleId);
    if (!t) return;
    setKategori(t.kategori);
    setBaslik(t.baslik);
    setMarka(t.marka);
    setAciklama(t.aciklama);
    setFiyat(String(t.fiyatNum));
    setAcilSecim(!!t.acil);
    setPazarlikSecim(!!t.pazarlik);
    setDurum(durumList.includes(t.durum) ? t.durum : "Fark etmez");
    setIl(t.il);
    setIlce(t.ilce);
    setSure(t.gun);
    setFotolar(1);
  }, [duzenleId]);

  const baslikOk = baslik.trim().length >= 5;
  const aciklamaOk = aciklama.trim().length >= MIN_ACIKLAMA;
  const kategoriOk = kategori !== "";
  const fiyatNum = parseInt(fiyat, 10) || 0;
  const fiyatOk = fiyatNum > 0;
  const fotoOk = fotolar >= 1;
  const canPublish = baslikOk && aciklamaOk && kategoriOk && fiyatOk && fotoOk;

  const eksik: string[] = [];
  if (!kategoriOk) eksik.push("kategori");
  if (!baslikOk) eksik.push("başlık (en az 5 karakter)");
  if (!aciklamaOk) eksik.push(`talep notu (en az ${MIN_ACIKLAMA} karakter)`);
  if (!fiyatOk) eksik.push("fiyat");
  if (!fotoOk) eksik.push("en az 1 görsel");

  function saveDraft() {
    try {
      localStorage.setItem(
        "bb_ilan_taslak",
        JSON.stringify({ kategori, baslik, aciklama, fiyat, acilSecim, pazarlikSecim, marka, model, yil, renk, defo, durum, il, ilce, sure }),
      );
    } catch {
      // localStorage kullanılamıyorsa sessizce geç.
    }
    setToastOn(true);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToastOn(false), 3600);
  }

  const konumText = (ilce.trim() ? `${ilce}, ` : "") + il;
  const fotoText = fotolar > 0 ? `kapak görseli · ${fotolar}/6` : "referans görsel ekle";

  // ── Başarı ekranı ──
  if (published) {
    return (
      <main className="mx-auto max-w-[640px] px-6 pb-20 pt-16">
        <style>{`@keyframes bbFadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div
          className="rounded-panel border border-border bg-card p-9 text-center"
          style={{ animation: "bbFadeUp 0.25s ease" }}
        >
          <div className="mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-full bg-primary text-2xl font-extrabold text-white">
            ✓
          </div>
          <h1 className="mt-5 text-[26px] font-extrabold text-ink-900">
            Talebin yayında!
          </h1>
          <p className="mx-auto mt-2.5 max-w-md text-sm font-medium leading-relaxed text-ink-500">
            “{baslik.trim() || "Talebin"}” talebi{" "}
            <strong className="text-ink-900">{sure} gün</strong> boyunca satıcılara
            açık. Sunumlar geldikçe bildirim alacaksın; sunumları yalnızca sen
            görebilirsin.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <ButtonLink href="/ilan-yonetimi" variant="primary" size="lg">
              İlanı Yönet
            </ButtonLink>
            <ButtonLink href="/kesfet" variant="secondary" size="lg">
              Keşfet&apos;e Dön
            </ButtonLink>
          </div>
          <p className="mt-5 text-xs font-medium text-ink-300">
            İlanını{" "}
            <Link href="/ilan-yonetimi" className="font-semibold">
              İlan Yönetimi
            </Link>{" "}
            ekranından düzenleyebilir, süresini uzatabilir ya da kapatabilirsin.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-16 pt-[18px]">
      {/* Breadcrumb */}
      <nav
        aria-label="Sayfa yolu"
        className="flex flex-wrap items-center gap-1.5 py-1.5 text-[12.5px] font-medium text-ink-400"
      >
        <Link href="/" className="text-ink-400 hover:text-primary">
          Ana Sayfa
        </Link>
        <span aria-hidden>›</span>
        <span className="font-semibold text-ink-900">
          {duzenleModu ? "Talebi Düzenle" : "Yeni Talep"}
        </span>
      </nav>

      <div className="mb-5">
        <h1 className="text-[28px] font-extrabold tracking-[-0.7px] text-ink-900">
          {duzenleModu ? "Talebini Düzenle" : "Aradığını İlan Et"}
        </h1>
        <p className="mt-2 max-w-[560px] text-sm font-medium leading-relaxed text-ink-500">
          {duzenleModu
            ? "Bilgileri güncelle; değişiklikler yayındaki talebine yansır."
            : "Fiyatı sen belirle, satıcılar sunumlarıyla sana gelsin. İlan açmak ücretsizdir."}
        </p>
      </div>

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_384px]">
        {/* ── FORM ── */}
        <div className="flex min-w-0 flex-col gap-4">
          {/* 1 · Kategori + başlık + talep notu */}
          <section className="rounded-panel border border-border bg-card p-[22px]">
            <div className="flex items-center gap-2.5">
              <span className={stepBadge}>1</span>
              <h2 className="text-[16.5px] font-extrabold text-ink-900">
                Ne arıyorsun?
              </h2>
            </div>

            <div className="mt-[18px]">
              <label className={labelCls}>
                Kategori <span className="text-danger">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {kategoriler.map((k) => {
                  const active = kategori === k.ad;
                  return (
                    <button
                      key={k.ad}
                      type="button"
                      onClick={() => setKategori(k.ad)}
                      className={`flex items-center gap-[9px] rounded-control border-[1.5px] p-2.5 text-left ${
                        active
                          ? "border-primary bg-primary-soft"
                          : "border-border bg-card hover:border-primary"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-extrabold ${
                          active
                            ? "bg-primary text-white"
                            : "bg-primary-soft text-primary-hover"
                        }`}
                      >
                        {k.harf}
                      </span>
                      <span
                        className={`text-xs font-semibold leading-tight ${
                          active ? "font-bold text-primary-hover" : "text-ink-500"
                        }`}
                      >
                        {k.ad}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-[18px]">
              <div className="mb-2 flex items-baseline justify-between">
                <label htmlFor="ia-baslik" className="text-[13px] font-bold text-ink-900">
                  Talep başlığı <span className="text-danger">*</span>
                </label>
                <span
                  className={`text-[11.5px] font-semibold ${
                    baslikOk ? "text-primary-hover" : "text-danger"
                  }`}
                >
                  {baslik.length}/70{baslikOk ? "" : " · en az 5 karakter"}
                </span>
              </div>
              <input
                id="ia-baslik"
                value={baslik}
                onChange={(e) => setBaslik(e.target.value.slice(0, 70))}
                placeholder={'örn. İmzalı "Dawn FM" CD arıyorum'}
                className={inputCls}
              />
            </div>

            <div className="mt-[18px]">
              <div className="mb-2 flex items-baseline justify-between">
                <label htmlFor="ia-not" className="text-[13px] font-bold text-ink-900">
                  Talep notu <span className="text-danger">*</span>
                </label>
                <span
                  className={`text-[11.5px] font-semibold ${
                    aciklamaOk ? "text-primary-hover" : "text-danger"
                  }`}
                >
                  {aciklama.length}/500
                  {aciklamaOk ? "" : ` · en az ${MIN_ACIKLAMA} karakter`}
                </span>
              </div>
              <textarea
                id="ia-not"
                rows={4}
                value={aciklama}
                onChange={(e) => setAciklama(e.target.value.slice(0, 500))}
                placeholder="Aradığın ürünü tarif et: hangi baskı/versiyon, kabul ettiğin durumlar, kutu/aksesuar şartların…"
                className={`${inputCls} resize-y font-medium leading-relaxed`}
              />
              <p className="mt-[7px] text-[11.5px] font-medium text-ink-300">
                Ne kadar net yazarsan, sunumlar o kadar isabetli olur.
              </p>
            </div>
          </section>

          {/* 2 · Fiyat + öne çıkarma etiketleri */}
          <section className="rounded-panel border border-border bg-card p-[22px]">
            <div className="flex items-center gap-2.5">
              <span className={stepBadge}>2</span>
              <h2 className="text-[16.5px] font-extrabold text-ink-900">
                Fiyat ve öne çıkarma
              </h2>
            </div>

            <div className="mt-4">
              <label htmlFor="ia-fiyat" className={labelCls}>
                Fiyat <span className="text-danger">*</span>
              </label>
              <div className="flex items-center gap-2 rounded-control border-[1.5px] border-border-input bg-card py-1 pl-1 pr-4 sm:w-fit">
                <input
                  id="ia-fiyat"
                  inputMode="numeric"
                  value={fiyat}
                  onChange={(e) =>
                    setFiyat(e.target.value.replace(/[^0-9]/g, "").slice(0, 7))
                  }
                  placeholder="0"
                  aria-label="Fiyat (TL)"
                  className="w-[150px] border-none bg-transparent px-3 py-3 text-[22px] font-extrabold text-ink-900 outline-none"
                />
                <span className="text-base font-extrabold text-ink-400">TL</span>
              </div>
              <p className="mt-2.5 text-[11.5px] font-medium leading-relaxed text-ink-300">
                Satıcılar bu fiyatı görerek sunum gönderir; pazarlık teklif
                sohbetinde yapılır. Komisyon (%7) yalnızca gerçekleşen satışta alınır.
              </p>
            </div>

            <div className="mt-[18px]">
              <label className={labelCls}>Öne çıkarma etiketleri</label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setAcilSecim((v) => !v)}
                  aria-pressed={acilSecim}
                  className={`flex items-center gap-1.5 rounded-full border-[1.5px] px-4 py-[11px] text-[12.5px] font-bold transition-colors ${
                    acilSecim
                      ? "border-danger bg-danger text-white"
                      : "border-border-input bg-card text-ink-500 hover:border-danger hover:text-danger"
                  }`}
                >
                  ! Acil{acilSecim ? " ✓" : ""}
                </button>
                <button
                  type="button"
                  onClick={() => setPazarlikSecim((v) => !v)}
                  aria-pressed={pazarlikSecim}
                  className={`flex items-center gap-1.5 rounded-full border-[1.5px] px-4 py-[11px] text-[12.5px] font-bold transition-colors ${
                    pazarlikSecim
                      ? "border-accent bg-accent-soft text-accent-ink"
                      : "border-border-input bg-card text-ink-500 hover:border-accent hover:text-accent-ink"
                  }`}
                >
                  Pazarlığa açık{pazarlikSecim ? " ✓" : ""}
                </button>
              </div>
              <p className="mt-2.5 flex items-start gap-2 rounded-control bg-accent-soft px-3 py-2.5 text-[12px] font-semibold leading-relaxed text-accent-ink">
                <span aria-hidden>💡</span>
                <span>
                  Bu etiketler talebini listede öne çıkarır ve satıcıların dikkatini
                  çeker — <b>daha çok sunum ve teklif</b> almanı sağlar.
                </span>
              </p>
            </div>
          </section>

          {/* 3 · Ürün detayları */}
          <section className="rounded-panel border border-border bg-card p-[22px]">
            <div className="flex items-center gap-2.5">
              <span className={stepBadge}>3</span>
              <h2 className="text-[16.5px] font-extrabold text-ink-900">
                Ürün detayları
              </h2>
              <span className="ml-auto text-[11.5px] font-medium text-ink-300">
                isteğe bağlı — doğru satıcıyı bulmayı kolaylaştırır
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-[18px] sm:grid-cols-2">
              <div>
                <label htmlFor="ia-marka" className={labelCls}>Marka / sanatçı</label>
                <input id="ia-marka" value={marka} onChange={(e) => setMarka(e.target.value.slice(0, 40))} placeholder="örn. The Weeknd, Sega" className={inputCls} />
              </div>
              <div>
                <label htmlFor="ia-model" className={labelCls}>Model</label>
                <input id="ia-model" value={model} onChange={(e) => setModel(e.target.value.slice(0, 40))} placeholder="örn. Dawn FM, 3310" className={inputCls} />
              </div>
              <div>
                <label htmlFor="ia-yil" className={labelCls}>Yıl</label>
                <input id="ia-yil" inputMode="numeric" value={yil} onChange={(e) => setYil(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))} placeholder="örn. 2022" className={inputCls} />
              </div>
              <div>
                <label htmlFor="ia-renk" className={labelCls}>Renk</label>
                <input id="ia-renk" value={renk} onChange={(e) => setRenk(e.target.value.slice(0, 30))} placeholder="örn. Siyah, Mor" className={inputCls} />
              </div>
            </div>

            <div className="mt-[18px]">
              <label className={labelCls}>Üründe defo kabul eder misin?</label>
              <div className="flex gap-2">
                {[
                  { v: false, l: "Hayır, defosuz" },
                  { v: true, l: "Evet, olabilir" },
                ].map((o) => (
                  <button
                    key={o.l}
                    type="button"
                    onClick={() => setDefo(o.v)}
                    className={defo === o.v ? pillActive : pillPassive}
                  >
                    {o.l}
                    {defo === o.v ? " ✓" : ""}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-[18px]">
              <label className={labelCls}>Kabul ettiğin ürün durumu</label>
              <div className="flex flex-wrap gap-2">
                {durumList.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDurum(d)}
                    className={durum === d ? pillActive : pillPassive}
                  >
                    {d}
                    {durum === d ? " ✓" : ""}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 4 · Konum + görsel/video + süre */}
          <section className="rounded-panel border border-border bg-card p-[22px]">
            <div className="flex items-center gap-2.5">
              <span className={stepBadge}>4</span>
              <h2 className="text-[16.5px] font-extrabold text-ink-900">
                Konum, görsel ve süre
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="ia-il" className={labelCls}>Şehir</label>
                <select
                  id="ia-il"
                  value={il}
                  onChange={(e) => setIl(e.target.value)}
                  className={`${inputCls} cursor-pointer bg-card`}
                >
                  {ilList.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="ia-ilce" className={labelCls}>İlçe</label>
                <input
                  id="ia-ilce"
                  value={ilce}
                  onChange={(e) => setIlce(e.target.value.slice(0, 30))}
                  placeholder="örn. Kadıköy"
                  className={inputCls}
                />
              </div>
            </div>

            <div className="mt-[18px]">
              <div className="mb-2 flex items-baseline justify-between">
                <label className="text-[13px] font-bold text-ink-900">
                  Fotoğraf / video ekle <span className="text-danger">*</span>
                </label>
                <span className={`text-[11.5px] font-semibold ${fotoOk ? "text-primary-hover" : "text-danger"}`}>
                  {fotolar}/6{fotoOk ? "" : " · en az 1"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {Array.from({ length: 6 }, (_, i) => {
                  const filled = i < fotolar;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFotolar(i < fotolar ? i : i + 1)}
                      aria-label={filled ? `Görsel ${i + 1} — kaldır` : "Görsel/video ekle"}
                      className={`flex aspect-square items-center justify-center rounded-control border-[1.5px] text-[11px] font-bold transition-colors ${
                        filled
                          ? "border-primary bg-primary-soft text-primary-hover"
                          : "border-dashed border-border-input bg-subtle text-ink-400 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {filled ? `✓ ${i + 1}` : "+"}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2.5 text-[11.5px] font-medium leading-relaxed text-ink-300">
                Elinde ürün olmadığı için internetten bulduğun örnek görsel/video
                yeterli — aradığını tanımlar. İlk görsel kapak olur. Önizlemede
                kutulara tıklayarak ekleyip çıkarabilirsin.
              </p>
            </div>

            <div className="mt-[18px] flex items-start gap-2.5 rounded-control border border-border bg-subtle px-3.5 py-3">
              <span className="text-[15px]" aria-hidden>📦</span>
              <p className="text-[12.5px] font-medium leading-relaxed text-ink-500">
                <span className="font-bold text-ink-900">Teslimat: Kargo</span> —
                satıcı, ödeme güvenceye alındıktan sonra 3 gün içinde kargolar.
                BulBana yalnızca kargolu ve güvenceli teslimat sunar.
              </p>
            </div>

            <div className="mt-[18px]">
              <label className={labelCls}>İlan süresi</label>
              <div className="flex flex-wrap gap-2">
                {sureList.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSure(g)}
                    className={sure === g ? pillActive : pillPassive}
                  >
                    {g} gün{sure === g ? " ✓" : ""}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11.5px] font-medium text-ink-300">
                Süre sonunda ilan otomatik kapanır; dilediğinde uzatabilir ya da
                erken kapatabilirsin. Kalan süreyi yalnızca sen görürsün.
              </p>
            </div>
          </section>

          {/* Yayınla */}
          <section className="flex flex-wrap items-center gap-3.5 rounded-panel border border-border bg-card px-[22px] py-[18px]">
            <Button variant="secondary" size="lg" onClick={saveDraft}>
              Taslak Kaydet
            </Button>
            <div className="min-w-[200px] flex-1">
              {canPublish ? (
                <div className="text-xs font-semibold leading-relaxed text-primary-hover">
                  Her şey tamam — talebin yayına hazır ✓
                </div>
              ) : (
                <div className="text-xs font-semibold leading-relaxed text-danger">
                  Eksik: {eksik.join(" · ")}
                </div>
              )}
            </div>
            <Button
              variant="primary"
              disabled={!canPublish}
              onClick={() => canPublish && setPublished(true)}
              className="px-7 py-[17px] text-[15.5px]"
            >
              İlanı Yayınla
            </Button>
          </section>
        </div>

        {/* ── SAĞ SÜTUN: dikey önizleme ── */}
        <aside className="flex flex-col gap-3.5 lg:sticky lg:top-[150px]">
          <div>
            <div className="mb-2.5 text-[10.5px] font-bold uppercase tracking-[1.4px] text-ink-400">
              Canlı önizleme — talep kartın
            </div>
            <div className="mx-auto w-[260px] max-w-full overflow-hidden rounded-card border border-border bg-card shadow-[var(--shadow-pop)]">
              {/* Dikey görsel alanı (3:4) */}
              <div className="ref-image relative flex aspect-[3/4] items-center justify-center">
                <span className="font-mono text-[10px] text-[#968cac]">
                  {fotoText}
                </span>
                <span className="absolute left-2.5 top-2.5 rounded-md bg-accent px-2 py-[5px] text-[9.5px] font-extrabold uppercase tracking-[1px] text-ink-900">
                  Talep
                </span>
              </div>
              <div className="p-[14px]">
                <div className="text-base font-extrabold text-ink-900">
                  {fiyatOk ? fiyatText(fiyatNum) : "— TL"}
                </div>
                <div className="mt-[9px] text-[9.5px] font-extrabold uppercase tracking-[0.8px] text-primary">
                  {marka.trim() || "MARKA"}
                </div>
                <div className="mt-0.5 text-[13px] font-semibold leading-snug text-ink-900">
                  {baslik.trim() || "Talep başlığın burada görünecek"}
                </div>
                <div className="mt-1 line-clamp-2 text-[11.5px] font-medium leading-snug text-ink-400">
                  {aciklama.trim() || "Kısa açıklaman burada görünecek."}
                </div>
                {(acilSecim || pazarlikSecim) && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {acilSecim && <Chip variant="acil">! Acil</Chip>}
                    {pazarlikSecim && (
                      <Chip variant="pazarlik">Pazarlığa açık</Chip>
                    )}
                  </div>
                )}
                <div className="mt-2.5 border-t border-hairline pt-2 text-[11px] font-medium text-ink-400">
                  {konumText} · 0 sunum
                </div>
              </div>
            </div>
          </div>

          {/* İpuçları */}
          <div className="rounded-card border border-border bg-card p-[18px]">
            <div className="text-xs font-bold uppercase tracking-[1px] text-ink-400">
              İyi ilan ipuçları
            </div>
            <div className="mt-3 flex flex-col gap-2.5">
              {[
                "Başlığa model, baskı ve yıl yaz — doğru satıcıya ulaşırsın.",
                "Görsel/video ekleyen talepler belirgin şekilde daha çok sunum alır.",
                "Acil ve Pazarlığa açık etiketleri talebini öne çıkarır.",
              ].map((t) => (
                <div
                  key={t}
                  className="flex gap-[9px] text-[12.5px] font-medium leading-relaxed text-ink-700"
                >
                  <span className="font-extrabold text-primary">·</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Süreç */}
          <div className="rounded-card bg-ink-900 p-[18px] text-white">
            <div className="text-xs font-bold uppercase tracking-[1px] text-[#8b7bb0]">
              Yayınladıktan sonra
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {[
                "Satıcılardan sunumlar gelir — yalnızca sen görürsün",
                "Beğendiğinden teklif iste, sohbette pazarlık et",
                "Kabul et — satıcı 3 günde kargolar, ödeme güvende",
              ].map((t, i) => (
                <div key={t} className="flex items-center gap-2.5">
                  <span className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-accent text-[10.5px] font-extrabold text-ink-900">
                    {i + 1}
                  </span>
                  <span className="text-[12.5px] font-semibold leading-snug text-[#d9d2ea]">
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Taslak toast */}
      {toastOn && (
        <>
          <style>{`@keyframes bbToastUp{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}`}</style>
          <div
            role="status"
            className="fixed bottom-7 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-ink-900 px-5 py-3.5 text-[13.5px] font-semibold text-white shadow-[var(--shadow-pop)]"
            style={{ animation: "bbToastUp 0.25s ease" }}
          >
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-[10px] font-extrabold text-ink-900">
              ✓
            </span>
            Taslağın bu cihaza kaydedildi — bir dahaki sefere kaldığın yerden
            devam edebilirsin.
          </div>
        </>
      )}
    </main>
  );
}
