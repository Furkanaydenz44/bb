"use client";

import { useState } from "react";
import Link from "next/link";
import { getTalep } from "@/lib/data";
import type { Talep } from "@/lib/data";
import { TalepCard } from "@/components/TalepCard";

type Yorum = {
  ad: string;
  harf: string;
  urun: string;
  tarih: string;
  yildiz: string;
  text: string;
};

const yorumlarBase: Yorum[] = [
  {
    ad: "emre.k",
    harf: "EK",
    urun: 'Radiohead "In Rainbows" CD',
    tarih: "Haziran 2026",
    yildiz: "★★★★★",
    text: "Sunumdaki fotoğraflarla birebir aynı ürün geldi. Sertifika dahildi, paketleme kusursuz. Dawn FM için de sunum bekliyorum!",
  },
  {
    ad: "cdkolik",
    harf: "CK",
    urun: "Pink Floyd DSOTM 30th CD",
    tarih: "Haziran 2026",
    yildiz: "★★★★★",
    text: "Pazarlık kibardı, fiyatta ortak noktada buluştuk. Aynı gün kargoladı, takip numarası anında sohbete düştü.",
  },
  {
    ad: "analogsever",
    harf: "AS",
    urun: "Miles Davis Kind of Blue plak",
    tarih: "Mayıs 2026",
    yildiz: "★★★★☆",
    text: "Ürün tarif edildiği gibi; kutu köşesinde küçük ezik vardı ama sunumda belirtilmişti. Dürüst satıcı.",
  },
  {
    ad: "retro.adana",
    harf: "RA",
    urun: "Sony Discman D-EJ815",
    tarih: "Mayıs 2026",
    yildiz: "★★★★★",
    text: "Bulamadığım ürünü talebime 3 saat içinde sundu. Süreç baştan sona sorunsuzdu, teşekkürler.",
  },
];

const yorumlarEkstra: Yorum[] = [
  {
    ad: "vinylhunter",
    harf: "VH",
    urun: "The Beatles Abbey Road plak",
    tarih: "Nisan 2026",
    yildiz: "★★★★★",
    text: "COA belgesi ve kanıt fotoğrafları eksiksizdi. Plak çizik barındırmıyordu, iç zarf bile yenilenmişti.",
  },
  {
    ad: "melih.k",
    harf: "MK",
    urun: "Daft Punk RAM 2xLP",
    tarih: "Nisan 2026",
    yildiz: "★★★★★",
    text: "İki gün beklediğim baskıyı talebe sundu, kargoyu aynı gün verdi. İletişimi hızlı ve net.",
  },
  {
    ad: "gozde.ist",
    harf: "Gİ",
    urun: "Norah Jones Come Away With Me CD",
    tarih: "Mart 2026",
    yildiz: "★★★★☆",
    text: "Ürün açıklandığı gibiydi, teslimat biraz gecikti ama önceden haber verdi. Yine alışveriş yaparım.",
  },
];

// plakdukkani34 hem satar hem alır — bir plak dükkanı olarak açtığı talepler.
const acikTalepler: Talep[] = [
  getTalep("daft-punk-discovery-plak"),
  getTalep("kraftwerk-man-machine-plak"),
].filter((t): t is Talep => Boolean(t));

const puanDagilimi = [
  { yildiz: 5, sayi: 75, genislik: 84, renk: "bg-primary" },
  { yildiz: 4, sayi: 10, genislik: 11, renk: "bg-primary" },
  { yildiz: 3, sayi: 3, genislik: 3, renk: "bg-star" },
  { yildiz: 2, sayi: 1, genislik: 1, renk: "bg-danger" },
  { yildiz: 1, sayi: 0, genislik: 0, renk: "bg-danger" },
];

const metrikChipler = [
  "Ort. kargolama · 1 gün",
  "Yanıt süresi · ~1 saat",
  "%1 iptal",
  "Uzmanlık: Müzik & Plak",
];

export function SaticiProfiliClient() {
  const [tab, setTab] = useState<"yorumlar" | "talepler">("yorumlar");
  const [follow, setFollow] = useState(false);
  const [hepsiGor, setHepsiGor] = useState(false);
  const [bildirildi, setBildirildi] = useState(false);

  const yorumlar = hepsiGor ? [...yorumlarBase, ...yorumlarEkstra] : yorumlarBase;
  const takipci = 312 + (follow ? 1 : 0);

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-16 pt-[22px]">
      {/* Breadcrumb */}
      <nav className="pb-3.5 text-[12.5px] font-medium text-ink-400">
        <Link
          href="/ilan/dawn-fm-imzali-cd"
          className="text-ink-400 hover:text-primary"
        >
          İmzalı The Weeknd "Dawn FM" CD arıyorum
        </Link>
        <span className="mx-1.5">›</span>
        <span className="font-semibold text-ink-900">plakdukkani34</span>
      </nav>

      {/* Profil kartı */}
      <section className="flex flex-wrap items-start gap-5 rounded-panel border border-border bg-card p-[26px]">
        <div className="flex h-[88px] w-[88px] flex-none items-center justify-center rounded-full bg-ink-900 text-[26px] font-extrabold text-accent">
          PD
        </div>
        <div className="min-w-[280px] flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[26px] font-extrabold tracking-[-0.5px] text-ink-900">
              plakdukkani34
            </h1>
            <span className="flex-none whitespace-nowrap rounded-full bg-primary-soft px-2.5 py-1.5 text-[11px] font-bold text-primary-hover">
              ✓ Kimlik doğrulandı
            </span>
            <span className="flex-none whitespace-nowrap rounded-full bg-ink-900 px-2.5 py-1.5 text-[11px] font-bold text-accent">
              Güvenilir Satıcı
            </span>
          </div>
          <div className="mt-2 text-[13px] font-medium text-ink-400">
            <span className="font-bold text-star">★ 4.8</span> · 89 değerlendirme
            · Beyoğlu, İstanbul · 2023&apos;ten beri üye
          </div>
          <p className="mt-2.5 max-w-[560px] text-[13.5px] font-medium leading-relaxed text-ink-700">
            Fiziksel dükkanı olan plak/CD satıcısıyım. İmzalı ve koleksiyonluk
            baskılarda sertifika (COA) sağlarım; tüm sunumlarımda kanıt fotoğrafı
            bulunur. Aynı gün kargo.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {metrikChipler.map((m) => (
              <span
                key={m}
                className="rounded-full bg-page px-2.5 py-[7px] text-[11.5px] font-semibold text-ink-500"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="flex min-w-[170px] flex-none flex-col gap-2">
          <button
            type="button"
            onClick={() => setFollow((v) => !v)}
            className={`cursor-pointer rounded-[12px] px-[18px] text-sm font-bold ${
              follow
                ? "border-[1.5px] border-[#ddd6fe] bg-primary-soft py-[13px] text-primary-hover"
                : "bg-primary py-[14px] text-white hover:bg-primary-hover"
            }`}
          >
            {follow ? "Takip ediliyor ✓" : "Satıcıyı Takip Et"}
          </button>
          <Link
            href="/mesajlar"
            className="rounded-[12px] border-[1.5px] border-border-input bg-card px-[18px] py-[13px] text-center text-[13.5px] font-bold text-ink-900 hover:border-primary hover:text-primary"
          >
            Mesaj Gönder
          </Link>
          {bildirildi ? (
            <span className="p-1.5 text-center text-xs font-bold text-accent-ink">
              Bildirimin alındı ✓
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setBildirildi(true)}
              className="cursor-pointer p-1.5 text-xs font-semibold text-ink-300 hover:text-primary"
            >
              Profili bildir
            </button>
          )}
        </div>
      </section>

      {/* Güven metrikleri */}
      <section className="mt-3.5 grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <div className="rounded-[14px] border border-border bg-card p-4">
          <div className="text-2xl font-extrabold text-ink-900">214</div>
          <div className="mt-1.5 text-xs font-semibold leading-snug text-ink-400">
            Tamamlanan satış
          </div>
        </div>
        <div className="rounded-[14px] border border-border bg-card p-4">
          <div className="text-2xl font-extrabold text-ink-900">%98</div>
          <div className="mt-1.5 text-xs font-semibold leading-snug text-ink-400">
            Zamanında kargo
          </div>
        </div>
        <div className="rounded-[14px] border border-border bg-card p-4">
          <div className="text-2xl font-extrabold text-primary">%92</div>
          <div className="mt-1.5 text-xs font-semibold leading-snug text-ink-400">
            Teklifi kabulle sonuçlanan sohbet
          </div>
        </div>
        <div className="rounded-[14px] border border-border bg-card p-4">
          <div className="text-2xl font-extrabold text-ink-900">{takipci}</div>
          <div className="mt-1.5 text-xs font-semibold leading-snug text-ink-400">
            Takipçi
          </div>
        </div>
      </section>

      {/* Sekmeler */}
      <div className="mt-[22px] flex gap-2 border-b border-border">
        <button
          type="button"
          onClick={() => setTab("yorumlar")}
          className={`cursor-pointer border-b-[2.5px] px-4 py-3 text-sm ${
            tab === "yorumlar"
              ? "border-primary font-bold text-primary"
              : "border-transparent font-semibold text-ink-400 hover:text-ink-900"
          }`}
        >
          Değerlendirmeler (89)
        </button>
        <button
          type="button"
          onClick={() => setTab("talepler")}
          className={`cursor-pointer border-b-[2.5px] px-4 py-3 text-sm ${
            tab === "talepler"
              ? "border-primary font-bold text-primary"
              : "border-transparent font-semibold text-ink-400 hover:text-ink-900"
          }`}
        >
          Açık Talepleri ({acikTalepler.length})
        </button>
      </div>

      {/* Değerlendirmeler */}
      {tab === "yorumlar" && (
        <section className="mt-[18px] grid items-start gap-5 md:grid-cols-[260px_minmax(0,1fr)]">
          <div className="rounded-card border border-border bg-card p-[18px]">
            <div className="flex items-baseline gap-2">
              <span className="text-[34px] font-extrabold leading-none text-ink-900">
                4,8
              </span>
              <span className="text-[15px] font-bold text-star" aria-hidden>
                ★★★★<span className="text-border-input">★</span>
              </span>
            </div>
            <div className="mt-1 text-xs font-medium text-ink-400">
              89 değerlendirme
            </div>
            <div className="mt-3.5 flex flex-col gap-[7px]">
              {puanDagilimi.map((p) => (
                <div key={p.yildiz} className="flex items-center gap-2">
                  <span className="w-3 text-[11px] font-semibold text-ink-500">
                    {p.yildiz}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-hairline">
                    <div
                      className={`h-full rounded-full ${p.renk}`}
                      style={{ width: `${p.genislik}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-[11px] font-semibold text-ink-300">
                    {p.sayi}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3.5 text-[11px] font-medium leading-normal text-ink-300">
              Değerlendirmeler yalnızca tamamlanmış siparişlerden yazılabilir.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {yorumlar.map((y) => (
              <article
                key={y.ad}
                className="rounded-[14px] border border-border bg-card p-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary-soft text-[11.5px] font-bold text-primary-hover">
                    {y.harf}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-bold leading-tight text-ink-900">
                      {y.ad}
                    </div>
                    <div className="mt-[3px] text-[11.5px] font-medium text-ink-400">
                      {y.urun} · {y.tarih}
                    </div>
                  </div>
                  <span className="flex-none text-[13px] font-bold text-star">
                    {y.yildiz}
                  </span>
                </div>
                <p className="mt-3 text-[13.5px] font-medium leading-relaxed text-ink-700">
                  {y.text}
                </p>
              </article>
            ))}
            {!hepsiGor ? (
              <button
                type="button"
                onClick={() => setHepsiGor(true)}
                className="cursor-pointer rounded-[12px] border-[1.5px] border-border-input bg-card p-[13px] text-[13px] font-bold text-ink-900 hover:border-primary hover:text-primary"
              >
                Daha fazla göster
              </button>
            ) : (
              <div className="rounded-[12px] border border-border bg-subtle p-[13px] text-center text-xs font-semibold leading-normal text-ink-400">
                Bu prototipte ilk {yorumlar.length} değerlendirme yüklü.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Açık talepleri (satıcı da alıcıdır) */}
      {tab === "talepler" && (
        <section className="mt-[18px]">
          <p className="mb-3.5 max-w-[700px] rounded-[10px] bg-primary-soft px-3 py-2.5 text-[12.5px] font-medium leading-normal text-primary-hover">
            BulBana&apos;da her hesap hem alır hem satar — plakdukkani34&apos;ün
            alıcı olarak açtığı talepler:
          </p>
          <div className="grid max-w-[900px] grid-cols-2 gap-4 md:grid-cols-3">
            {acikTalepler.map((t) => (
              <TalepCard key={t.id} talep={t} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
