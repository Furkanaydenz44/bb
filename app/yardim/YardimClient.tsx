"use client";

import { useState } from "react";
import Link from "next/link";

function tr(s: string) {
  return s.toLocaleLowerCase("tr");
}

/* Kategori kartındaki bağımsız açılır madde */
function KategoriAccordion({ soru, cevap }: { soru: string; cevap: string }) {
  const [acik, setAcik] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setAcik((v) => !v)}
        aria-expanded={acik}
        className="flex w-full cursor-pointer items-center justify-between gap-2 text-left text-[12.5px] font-medium leading-snug text-primary"
      >
        <span>{soru}</span>
        <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-primary-soft text-[11px] font-bold text-primary-hover">
          {acik ? "−" : "+"}
        </span>
      </button>
      {acik && (
        <div className="mt-2 rounded-lg border-l-2 border-primary bg-subtle px-3 py-2.5 text-xs font-medium leading-relaxed text-ink-400">
          {cevap}
        </div>
      )}
    </div>
  );
}

type Makale = {
  baslik: string;
  kategori: string;
  href?: string;
  cevap?: string;
};

const makaleler: Makale[] = [
  {
    baslik: "Komisyon kimden, ne zaman alınır?",
    kategori: "Ödeme",
    href: "/nasil-calisir#komisyon",
  },
  {
    baslik: "Ödemem satıcıya ne zaman aktarılır?",
    kategori: "Ödeme",
    cevap:
      "Ödeme, alıcı teslimatı onaylayana kadar BulBana güvencesinde bekletilir; erken serbest bırakılmaz. Alıcı onay verdiği anda anlaşılan tutardan %7 komisyon düşülür ve kalan tutar satıcı cüzdanına aktarılır.",
  },
  {
    baslik: "Ürün anlatıldığı gibi çıkmazsa ne yapmalıyım?",
    kategori: "İtiraz",
    href: "/itiraz",
  },
  {
    baslik: "3 gün kargo kuralına uyulmazsa ne olur?",
    kategori: "Kargo",
    cevap:
      "Satıcı, teklif kabulünden sonraki 72 saat (3 gün) içinde kargolayıp takip numarasını girmezse satış otomatik olarak iptal edilir. Bu durumda alıcının ödemesi eksiksiz iade edilir ve gecikme satıcının performans puanına yansır.",
  },
  {
    baslik: "Sunumumu kimler görebilir?",
    kategori: "Satıcı",
    href: "/nasil-calisir",
  },
  {
    baslik: "Talebimin süresini nasıl uzatırım?",
    kategori: "Alıcı",
    cevap:
      "Taleplerim / İlan Yönetimi sayfasından ilanını açıp süreyi +7 veya +14 gün uzatabilirsin (toplamda en fazla 30 gün). İstersen aynı ekrandan talebini erkenden de kapatabilirsin; süre uzatmak ücretsizdir.",
  },
  {
    baslik: "Pazarlıkta ek ücret öder miyim?",
    kategori: "Teklif",
    href: "/nasil-calisir",
  },
  {
    baslik: "Hesabımı nasıl doğrularım?",
    kategori: "Hesap",
    cevap:
      "Kimlik Doğrulama sayfasından kimliğinin ön ve arka yüzü ile bir selfie yüklemen yeterli. Belgeler SSL ile şifrelenir, ekip ortalama 24 saat içinde inceler ve onaylandığında profiline “✓ Kimlik doğrulandı” rozeti eklenir.",
  },
];

export function YardimClient() {
  const [q, setQ] = useState("");
  const [acikBaslik, setAcikBaslik] = useState<string | null>(null);

  const qq = tr(q.trim());
  const sonuc = makaleler.filter(
    (m) => !qq || tr(m.baslik).includes(qq) || tr(m.kategori).includes(qq),
  );

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-16 pt-12">
      {/* ── Hero + arama ── */}
      <div className="mx-auto max-w-[560px] text-center">
        <h1 className="text-[34px] font-extrabold leading-[1.15] tracking-[-1px] text-ink-900">
          Nasıl yardımcı olabiliriz?
        </h1>
        <div className="mt-[18px] flex items-center gap-2 rounded-[14px] border-[1.5px] border-border-input bg-card px-4 py-3.5 focus-within:border-primary">
          <span className="block h-[15px] w-[15px] flex-none rounded-full border-2 border-ink-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value.slice(0, 50))}
            placeholder="Konu ara: komisyon, kargo, itiraz..."
            className="w-full border-none bg-transparent text-sm font-medium text-ink-900 outline-none"
          />
        </div>
      </div>

      {/* ── Kategoriler ── */}
      <div className="mt-9 grid gap-4 md:grid-cols-3">
        {/* Alıcılar */}
        <div className="rounded-card border border-border bg-card p-5">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-primary-soft text-[15px] font-extrabold text-primary-hover">
            A
          </div>
          <div className="mt-3 text-[15px] font-extrabold text-ink-900">
            Alıcılar
          </div>
          <div className="mt-2.5 flex flex-col gap-2">
            <Link
              href="/nasil-calisir"
              className="text-[12.5px] font-medium leading-snug"
            >
              Talep nasıl açılır?
            </Link>
            <Link
              href="/nasil-calisir"
              className="text-[12.5px] font-medium leading-snug"
            >
              Sunumları kim görür?
            </Link>
            <KategoriAccordion
              soru="Alıcı kalitesi nasıl hesaplanır?"
              cevap="Alıcı kalitesi; tamamladığın alımlar, mesajlara yanıt hızın ve iptal oranın birlikte değerlendirilerek hesaplanır. Skorun yükseldikçe profilinde “güvenilir alıcı” rozeti belirir; satıcılar bu rozeti gördüğünde talebine daha çok ve daha iyi sunum gönderir."
            />
          </div>
        </div>

        {/* Satıcılar */}
        <div className="rounded-card border border-border bg-card p-5">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-ink-900 text-[15px] font-extrabold text-accent">
            S
          </div>
          <div className="mt-3 text-[15px] font-extrabold text-ink-900">
            Satıcılar
          </div>
          <div className="mt-2.5 flex flex-col gap-2">
            <KategoriAccordion
              soru="İyi sunum nasıl hazırlanır?"
              cevap="İyi bir sunum; ürünü net gösteren gerçek fotoğraflar, dürüst bir durum açıklaması ve alıcının bütçesine uygun bir fiyat beklentisi içerir. İmzalı ya da koleksiyon ürünlerinde sertifika veya kanıt fotoğrafı eklemek sunumunu diğerlerinin önüne taşır."
            />
            <Link
              href="/nasil-calisir"
              className="text-[12.5px] font-medium leading-snug"
            >
              Teklif ve pazarlık kuralları
            </Link>
            <KategoriAccordion
              soru="3 gün kargo kuralı nedir?"
              cevap="Teklifin kabul edilip ödeme güvenceye alındıktan sonra satıcının 72 saat (3 gün) içinde ürünü kargoya verip takip numarasını girmesi gerekir. Süre aşılırsa satış otomatik iptal olur ve alıcının ödemesi eksiksiz iade edilir."
            />
          </div>
        </div>

        {/* Ödeme & Komisyon */}
        <div className="rounded-card border border-border bg-card p-5">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-accent-soft text-[15px] font-extrabold text-accent-ink">
            %
          </div>
          <div className="mt-3 text-[15px] font-extrabold text-ink-900">
            Ödeme &amp; Komisyon
          </div>
          <div className="mt-2.5 flex flex-col gap-2">
            <Link
              href="/nasil-calisir#komisyon"
              className="text-[12.5px] font-medium leading-snug"
            >
              %7 komisyon modeli
            </Link>
            <KategoriAccordion
              soru="Ödemem ne zaman aktarılır?"
              cevap="Ödeme, alıcı ürünü teslim alıp onaylayana kadar BulBana güvencesinde tutulur. Alıcı teslimatı onayladığı anda anlaşılan tutardan %7 komisyon düşülür ve kalan tutar satıcı cüzdanına aktarılır."
            />
            <Link
              href="/itiraz"
              className="text-[12.5px] font-medium leading-snug"
            >
              İtiraz ve iade süreci
            </Link>
          </div>
        </div>
      </div>

      {/* ── Popüler konular ── */}
      <div className="mx-auto mt-10 max-w-[760px]">
        <h2 className="mb-3.5 text-xl font-extrabold text-ink-900">
          Popüler konular
        </h2>
        {sonuc.length > 0 ? (
          <div className="flex flex-col gap-2">
            {sonuc.map((m) => {
              const kategoriRozet = (
                <span className="flex-none text-[11px] font-semibold text-ink-300">
                  {m.kategori}
                </span>
              );

              if (!m.cevap) {
                return (
                  <Link
                    key={m.baslik}
                    href={m.href ?? "/yardim"}
                    className="flex items-center gap-3 rounded-control border border-border bg-card px-4 py-3.5 hover:border-primary"
                  >
                    <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-lg bg-page text-xs font-bold text-ink-400">
                      ?
                    </span>
                    <span className="flex-1 text-[13.5px] font-semibold leading-snug text-ink-900">
                      {m.baslik}
                    </span>
                    {kategoriRozet}
                  </Link>
                );
              }

              const acik = acikBaslik === m.baslik;
              return (
                <div
                  key={m.baslik}
                  className={`rounded-control bg-card ${
                    acik
                      ? "border-[1.5px] border-primary"
                      : "border border-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setAcikBaslik(acik ? null : m.baslik)
                    }
                    aria-expanded={acik}
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left hover:opacity-80"
                  >
                    <span
                      className={`flex h-[26px] w-[26px] flex-none items-center justify-center rounded-lg text-sm font-bold ${
                        acik
                          ? "bg-primary-soft text-primary-hover"
                          : "bg-page text-ink-400"
                      }`}
                    >
                      {acik ? "−" : "+"}
                    </span>
                    <span
                      className={`flex-1 text-[13.5px] font-semibold leading-snug ${
                        acik ? "text-primary-hover" : "text-ink-900"
                      }`}
                    >
                      {m.baslik}
                    </span>
                    {kategoriRozet}
                  </button>
                  {acik && (
                    <p className="px-4 pb-3.5 pl-[54px] text-[12.5px] font-medium leading-relaxed text-ink-400">
                      {m.cevap}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-control border border-border bg-card p-6 text-center text-[13px] font-semibold text-ink-400">
            Aramana uyan konu bulunamadı — aşağıdan destek talebi
            oluşturabilirsin.
          </div>
        )}
      </div>

      {/* ── İletişim ── */}
      <div className="mx-auto mt-7 flex max-w-[760px] flex-wrap items-center gap-[18px] rounded-panel bg-ink-900 p-[26px] text-white">
        <div className="min-w-[260px] flex-1">
          <div className="text-[17px] font-extrabold leading-snug">
            Aradığını bulamadın mı?
          </div>
          <div className="mt-1.5 text-[12.5px] font-medium leading-relaxed text-[#cfc5e8]">
            Destek ekibi hafta içi 09.00–18.00 arasında ortalama 2 saatte
            yanıtlar. destek@bulbana.com
          </div>
        </div>
        <Link
          href="/destek"
          className="flex-none rounded-control bg-accent px-[22px] py-[15px] text-sm font-extrabold text-ink-900 hover:bg-accent-hover"
        >
          Destek Talebi Oluştur
        </Link>
      </div>
    </main>
  );
}
