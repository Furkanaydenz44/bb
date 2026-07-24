import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "BulBana ticaretin yönünü tersine çeviren bir pazar yeridir: ilanı alıcı açar, fiyatı alıcı belirler; satıcılar ürünleriyle talebe gelir.",
};

const ilkeler = [
  {
    n: "1",
    baslik: "Önce güven",
    metin:
      "Ödeme, alıcı ürünü onaylayana kadar bizde durur. İtiraz hakkı, kanıtlı sunum ve sohbet kaydı — anlaşmazlıkta hakem biziz.",
  },
  {
    n: "2",
    baslik: "Şeffaf tek gelir",
    metin:
      "Üyelik, ilan, sunum, teklif: hepsi ücretsiz. Tek gelirimiz, gerçekleşen satıştaki %7 komisyon — biz ancak taraflar kazanınca kazanırız.",
  },
  {
    n: "3",
    baslik: "Talep odaklı ticaret",
    metin:
      "Satıcı dükkanda beklemesin, reklama para yakmasın. Talep zaten ortada; işi doğru ürünü doğru talebe getirmek olsun.",
  },
];

const metrikler = [
  { deger: "2025", etiket: "Kuruluş, İstanbul" },
  { deger: "%7", etiket: "Tek ve şeffaf komisyon" },
  { deger: "3 gün", etiket: "Kargo taahhüdü" },
  { deger: "48 saat", etiket: "İtiraz inceleme süresi" },
];

const ekip = [
  { ad: "Deniz Arslan", rol: "Kurucu · CEO", bas: "DA" },
  { ad: "Zeynep Koç", rol: "Ürün & Tasarım", bas: "ZK" },
  { ad: "Mert Öztürk", rol: "Mühendislik", bas: "MÖ" },
  { ad: "Elif Demir", rol: "Güven & Operasyon", bas: "ED" },
];

export default function HakkimizdaPage() {
  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-6 pt-13">
      {/* Vizyon / hero */}
      <div className="max-w-[680px]">
        <span className="inline-block rounded-lg bg-accent px-3 py-2 text-[11px] font-extrabold uppercase tracking-[1.6px] text-ink-900">
          Kurumsal
        </span>
        <h1 className="mt-4 text-pretty text-[40px] font-extrabold leading-[1.15] tracking-[-1.3px] text-ink-900">
          Aramayı bırakın.
          <br />
          <span className="text-primary">Buldurun.</span>
        </h1>
        <p className="mt-[18px] text-pretty text-[15.5px] font-medium leading-[1.65] text-ink-700">
          BulBana, ticaretin yönünü tersine çeviren bir pazar yeridir.
          Bulunamayan, nadir, koleksiyonluk ya da stoku bitmiş ürünlerde asıl kıt
          olan şey ürün değil, taleptir — biz de ilanı alıcıya açtırırız. Alıcı ne
          istediğini ve ödeyeceği fiyatı söyler; elinde o ürün olan satıcı, gerçek
          bir müşterinin karşısına çıkar.
        </p>
        <p className="mt-3.5 text-pretty text-[15.5px] font-medium leading-[1.65] text-ink-700">
          Amacımız iki tarafın da vaktini boşa harcamamak: alıcı aramaya, satıcı
          reklam harcamasıyla müşteri kovalamaya son versin. Aradaki güveni;
          sunumların gizliliği, güvencede tutulan ödeme ve %7&apos;luk şeffaf tek
          komisyonla biz kurarız.
        </p>
      </div>

      {/* 3 ilke kartı */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {ilkeler.map((i) => (
          <div
            key={i.n}
            className="rounded-[16px] border border-border bg-card p-[22px]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[15px] font-extrabold text-ink-900">
              {i.n}
            </div>
            <div className="mt-3 text-base font-extrabold leading-[1.3] text-ink-900">
              {i.baslik}
            </div>
            <p className="mt-1.5 text-[13px] font-medium leading-[1.6] text-ink-500">
              {i.metin}
            </p>
          </div>
        ))}
      </div>

      {/* Alıntı + metrikler (koyu) */}
      <section className="mt-10 grid items-center gap-7 rounded-[20px] bg-ink-900 p-[30px] text-white md:grid-cols-2">
        <div>
          <h2 className="text-pretty text-[22px] font-extrabold leading-[1.25]">
            &quot;En zor müşteri, aradığını bulamayandır. Biz onu ilan sahibine
            dönüştürdük.&quot;
          </h2>
          <p className="mt-3 text-[13px] font-medium leading-[1.6] text-[#cfc5e8]">
            2025&apos;te İstanbul&apos;da kurulduk. Koleksiyon ürünlerinden yedek
            parçaya, stoku bitmiş her şeyin bir arayanı olduğunu biliyoruz — ve
            her arayanın bir bulanı.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {metrikler.map((m) => (
            <div key={m.etiket} className="rounded-[14px] bg-[#3a2a5c] p-4">
              <div className="text-[22px] font-extrabold leading-none text-accent">
                {m.deger}
              </div>
              <div className="mt-1.5 text-[11.5px] font-semibold leading-[1.4] text-[#cfc5e8]">
                {m.etiket}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ekip */}
      <section className="mt-10">
        <h2 className="mb-4 text-[22px] font-extrabold leading-[1.2] text-ink-900">
          Ekip
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ekip.map((k) => (
            <div
              key={k.ad}
              className="rounded-[16px] border border-border bg-card p-5 text-center"
            >
              <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary-soft text-[20px] font-extrabold text-primary-hover">
                {k.bas}
              </div>
              <div className="mt-3 text-[14.5px] font-bold leading-[1.2] text-ink-900">
                {k.ad}
              </div>
              <div className="mt-1 text-[12px] font-medium leading-[1.3] text-ink-400">
                {k.rol}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* İletişim */}
      <section className="mt-8 flex flex-wrap items-center gap-4 rounded-[18px] border border-border bg-card p-6">
        <div className="min-w-[260px] flex-1">
          <div className="text-base font-extrabold leading-[1.3] text-ink-900">
            Basın, iş birliği ve yatırım
          </div>
          <div className="mt-1 text-[12.5px] font-medium leading-[1.5] text-ink-400">
            kurumsal@bulbana.com · İstanbul, Türkiye
          </div>
        </div>
        <ButtonLink
          href="mailto:kurumsal@bulbana.com"
          variant="primary"
          size="md"
          className="flex-none"
        >
          Bize Ulaş
        </ButtonLink>
      </section>
    </main>
  );
}
