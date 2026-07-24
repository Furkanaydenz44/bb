"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Adres = {
  id: number;
  ad: string;
  satir1: string;
  satir2: string;
  varsayilan: boolean;
};

type Kart = {
  id: number;
  marka: string;
  son4: string;
  skt: string;
  isim: string;
};

type Bolum = "profil" | "adres" | "odeme" | "bildirim" | "gizlilik" | "guvenlik";

const bolumTanim: { id: Bolum; ad: string }[] = [
  { id: "profil", ad: "Profil bilgileri" },
  { id: "adres", ad: "Adresler" },
  { id: "odeme", ad: "Ödeme yöntemleri" },
  { id: "bildirim", ad: "Bildirim tercihleri" },
  { id: "gizlilik", ad: "Gizlilik" },
  { id: "guvenlik", ad: "Güvenlik" },
];

const label = "mb-[7px] block text-[12.5px] font-bold text-ink-900";
const input =
  "box-border w-full rounded-control border-[1.5px] border-border-input bg-card px-3.5 py-[13px] text-[13.5px] font-semibold text-ink-900 outline-none focus:border-primary";
const inputSm =
  "box-border w-full rounded-[10px] border-[1.5px] border-border-input bg-card px-3 py-2.5 text-[13px] font-semibold text-ink-900 outline-none focus:border-primary";
const cardCls =
  "rounded-panel border border-border bg-card p-6 [animation:bbFadeUp_0.15s_ease]";
const h2Cls = "mb-[18px] text-[17px] font-extrabold text-ink-900";

function Toggle({
  acik,
  onClick,
  label,
  disabled = false,
}: {
  acik: boolean;
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={acik}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`relative h-[26px] w-11 flex-none rounded-full transition-colors ${
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      } ${acik ? "bg-primary" : "bg-border-input"}`}
    >
      <span
        className={`absolute top-[3px] block h-5 w-5 rounded-full bg-white transition-all ${
          acik ? "right-[3px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

export function AyarlarClient() {
  const [bolum, setBolum] = useState<Bolum>("profil");

  // ── Toast ──
  const [toast, setToast] = useState<{ on: boolean; msg: string }>({
    on: false,
    msg: "",
  });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function showToast(msg: string) {
    setToast({ on: true, msg });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, on: false })), 3200);
  }

  // ── Profil bilgileri (controlled) ──
  const [pAd, setPAd] = useState("Emre Kaya");
  const [pKullanici, setPKullanici] = useState("emre.k");
  const [pEmail, setPEmail] = useState("emre.k@eposta.com");
  const [pTelefon, setPTelefon] = useState("+90 5•• ••• 42 18");
  const [pBio, setPBio] = useState(
    "Koleksiyoncuyum; plak, CD ve retro elektronik ararım. Sunumları aynı gün incelerim.",
  );

  // ── Güvenlik — şifre ──
  const [pwMevcut, setPwMevcut] = useState("");
  const [pwYeni, setPwYeni] = useState("");
  const [pwYeni2, setPwYeni2] = useState("");
  const [pwWarn, setPwWarn] = useState("");

  function sifreGuncelle() {
    if (!pwMevcut || !pwYeni || !pwYeni2) {
      setPwWarn("Lütfen tüm şifre alanlarını doldur.");
      return;
    }
    if (pwYeni.length < 8) {
      setPwWarn("Yeni şifre en az 8 karakter olmalı.");
      return;
    }
    if (pwYeni !== pwYeni2) {
      setPwWarn("Yeni şifreler eşleşmiyor.");
      return;
    }
    setPwMevcut("");
    setPwYeni("");
    setPwYeni2("");
    setPwWarn("");
    showToast("Şifren güncellendi.");
  }

  // ── Adresler ──
  const [adresler, setAdresler] = useState<Adres[]>([
    {
      id: 1,
      ad: "Ev",
      satir1: "Caferağa Mah. Moda Cad. No: 18/4",
      satir2: "Kadıköy, İstanbul",
      varsayilan: true,
    },
    {
      id: 2,
      ad: "İş",
      satir1: "Esentepe Mah. Büyükdere Cad. No: 112 K: 6",
      satir2: "Şişli, İstanbul",
      varsayilan: false,
    },
  ]);
  const nextAdresId = useRef(3);
  const [duzenleId, setDuzenleId] = useState<number | null>(null);
  const [silId, setSilId] = useState<number | null>(null);
  const [eAd, setEAd] = useState("");
  const [eSatir1, setESatir1] = useState("");
  const [eSatir2, setESatir2] = useState("");
  const [yeniAdresOn, setYeniAdresOn] = useState(false);
  const [naAd, setNaAd] = useState("");
  const [naSatir1, setNaSatir1] = useState("");
  const [naSatir2, setNaSatir2] = useState("");

  function duzenleBasla(a: Adres) {
    setDuzenleId(a.id);
    setSilId(null);
    setEAd(a.ad);
    setESatir1(a.satir1);
    setESatir2(a.satir2);
  }
  function duzenleKaydet() {
    setAdresler((prev) =>
      prev.map((x) =>
        x.id === duzenleId
          ? {
              ...x,
              ad: eAd.trim() || x.ad,
              satir1: eSatir1.trim(),
              satir2: eSatir2.trim(),
            }
          : x,
      ),
    );
    setDuzenleId(null);
    showToast("Adres güncellendi.");
  }
  function varsayilanYap(id: number) {
    setAdresler((prev) => prev.map((x) => ({ ...x, varsayilan: x.id === id })));
  }
  function silOnayla(a: Adres) {
    setAdresler((prev) => {
      const kalan = prev.filter((x) => x.id !== a.id);
      if (a.varsayilan && kalan.length && !kalan.some((x) => x.varsayilan)) {
        kalan[0] = { ...kalan[0], varsayilan: true };
      }
      return kalan;
    });
    setSilId(null);
    showToast("Adres silindi.");
  }
  function yeniAdresAc() {
    setYeniAdresOn(true);
    setNaAd("");
    setNaSatir1("");
    setNaSatir2("");
    setSilId(null);
    setDuzenleId(null);
  }
  function yeniAdresEkle() {
    if (!naAd.trim() || !naSatir1.trim()) {
      showToast("Adres başlığı ve adres satırı gerekli.");
      return;
    }
    setAdresler((prev) => [
      ...prev,
      {
        id: nextAdresId.current++,
        ad: naAd.trim(),
        satir1: naSatir1.trim(),
        satir2: naSatir2.trim(),
        varsayilan: prev.length === 0,
      },
    ]);
    setYeniAdresOn(false);
    showToast("Adres eklendi.");
  }

  // ── Kartlar ──
  const [kartlar, setKartlar] = useState<Kart[]>([
    { id: 1, marka: "VISA", son4: "4821", skt: "12/27", isim: "Emre Kaya" },
  ]);
  const nextKartId = useRef(2);
  const [kartSilId, setKartSilId] = useState<number | null>(null);
  const [yeniKartOn, setYeniKartOn] = useState(false);
  const [nkNumara, setNkNumara] = useState("");
  const [nkSkt, setNkSkt] = useState("");
  const [nkIsim, setNkIsim] = useState("");

  function yeniKartAc() {
    setYeniKartOn(true);
    setNkNumara("");
    setNkSkt("");
    setNkIsim("");
    setKartSilId(null);
  }
  function yeniKartEkle() {
    if (nkNumara.length < 4 || !nkIsim.trim()) {
      showToast("Kart numarası ve kart sahibi gerekli.");
      return;
    }
    const marka = nkNumara.startsWith("4")
      ? "VISA"
      : nkNumara.startsWith("5")
        ? "MC"
        : "KART";
    setKartlar((prev) => [
      ...prev,
      {
        id: nextKartId.current++,
        marka,
        son4: nkNumara.slice(-4),
        skt: nkSkt.trim() || "--/--",
        isim: nkIsim.trim(),
      },
    ]);
    setYeniKartOn(false);
    showToast("Kart eklendi.");
  }
  function kartKaldir(id: number) {
    setKartlar((prev) => prev.filter((x) => x.id !== id));
    setKartSilId(null);
    showToast("Kart kaldırıldı.");
  }

  // ── Bildirim tercihleri ──
  const [tercih, setTercih] = useState<Record<string, boolean>>({
    sunum: true,
    teklif: true,
    mesaj: true,
    kargo: true,
    kampanya: false,
  });
  const tercihTanim = [
    { k: "sunum", ad: "Yeni sunum", sub: "Taleplerine sunum geldiğinde haber ver" },
    {
      k: "teklif",
      ad: "Teklif isteği ve yanıtları",
      sub: "Teklif istendiğinde ve fiyat verildiğinde",
      kilitli: true,
    },
    { k: "mesaj", ad: "Mesajlar", sub: "Sohbetlere gelen yeni mesajlar" },
    {
      k: "kargo",
      ad: "Kargo güncellemeleri",
      sub: "Kargoya verildi, dağıtımda, teslim edildi",
      kilitli: true,
    },
    {
      k: "kampanya",
      ad: "Kampanya e-postaları",
      sub: "Yeni özellikler ve duyurular",
    },
  ];

  // ── Gizlilik ──
  const [gizlilik, setGizlilik] = useState<Record<string, boolean>>({
    kisisel: true,
    analitik: true,
    gorunur: true,
  });
  const gizlilikTanim = [
    {
      k: "kisisel",
      ad: "Kişiselleştirilmiş öneriler",
      sub: "Göz atma geçmişini kullanarak sana talep ve sunum öner",
    },
    {
      k: "analitik",
      ad: "Analitik çerezleri",
      sub: "Kullanım verisiyle deneyimi iyileştirmemize izin ver",
    },
    {
      k: "gorunur",
      ad: "Profil görünürlüğü",
      sub: "Değerlendirmelerin ve rozetlerin diğer kullanıcılara görünsün",
    },
  ];

  // ── Güvenlik: iki adım + hesap kapatma ──
  const [ikiAdim, setIkiAdim] = useState(true);
  const [kapatmaAdim, setKapatmaAdim] = useState<0 | 1 | 2>(0);

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-14 pt-8">
      <style>{`@keyframes bbFadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <h1 className="mb-[22px] text-[28px] font-extrabold tracking-[-0.7px] text-ink-900">
        Hesap Ayarları
      </h1>

      <div className="grid items-start gap-6 md:grid-cols-[260px_minmax(0,1fr)]">
        {/* ── Sol menü ── */}
        <aside className="flex flex-col gap-1 rounded-card border border-border bg-card p-2.5 md:sticky md:top-[150px]">
          {bolumTanim.map((b) => {
            const active = bolum === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setBolum(b.id)}
                className={`cursor-pointer rounded-[10px] px-3.5 py-3 text-left text-[13px] transition-colors ${
                  active
                    ? "bg-primary-soft font-bold text-primary-hover"
                    : "font-semibold text-ink-500 hover:bg-page"
                }`}
              >
                {b.ad}
              </button>
            );
          })}
        </aside>

        <div className="min-w-0">
          {/* ── Profil bilgileri ── */}
          {bolum === "profil" && (
            <section className={cardCls}>
              <h2 className={h2Cls}>Profil bilgileri</h2>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="p-ad">
                    Ad Soyad
                  </label>
                  <input
                    id="p-ad"
                    value={pAd}
                    onChange={(e) => setPAd(e.target.value.slice(0, 60))}
                    className={input}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="p-kullanici">
                    Kullanıcı adı
                  </label>
                  <input
                    id="p-kullanici"
                    value={pKullanici}
                    onChange={(e) => setPKullanici(e.target.value.slice(0, 30))}
                    className={input}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="p-email">
                    E-posta
                  </label>
                  <input
                    id="p-email"
                    type="email"
                    autoComplete="email"
                    value={pEmail}
                    onChange={(e) => setPEmail(e.target.value.slice(0, 60))}
                    className={input}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="p-tel">
                    Telefon
                  </label>
                  <input
                    id="p-tel"
                    type="tel"
                    autoComplete="tel"
                    value={pTelefon}
                    onChange={(e) => setPTelefon(e.target.value.slice(0, 25))}
                    className={input}
                  />
                </div>
              </div>
              <div className="mt-3.5">
                <label className={label} htmlFor="p-bio">
                  Hakkında
                </label>
                <textarea
                  id="p-bio"
                  rows={2}
                  value={pBio}
                  onChange={(e) => setPBio(e.target.value.slice(0, 240))}
                  className={`${input} resize-y font-medium`}
                />
              </div>
              <Button className="mt-4" onClick={() => showToast("Değişiklikler kaydedildi.")}>
                Kaydet
              </Button>
            </section>
          )}

          {/* ── Adresler ── */}
          {bolum === "adres" && (
            <section className={cardCls}>
              <h2 className={h2Cls}>Adresler</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {adresler.map((a) => (
                  <div
                    key={a.id}
                    className={`rounded-[14px] p-4 ${
                      a.varsayilan
                        ? "border-[1.5px] border-primary bg-[#f8f6fc]"
                        : "border border-border bg-card"
                    }`}
                  >
                    {duzenleId === a.id ? (
                      <div className="flex flex-col gap-2">
                        <input
                          value={eAd}
                          onChange={(e) => setEAd(e.target.value.slice(0, 24))}
                          placeholder="Başlık (Ev, İş…)"
                          className={`${inputSm} font-bold`}
                        />
                        <input
                          value={eSatir1}
                          onChange={(e) => setESatir1(e.target.value.slice(0, 80))}
                          placeholder="Adres satırı 1"
                          className={inputSm}
                        />
                        <input
                          value={eSatir2}
                          onChange={(e) => setESatir2(e.target.value.slice(0, 60))}
                          placeholder="İlçe, İl"
                          className={inputSm}
                        />
                        <div className="mt-0.5 flex gap-2">
                          <Button size="sm" onClick={duzenleKaydet}>
                            Kaydet
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setDuzenleId(null)}
                          >
                            Vazgeç
                          </Button>
                        </div>
                      </div>
                    ) : silId === a.id ? (
                      <div>
                        <div className="text-[13px] font-bold text-ink-900">
                          {a.ad}
                        </div>
                        <p className="mb-2.5 mt-1.5 text-[12.5px] font-semibold text-danger">
                          Bu adresi silmek istediğine emin misin?
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => silOnayla(a)}
                          >
                            Evet, sil
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setSilId(null)}
                          >
                            Vazgeç
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex min-h-[22px] items-center justify-between">
                          <span className="text-sm font-bold text-ink-900">
                            {a.ad}
                          </span>
                          {a.varsayilan && (
                            <span className="rounded-full bg-primary-soft px-2 py-[5px] text-[10.5px] font-bold text-primary-hover">
                              Varsayılan
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-[12.5px] font-medium leading-[1.55] text-ink-500">
                          {a.satir1}
                          <br />
                          {a.satir2}
                        </p>
                        <div className="mt-2.5 flex gap-3.5">
                          <button
                            type="button"
                            onClick={() => duzenleBasla(a)}
                            className="cursor-pointer text-xs font-semibold text-primary hover:text-primary-hover"
                          >
                            Düzenle
                          </button>
                          {!a.varsayilan && (
                            <button
                              type="button"
                              onClick={() => varsayilanYap(a.id)}
                              className="cursor-pointer text-xs font-semibold text-primary hover:text-primary-hover"
                            >
                              Varsayılan yap
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setSilId(a.id);
                              setDuzenleId(null);
                            }}
                            className="cursor-pointer text-xs font-semibold text-danger"
                          >
                            Sil
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {yeniAdresOn ? (
                <div className="mt-3 flex flex-col gap-2 rounded-[14px] border-[1.5px] border-border p-4">
                  <div className="mb-0.5 text-[13px] font-bold text-ink-900">
                    Yeni adres
                  </div>
                  <input
                    value={naAd}
                    onChange={(e) => setNaAd(e.target.value.slice(0, 24))}
                    placeholder="Başlık (Ev, İş…)"
                    className={`${inputSm} font-bold`}
                  />
                  <input
                    value={naSatir1}
                    onChange={(e) => setNaSatir1(e.target.value.slice(0, 80))}
                    placeholder="Adres satırı (mahalle, cadde, no)"
                    className={inputSm}
                  />
                  <input
                    value={naSatir2}
                    onChange={(e) => setNaSatir2(e.target.value.slice(0, 60))}
                    placeholder="İlçe, İl"
                    className={inputSm}
                  />
                  <div className="mt-0.5 flex gap-2">
                    <Button size="sm" onClick={yeniAdresEkle}>
                      Adresi ekle
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setYeniAdresOn(false)}
                    >
                      Vazgeç
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={yeniAdresAc}
                  className="mt-3 w-full cursor-pointer rounded-[14px] border-[1.5px] border-dashed border-[#cdc2e0] bg-subtle p-4 text-[13px] font-bold text-ink-400 transition-colors hover:border-primary hover:text-primary"
                >
                  + Yeni adres ekle
                </button>
              )}
            </section>
          )}

          {/* ── Ödeme yöntemleri ── */}
          {bolum === "odeme" && (
            <section className={cardCls}>
              <h2 className={h2Cls}>Ödeme yöntemleri</h2>
              <div className="flex flex-col gap-2.5">
                {kartlar.map((k) => (
                  <div
                    key={k.id}
                    className="flex items-center gap-3.5 rounded-[14px] border border-border p-4"
                  >
                    <div className="flex h-8 w-[46px] flex-none items-center justify-center rounded-md bg-ink-900 text-[10px] font-extrabold text-white">
                      {k.marka}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] font-bold text-ink-900">
                        •••• •••• •••• {k.son4}
                      </div>
                      <div className="mt-[3px] text-[11.5px] font-medium text-ink-400">
                        Son kullanma: {k.skt} · {k.isim}
                      </div>
                    </div>
                    {kartSilId === k.id ? (
                      <div className="flex flex-none flex-wrap items-center justify-end gap-2">
                        <span className="text-[11.5px] font-semibold text-danger">
                          Emin misin?
                        </span>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => kartKaldir(k.id)}
                        >
                          Evet
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setKartSilId(null)}
                        >
                          Vazgeç
                        </Button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setKartSilId(k.id)}
                        className="flex-none cursor-pointer text-xs font-semibold text-danger"
                      >
                        Kaldır
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {yeniKartOn ? (
                <div className="mt-3 flex flex-col gap-2 rounded-[14px] border-[1.5px] border-border p-4">
                  <div className="mb-0.5 text-[13px] font-bold text-ink-900">
                    Yeni kart
                  </div>
                  <input
                    value={nkNumara}
                    onChange={(e) =>
                      setNkNumara(e.target.value.replace(/[^0-9]/g, "").slice(0, 16))
                    }
                    placeholder="Kart numarası"
                    inputMode="numeric"
                    className={`${inputSm} tracking-[1px]`}
                  />
                  <div className="flex gap-2">
                    <input
                      value={nkSkt}
                      onChange={(e) => setNkSkt(e.target.value.slice(0, 5))}
                      placeholder="AA/YY"
                      className={`${inputSm} w-24 flex-none`}
                    />
                    <input
                      value={nkIsim}
                      onChange={(e) => setNkIsim(e.target.value.slice(0, 40))}
                      placeholder="Kart üzerindeki isim"
                      className={`${inputSm} min-w-0 flex-1`}
                    />
                  </div>
                  <div className="mt-0.5 flex gap-2">
                    <Button size="sm" onClick={yeniKartEkle}>
                      Kartı ekle
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setYeniKartOn(false)}
                    >
                      Vazgeç
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={yeniKartAc}
                  className="mt-3 w-full cursor-pointer rounded-[14px] border-[1.5px] border-dashed border-[#cdc2e0] bg-subtle p-4 text-[13px] font-bold text-ink-400 transition-colors hover:border-primary hover:text-primary"
                >
                  + Yeni kart ekle
                </button>
              )}
              <p className="mt-3 text-[11.5px] font-medium leading-[1.5] text-ink-300">
                Kart bilgilerin 256-bit şifreyle ödeme kuruluşunda saklanır;
                BulBana sistemlerinde tutulmaz. Satış gelirlerin, alıcı onayı
                sonrası kayıtlı IBAN&apos;ına aktarılır.
              </p>
            </section>
          )}

          {/* ── Bildirim tercihleri ── */}
          {bolum === "bildirim" && (
            <section className={cardCls}>
              <h2 className="mb-1.5 text-[17px] font-extrabold text-ink-900">
                Bildirim tercihleri
              </h2>
              <p className="mb-3.5 text-[12.5px] font-medium leading-[1.5] text-ink-400">
                Kritik işlem bildirimleri (teklif, kargo) güvenlik gereği açık
                kalır ve kapatılamaz.
              </p>
              <div className="flex flex-col">
                {tercihTanim.map((t) => (
                  <div
                    key={t.k}
                    className="flex items-center gap-3 border-t border-hairline py-3"
                  >
                    <div className="flex-1">
                      <div className="text-[13.5px] font-bold text-ink-900">
                        {t.ad}
                        {t.kilitli && (
                          <span className="ml-1.5 text-[10.5px] font-semibold text-ink-300">
                            🔒 zorunlu
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-[11.5px] font-medium text-ink-300">
                        {t.sub}
                      </div>
                    </div>
                    <Toggle
                      acik={t.kilitli ? true : tercih[t.k]}
                      label={t.ad}
                      disabled={t.kilitli}
                      onClick={() =>
                        setTercih((prev) => ({ ...prev, [t.k]: !prev[t.k] }))
                      }
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Gizlilik ── */}
          {bolum === "gizlilik" && (
            <section className={cardCls}>
              <h2 className="mb-1.5 text-[17px] font-extrabold text-ink-900">
                Gizlilik
              </h2>
              <p className="mb-3.5 text-[12.5px] font-medium leading-[1.5] text-ink-400">
                Zorunlu çerezler oturumun için gereklidir ve kapatılamaz. Diğer
                tercihleri dilediğin gibi ayarlayabilirsin.
              </p>
              <div className="flex flex-col">
                {gizlilikTanim.map((g) => (
                  <div
                    key={g.k}
                    className="flex items-center gap-3 border-t border-hairline py-3"
                  >
                    <div className="flex-1">
                      <div className="text-[13.5px] font-bold text-ink-900">
                        {g.ad}
                      </div>
                      <div className="mt-0.5 text-[11.5px] font-medium text-ink-300">
                        {g.sub}
                      </div>
                    </div>
                    <Toggle
                      acik={gizlilik[g.k]}
                      onClick={() =>
                        setGizlilik((prev) => ({ ...prev, [g.k]: !prev[g.k] }))
                      }
                    />
                  </div>
                ))}
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={() => showToast("Gizlilik tercihleri kaydedildi.")}
              >
                Tercihleri kaydet
              </Button>
            </section>
          )}

          {/* ── Güvenlik ── */}
          {bolum === "guvenlik" && (
            <section className={cardCls}>
              <h2 className={h2Cls}>Güvenlik</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <input
                  type="password"
                  value={pwMevcut}
                  onChange={(e) => setPwMevcut(e.target.value.slice(0, 40))}
                  placeholder="Mevcut şifre"
                  className={input}
                />
                <input
                  type="password"
                  value={pwYeni}
                  onChange={(e) => setPwYeni(e.target.value.slice(0, 40))}
                  placeholder="Yeni şifre"
                  className={input}
                />
                <input
                  type="password"
                  value={pwYeni2}
                  onChange={(e) => setPwYeni2(e.target.value.slice(0, 40))}
                  placeholder="Yeni şifre (tekrar)"
                  className={input}
                />
              </div>
              {pwWarn && (
                <p className="mt-2.5 text-xs font-semibold text-danger">{pwWarn}</p>
              )}
              <Button size="sm" className="mt-3.5" onClick={sifreGuncelle}>
                Şifreyi Güncelle
              </Button>

              {/* Kimlik doğrulama */}
              <div className="mt-[22px] flex flex-wrap items-center gap-3 border-t border-hairline pt-[18px]">
                <div className="min-w-[220px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[13.5px] font-bold text-ink-900">
                      Kimlik doğrulama
                    </span>
                    <span className="whitespace-nowrap rounded-full bg-primary-soft px-2 py-[5px] text-[10px] font-bold text-primary-hover">
                      ✓ Doğrulandı
                    </span>
                  </div>
                  <div className="mt-0.5 text-[11.5px] font-medium text-ink-300">
                    Profilindeki rozet; sunum ve taleplerin daha çok güven görür.
                  </div>
                </div>
                <Link
                  href="/kimlik-dogrulama"
                  className="flex-none rounded-[11px] border-[1.5px] border-border-input bg-card px-4 py-3 text-[12.5px] font-bold text-ink-900 transition-colors hover:border-primary hover:text-primary"
                >
                  Akışı Gör
                </Link>
              </div>

              {/* İki adımlı doğrulama */}
              <div className="mt-[22px] flex items-center gap-3 border-t border-hairline pt-[18px]">
                <div className="flex-1">
                  <div className="text-[13.5px] font-bold text-ink-900">
                    İki adımlı doğrulama
                  </div>
                  <div className="mt-0.5 text-[11.5px] font-medium text-ink-300">
                    Girişlerde SMS koduyla ek doğrulama iste.
                  </div>
                </div>
                <Toggle acik={ikiAdim} onClick={() => setIkiAdim((v) => !v)} />
              </div>

              {/* Hesabı kapat */}
              <div className="mt-[22px] flex flex-wrap items-center gap-3 rounded-[14px] border border-danger-line bg-danger-soft p-4">
                <div className="min-w-[220px] flex-1">
                  <div className="text-[13.5px] font-bold text-danger">
                    Hesabı kapat
                  </div>
                  {kapatmaAdim === 2 ? (
                    <div className="mt-0.5 text-[11.5px] font-medium leading-[1.5] text-[#9a6763]">
                      Talebin oluşturuldu, 24 saat içinde dönüş yapılacak.
                    </div>
                  ) : kapatmaAdim === 1 ? (
                    <div className="mt-0.5 text-[11.5px] font-semibold leading-[1.5] text-danger">
                      Kapatma talebi oluşturulacak; onaylanırsa hesabın kalıcı
                      olarak kapanır. Devam etmek istediğine emin misin?
                    </div>
                  ) : (
                    <div className="mt-0.5 text-[11.5px] font-medium leading-[1.5] text-[#9a6763]">
                      Açık talebin, bekleyen teklifin ya da tamamlanmamış siparişin
                      varken hesap kapatılamaz.
                    </div>
                  )}
                </div>
                {kapatmaAdim === 0 && (
                  <button
                    type="button"
                    onClick={() => setKapatmaAdim(1)}
                    className="flex-none cursor-pointer rounded-[11px] border-[1.5px] border-danger-line bg-card px-4 py-3 text-[12.5px] font-bold text-danger transition-colors hover:bg-danger-soft"
                  >
                    Kapatma talebi oluştur
                  </button>
                )}
                {kapatmaAdim === 1 && (
                  <div className="flex flex-none gap-2">
                    <button
                      type="button"
                      onClick={() => setKapatmaAdim(2)}
                      className="cursor-pointer rounded-[11px] bg-danger px-4 py-3 text-[12.5px] font-extrabold text-white transition-colors hover:bg-[#8f3733]"
                    >
                      Evet, oluştur
                    </button>
                    <button
                      type="button"
                      onClick={() => setKapatmaAdim(0)}
                      className="cursor-pointer rounded-[11px] border-[1.5px] border-border-input bg-card px-4 py-3 text-[12.5px] font-bold text-ink-500 transition-colors hover:border-primary hover:text-primary"
                    >
                      Vazgeç
                    </button>
                  </div>
                )}
                {kapatmaAdim === 2 && (
                  <span className="flex-none rounded-full bg-primary-soft px-3 py-2 text-[11px] font-bold text-primary-hover">
                    Talep alındı ✓
                  </span>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* ── Toast ── */}
      {toast.on && (
        <div className="fixed bottom-7 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-ink-900 px-5 py-3.5 text-[13.5px] font-semibold text-white shadow-[0_8px_24px_rgba(46,26,71,0.28)] [animation:bbFadeUp_0.25s_ease]">
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-[10px] font-extrabold text-ink-900">
            ✓
          </span>
          {toast.msg}
        </div>
      )}
    </main>
  );
}
