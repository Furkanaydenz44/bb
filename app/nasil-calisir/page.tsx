import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { NasilSSS } from "./NasilSSS";

export const metadata: Metadata = {
  title: "Nasıl Çalışır?",
  description:
    "BulBana ters pazardır: ilanı alıcı açar, fiyatı alıcı belirler, satıcı talebe gelir. Alıcı ve satıcı akışı, %7 komisyon modeli ve güvence kuralları.",
};

const aliciAdimlar = [
  {
    n: "1",
    baslik: "Talebini ilan et",
    metin:
      "Ürünü referans görsellerle tanımla, kabul ettiğin durumu ve tek fiyatını yaz. Ücretsiz.",
  },
  {
    n: "2",
    baslik: "Sunumları incele",
    metin:
      "Satıcılar 3–10 fotoğraf ve açıklamayla gelir. Sunumları yalnızca sen görürsün.",
  },
  {
    n: "3",
    baslik: "Teklif iste, pazarlık et",
    metin:
      "Beğendiğin sunumdan teklif iste; sohbet açılır, fiyatta orada anlaşırsınız.",
  },
  {
    n: "4",
    baslik: "Öde, teslim al, onayla",
    metin:
      "Ödemen güvencede tutulur; ürünü onayladığında satıcıya aktarılır.",
  },
];

const saticiAdimlar = [
  {
    n: "1",
    baslik: "Talepleri keşfet",
    metin:
      "Kategorindeki gerçek alıcı taleplerini filtrele; fiyat baştan belli.",
  },
  {
    n: "2",
    baslik: "Sunum gönder",
    metin:
      "Ürününü fotoğraf, açıklama ve durumuyla tanıt. Tamamen ücretsiz.",
  },
  {
    n: "3",
    baslik: "Teklif ver, anlaş",
    metin:
      "Alıcı teklif isterse fiyatını ver; revize teklif ve pazarlık için ek ücret yok.",
  },
  {
    n: "4",
    baslik: "Alıcı onaylasın, kazancın cüzdanında!",
    metin:
      "Ödeme güvende; alıcı ürünü onaylayınca ödemen hesaba geçer.",
  },
];

const guvenceler = [
  {
    isaret: "✓",
    baslik: "Ödeme güvende",
    metin:
      "Ödeme, alıcı ürünü onaylayana kadar BulBana'da tutulur; iki taraf da korunur.",
  },
  {
    isaret: "3",
    baslik: "3 gün kargo kuralı",
    metin:
      "Satıcı, kabul edilen teklifin ardından 3 gün içinde kargolayıp takip no'yu sohbete girer.",
  },
  {
    isaret: "!",
    baslik: "İtiraz hakkı",
    metin:
      "Ürün anlatıldığı gibi çıkmazsa alıcı itiraz eder; destek ekibi inceler, gerekirse iade edilir.",
  },
];

export default function NasilCalisirPage() {
  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-16 pt-12">
      {/* ── Hero ── */}
      <div className="mx-auto max-w-[640px] text-center">
        <span className="inline-block rounded-lg bg-accent px-3 py-2 text-[11px] font-extrabold uppercase tracking-[1.6px] text-ink-900">
          Ters Pazar
        </span>
        <h1 className="mt-4 text-balance text-[38px] font-extrabold leading-[1.15] tracking-[-1.2px] text-ink-900">
          Alışılmışın tersi: ilanı alıcı açar, satıcı talebe gelir.
        </h1>
        <p className="mt-3.5 text-pretty text-[15px] font-semibold leading-relaxed text-ink-700">
          Bulunamayan, nadir, koleksiyonluk ya da stoku bitmiş ürünler için alıcı
          tek fiyatla talep açar; elinde o ürün olan satıcılar sunumlarıyla gelir.
        </p>
      </div>

      {/* ── Alıcı akışı ── */}
      <section className="mt-11">
        <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
          <span className="rounded-lg bg-primary-soft px-3 py-2 text-[11px] font-extrabold uppercase tracking-[1.4px] text-primary-hover">
            Alıcıysan
          </span>
          <span className="text-[13.5px] font-semibold text-ink-700">
            Aradığını bulamıyorsan, aramayı bırak — İlanını aç, aradığın seni
            bulsun.
          </span>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {aliciAdimlar.map((a) => (
            <div
              key={a.n}
              className="rounded-card border border-border bg-card p-5"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-white">
                {a.n}
              </div>
              <h3 className="mt-3 text-[14.5px] font-bold leading-snug text-ink-900">
                {a.baslik}
              </h3>
              <p className="mt-1.5 text-[12.5px] font-semibold leading-relaxed text-ink-700">
                {a.metin}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Satıcı akışı ── */}
      <section className="mt-7 rounded-panel bg-ink-900 p-[26px] text-white">
        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <span className="rounded-lg bg-accent px-3 py-2 text-[11px] font-extrabold uppercase tracking-[1.4px] text-ink-900">
            Satıcıysan
          </span>
          <span className="text-[13px] font-semibold text-[#e5dff5]">
            Müşteri bekleme, reklama para yakma — talep hazır, sen gel.
          </span>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {saticiAdimlar.map((a) => (
            <div key={a.n} className="rounded-[14px] bg-[#3a2a5c] p-[18px]">
              <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-accent text-xs font-bold text-ink-900">
                {a.n}
              </div>
              <h3 className="mt-2.5 text-sm font-bold leading-snug">
                {a.baslik}
              </h3>
              <p className="mt-1.5 text-xs font-semibold leading-relaxed text-[#e5dff5]">
                {a.metin}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Komisyon ── */}
      <section
        id="komisyon"
        className="mt-7 grid scroll-mt-[150px] items-start gap-5 md:grid-cols-2"
      >
        <div className="rounded-panel border border-border bg-card p-6">
          <h2 className="text-xl font-extrabold text-ink-900">
            Basit komisyon modeli
          </h2>
          <p className="mt-1.5 text-[13px] font-semibold leading-relaxed text-ink-700">
            Üyelik, ilan, sunum, teklif ve pazarlık ücretsizdir. BulBana yalnızca{" "}
            <strong className="text-ink-900">
              gerçekleşen satıştan %7 komisyon
            </strong>{" "}
            alır; satış olmazsa kimse bir şey ödemez.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {[
              "Komisyon, anlaşılan fiyat üzerinden satış bedelinden düşülür.",
              "Alıcı, anlaşılan fiyattan fazlasını ödemez.",
              "İptal ya da iade durumunda komisyon alınmaz.",
            ].map((t) => (
              <div
                key={t}
                className="flex gap-2.5 text-[12.5px] font-semibold leading-relaxed text-ink-700"
              >
                <span className="font-extrabold text-primary">·</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-panel border border-border bg-card p-6">
          <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[1.2px] text-ink-400">
            Örnek hesap
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between text-[13.5px] font-medium">
              <span className="text-ink-500">Anlaşılan fiyat</span>
              <span className="font-bold text-ink-900">4.500 TL</span>
            </div>
            <div className="flex justify-between text-[13.5px] font-medium">
              <span className="text-ink-500">BulBana komisyonu (%7)</span>
              <span className="font-bold text-danger">− 315 TL</span>
            </div>
            <div className="flex justify-between border-t border-hairline pt-2.5 text-sm font-medium">
              <span className="font-bold text-ink-900">Satıcıya aktarılan</span>
              <span className="text-[17px] font-extrabold text-primary-hover">
                4.185 TL
              </span>
            </div>
          </div>
          <p className="mt-3.5 text-[11.5px] font-medium leading-relaxed text-ink-300">
            Aktarım, alıcı ürünü teslim alıp onayladığı anda yapılır.
          </p>
        </div>
      </section>

      {/* ── Güvence kuralları ── */}
      <section className="mt-7 grid gap-4 md:grid-cols-3">
        {guvenceler.map((g) => (
          <div
            key={g.baslik}
            className="rounded-card border border-border bg-card p-5"
          >
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-accent text-sm font-extrabold text-ink-900">
              {g.isaret}
            </div>
            <h3 className="mt-3 text-[15px] font-extrabold leading-snug text-ink-900">
              {g.baslik}
            </h3>
            <p className="mt-1.5 text-[12.5px] font-semibold leading-relaxed text-ink-700">
              {g.metin}
            </p>
          </div>
        ))}
      </section>

      {/* ── SSS ── */}
      <section className="mx-auto mt-10 max-w-[760px]">
        <h2 className="mb-4 text-center text-[22px] font-extrabold text-ink-900">
          Sık sorulan sorular
        </h2>
        <NasilSSS />
      </section>

      {/* ── CTA ── */}
      <section className="mt-10 rounded-panel border border-border bg-card p-8 text-center">
        <h2 className="text-2xl font-extrabold text-ink-900">Hazırsan başla</h2>
        <p className="mt-2 text-[13.5px] font-medium text-ink-500">
          Tek hesapla hem al hem sat — hangi taraftan başlayacağın sana kalmış.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          <ButtonLink href="/ilan-ac" variant="primary" size="lg">
            Aradığını İlan Et
          </ButtonLink>
          <ButtonLink href="/kesfet" variant="secondary" size="lg">
            Talepleri Keşfet
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
