import Link from "next/link";
import Image from "next/image";
import {
  talepler,
  kategoriler,
  getTalep,
  kategoriSayilari,
  fiyatText,
} from "@/lib/data";
import { TalepCard } from "@/components/TalepCard";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

const heroTalep = getTalep("dawn-fm-imzali-cd")!;

const nasilAdimlar = [
  {
    n: "1",
    baslik: "Talebini aç",
    metin:
      "Aradığın ürünü, fiyatını ve durumunu birkaç dakikada ilan et. Fiyatı sen belirlersin.",
  },
  {
    n: "2",
    baslik: "Sunumlar sana gelsin",
    metin:
      "Elinde o ürün olan satıcılar fotoğraflı sunumlarıyla talebine gelir; hepsini tek yerde karşılaştır.",
  },
  {
    n: "3",
    baslik: "Anlaş, güvenle al",
    metin:
      "Beğendiğinden teklif iste, sohbette pazarlık et; ödeme alıcı onayına kadar BulBana güvencesinde.",
  },
];

export default function AnaSayfa() {
  // "Yeni açılan talepler" — gerçekten en yeniler (eklendi'ye göre).
  const guncel = [...talepler].sort((a, b) => a.eklendi - b.eklendi).slice(0, 8);
  const katSayi = kategoriSayilari();

  return (
    <main>
      {/* ── Hero ── */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 py-16 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-block rounded-lg bg-accent px-3 py-2 text-[11px] font-extrabold uppercase tracking-[1.6px] text-ink-900">
              Ters Pazar
            </span>
            <h1 className="mt-[18px] text-balance text-[46px] font-extrabold leading-[1.12] tracking-[-1.5px] text-ink-900">
              Bulamadığın ürünü ilan et,{" "}
              <span className="text-primary">satıcılar sana gelsin.</span>
            </h1>
            <p className="mt-[18px] max-w-[480px] text-pretty text-base font-medium leading-relaxed text-ink-500">
              BulBana&apos;da fiyatı alıcı belirler. Nadir, koleksiyon ya da
              stokta kalmamış ürünler için talep aç; elinde o ürün olan satıcılar
              fotoğraflı sunumlarıyla sana ulaşsın.
            </p>
            <div className="mt-[26px] flex flex-wrap gap-3">
              <ButtonLink href="/ilan-ac" variant="primary" size="lg">
                Aradığını İlan Et
              </ButtonLink>
              <ButtonLink href="/kesfet" variant="sellerOutline" size="lg">
                Talepleri Keşfet — satıcıyım
              </ButtonLink>
            </div>
            <p className="mt-[18px] text-[12.5px] font-semibold text-ink-400">
              İlan, sunum ve teklif ücretsiz · yalnızca gerçekleşen satıştan{" "}
              <span className="text-primary-hover">%7 komisyon</span>
            </p>
          </div>

          {/* Görsel — tek temiz kart */}
          <div className="relative hidden md:block">
            <div
              aria-hidden
              className="absolute right-4 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-2 left-0 h-44 w-44 rounded-full bg-accent/25 blur-3xl"
            />

            <div className="relative mx-auto w-[330px] rounded-panel border border-border bg-card p-3 shadow-[var(--shadow-hero)]">
              <Link href="/ilan/dawn-fm-imzali-cd" className="group block">
                <div className="relative flex h-[186px] items-center justify-center overflow-hidden rounded-card bg-subtle">
                  <Image
                    src="/talepler/dawn-fm-imzali-cd-1.jpg"
                    alt='İmzalı The Weeknd "Dawn FM" CD'
                    fill
                    sizes="330px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    priority
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-accent px-[9px] py-1.5 text-[10px] font-extrabold uppercase tracking-[1px] text-ink-900">
                    Talep
                  </span>
                </div>
                <div className="px-2 pt-3.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-[22px] font-extrabold tracking-[-0.5px] text-ink-900">
                      {fiyatText(heroTalep.fiyatNum)}
                    </div>
                    <Chip variant="pazarlik">Pazarlığa açık</Chip>
                  </div>
                  <div className="mt-1.5 text-[14px] font-bold leading-snug text-ink-900">
                    {heroTalep.baslik}
                  </div>
                  <div className="mt-1 text-[12px] font-medium text-ink-400">
                    Kadıköy, İstanbul · alıcının belirlediği fiyat
                  </div>
                </div>
              </Link>

              <div className="mt-3 flex items-center gap-2.5 rounded-card bg-page px-3 py-2.5">
                <div className="flex -space-x-2">
                  {[
                    { t: "PD", c: "bg-ink-900 text-accent" },
                    { t: "MM", c: "bg-primary text-white" },
                    { t: "KM", c: "bg-accent text-ink-900" },
                  ].map((a) => (
                    <span
                      key={a.t}
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold ring-2 ring-page ${a.c}`}
                    >
                      {a.t}
                    </span>
                  ))}
                </div>
                <span className="text-[12px] font-semibold text-ink-700">
                  {heroTalep.sunum} satıcı sunum gönderdi
                </span>
                <span className="ml-auto text-[13px] font-bold text-accent-ink">
                  ✓
                </span>
              </div>
            </div>

            <div className="absolute -right-3 top-9 z-10 rounded-card border border-border bg-card px-3.5 py-2.5 shadow-[0_10px_26px_rgb(46_26_71/0.12)]">
              <div className="text-[12px] font-bold text-ink-900">
                Teklif istendi ✓
              </div>
              <div className="mt-0.5 text-[10.5px] font-medium text-ink-400">
                Sohbet açıldı
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kategoriler ── */}
      <section
        id="kategoriler"
        className="mx-auto max-w-[1180px] px-6 pb-2 pt-11"
      >
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-[22px] font-extrabold text-ink-900">
            Kategorilere göz at
          </h2>
          <Link href="/kesfet" className="text-[13px] font-semibold">
            Tüm kategoriler ›
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {kategoriler.map((k) => (
            <Link
              key={k.ad}
              href={`/kesfet?kategori=${encodeURIComponent(k.ad)}`}
              className="flex items-center gap-3 rounded-card border border-border bg-card px-4 py-[13px] hover:border-primary"
            >
              <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-primary-soft text-[15px] font-extrabold text-primary-hover">
                {k.harf}
              </div>
              <div>
                <div className="text-[13.5px] font-bold text-ink-900">
                  {k.ad}
                </div>
                <div className="mt-[3px] text-[11.5px] font-medium text-ink-400">
                  {katSayi[k.ad] ?? 0} açık talep
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Yeni açılan talepler ── */}
      <section className="mx-auto max-w-[1180px] px-6 pb-2 pt-10">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <h2 className="text-[22px] font-extrabold text-ink-900">
              Yeni açılan talepler
            </h2>
            <p className="mt-1.5 text-[13px] font-medium text-ink-400">
              Elinde bu ürünlerden varsa, sunumunu gönder — alıcı seni bekliyor.
            </p>
          </div>
          <Link href="/kesfet" className="text-[13px] font-semibold">
            Tümünü gör ›
          </Link>
        </div>
        <div className="mt-[18px] grid grid-cols-2 gap-4 md:grid-cols-4">
          {guncel.map((t) => (
            <TalepCard key={t.id} talep={t} />
          ))}
        </div>
      </section>

      {/* ── Nasıl çalışır ── */}
      <section className="mx-auto max-w-[1180px] px-6 pb-16 pt-12">
        <h2 className="text-[22px] font-extrabold text-ink-900">
          Nasıl çalışır?
        </h2>
        <div className="mt-[18px] grid gap-4 md:grid-cols-3">
          {nasilAdimlar.map((a) => (
            <div
              key={a.n}
              className="rounded-panel border border-border bg-card p-6"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-control bg-primary text-[13px] font-extrabold text-white">
                {a.n}
              </div>
              <h3 className="mt-3.5 text-[15px] font-bold text-ink-900">
                {a.baslik}
              </h3>
              <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-ink-500">
                {a.metin}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
