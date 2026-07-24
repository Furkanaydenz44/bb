"use client";

import { useState } from "react";
import Link from "next/link";

const inputCls =
  "w-full box-border rounded-control border-[1.5px] border-border-input px-3.5 py-3 text-[13.5px] font-semibold text-ink-900 outline-none focus:border-primary";

type BelgeTipi = "kimlik" | "pasaport" | "ehliyet";

const belgeler: { id: BelgeTipi; ad: string; alt: string }[] = [
  { id: "kimlik", ad: "T.C. Kimlik Kartı", alt: "Çipli yeni kimlik" },
  { id: "pasaport", ad: "Pasaport", alt: "Fotoğraflı sayfa" },
  { id: "ehliyet", ad: "Ehliyet", alt: "Yeni tip sürücü belgesi" },
];

const noLabel: Record<BelgeTipi, string> = {
  kimlik: "T.C. Kimlik No",
  pasaport: "Pasaport No",
  ehliyet: "Ehliyet No",
};

function StepHead({
  baslik,
  altbilgi,
}: {
  baslik: string;
  altbilgi: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px] bg-primary-soft text-[15px] font-extrabold text-primary-hover">
        ✓
      </span>
      <div>
        <h1 className="text-[20px] font-extrabold leading-tight text-ink-900">
          {baslik}
        </h1>
        <div className="mt-0.5 text-[12px] font-medium text-ink-400">
          {altbilgi}
        </div>
      </div>
    </div>
  );
}

export default function KimlikDogrulamaPage() {
  const [adim, setAdim] = useState(1);
  const [tip, setTip] = useState<BelgeTipi>("kimlik");
  const [ad, setAd] = useState("");
  const [no, setNo] = useState("");
  const [dogum, setDogum] = useState("");
  const [on, setOn] = useState(false);
  const [arka, setArka] = useState(false);
  const [selfie, setSelfie] = useState(false);

  const arkaGerekli = tip !== "pasaport";
  const noOk = tip === "kimlik" ? no.length === 11 : no.trim().length >= 5;
  const r1ok = ad.trim().length >= 5 && noOk && dogum.length === 4;
  const r2ok = on && (!arkaGerekli || arka);
  const r3ok = selfie;

  const bar = (n: number) =>
    adim > n ? "bg-primary" : adim === n ? "bg-accent" : "bg-border-input";

  const primaryBtn =
    "cursor-pointer rounded-control bg-primary px-6 py-[15px] text-[14px] font-extrabold text-white hover:bg-primary-hover";
  const disabledBtn =
    "cursor-not-allowed rounded-control bg-[#efebf5] px-6 py-[15px] text-[14px] font-extrabold text-ink-300";
  const geriBtn =
    "cursor-pointer bg-transparent py-1.5 text-[12.5px] font-semibold text-ink-400 hover:text-ink-900";

  function onNo(v: string) {
    if (tip === "kimlik") setNo(v.replace(/\D/g, "").slice(0, 11));
    else setNo(v.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 12));
  }

  const dropBase = "flex items-center justify-center text-center";
  const dropEmpty =
    "cursor-pointer rounded-[14px] border-[1.5px] border-dashed border-border-input bg-subtle text-[13px] font-semibold leading-snug text-ink-400 hover:border-primary hover:text-primary";
  const dropFull =
    "ref-image cursor-pointer rounded-[14px] text-[13px] font-bold text-primary-hover";

  return (
    <main className="mx-auto flex w-full max-w-[520px] flex-col items-center px-6 py-12">
      <Link
        href="/"
        className="mb-6 flex items-center gap-2.5 no-underline"
      >
        <span className="flex h-[42px] w-10 items-center justify-center rounded-[10px] bg-primary text-[20px] font-extrabold text-white">
          b
        </span>
        <span>
          <span className="block text-2xl font-extrabold leading-none tracking-[-0.5px] text-ink-900">
            bul<span className="text-primary">bana</span>
          </span>
          <span className="mt-[3px] block text-[9.5px] font-semibold tracking-[0.8px] text-ink-400">
            SEN İSTE, SATICI BULSUN
          </span>
        </span>
      </Link>

      <div className="w-full rounded-panel border border-border bg-card p-7">
        {/* ADIM 1: BELGE TİPİ + BİLGİLER */}
        {adim === 1 && (
          <div>
            <StepHead
              baslik="Kimlik doğrulama"
              altbilgi="Adım 1/3 · Belge tipi ve bilgilerin"
            />
            <p className="my-4 rounded-[10px] bg-page px-3 py-2.5 text-[12.5px] font-medium leading-relaxed text-ink-400">
              Doğrulanmış hesaplar profilde{" "}
              <strong className="text-primary-hover">
                ✓ Kimlik doğrulandı
              </strong>{" "}
              rozeti taşır; sunumları ve talepleri daha çok güven görür.
              Bilgilerin KVKK kapsamında yalnızca doğrulama için kullanılır.
            </p>

            <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[1.2px] text-ink-400">
              Belge tipi
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {belgeler.map((b) => {
                const active = tip === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setTip(b.id)}
                    className={`cursor-pointer rounded-[14px] border-2 p-3 text-left ${
                      active
                        ? "border-primary bg-primary-soft"
                        : "border-border bg-card hover:border-primary"
                    }`}
                  >
                    <span
                      className={`block text-[13px] font-extrabold leading-tight ${
                        active ? "text-primary-hover" : "text-ink-900"
                      }`}
                    >
                      {b.ad}
                      {active ? " ✓" : ""}
                    </span>
                    <span className="mt-1 block text-[11px] font-medium text-ink-400">
                      {b.alt}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4">
              <label className="mb-[7px] block text-[12.5px] font-bold text-ink-900">
                Ad Soyad <span className="text-danger">*</span>
              </label>
              <input
                value={ad}
                onChange={(e) => setAd(e.target.value.slice(0, 50))}
                placeholder="Belgendeki haliyle"
                className={inputCls}
              />
            </div>
            <div className="mt-3.5">
              <label className="mb-[7px] block text-[12.5px] font-bold text-ink-900">
                {noLabel[tip]} <span className="text-danger">*</span>
              </label>
              <input
                value={no}
                onChange={(e) => onNo(e.target.value)}
                inputMode={tip === "kimlik" ? "numeric" : "text"}
                placeholder={tip === "kimlik" ? "11 haneli" : "Belge numarası"}
                className={inputCls}
              />
            </div>
            <div className="mt-3.5">
              <label className="mb-[7px] block text-[12.5px] font-bold text-ink-900">
                Doğum yılı <span className="text-danger">*</span>
              </label>
              <input
                value={dogum}
                onChange={(e) =>
                  setDogum(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                inputMode="numeric"
                placeholder="örn. 1994"
                className={`${inputCls} max-w-[140px]`}
              />
            </div>

            <div className="mt-5 flex items-center justify-between">
              <Link
                href="/ayarlar"
                className="text-[12.5px] font-semibold text-ink-300 hover:text-ink-500"
              >
                Vazgeç
              </Link>
              <button
                type="button"
                disabled={!r1ok}
                onClick={() => r1ok && setAdim(2)}
                className={r1ok ? primaryBtn : disabledBtn}
              >
                Devam Et
              </button>
            </div>
          </div>
        )}

        {/* ADIM 2: BELGE YÜKLEME */}
        {adim === 2 && (
          <div>
            <StepHead
              baslik="Belge fotoğrafı"
              altbilgi={`Adım 2/3 · ${belgeler.find((b) => b.id === tip)?.ad}`}
            />
            <p className="my-4 text-[12.5px] font-medium leading-relaxed text-ink-400">
              Fotoğraflar net ve yansımasız olsun; dört köşe de görünmeli.{" "}
              <span className="text-ink-300">
                (Önizleme: kutulara tıklayarak yüklenmiş sayabilirsin.)
              </span>
            </p>
            <div
              className={`grid gap-3 ${
                arkaGerekli ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              <button
                type="button"
                onClick={() => setOn((v) => !v)}
                style={{ aspectRatio: "1.586" }}
                className={`${dropBase} ${on ? dropFull : dropEmpty}`}
              >
                {on ? "Ön yüz ✓" : "+ Ön yüz"}
              </button>
              {arkaGerekli && (
                <button
                  type="button"
                  onClick={() => setArka((v) => !v)}
                  style={{ aspectRatio: "1.586" }}
                  className={`${dropBase} ${arka ? dropFull : dropEmpty}`}
                >
                  {arka ? "Arka yüz ✓" : "+ Arka yüz"}
                </button>
              )}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setAdim(1)}
                className={geriBtn}
              >
                ‹ Geri
              </button>
              <button
                type="button"
                disabled={!r2ok}
                onClick={() => r2ok && setAdim(3)}
                className={r2ok ? primaryBtn : disabledBtn}
              >
                Devam Et
              </button>
            </div>
          </div>
        )}

        {/* ADIM 3: SELFIE */}
        {adim === 3 && (
          <div>
            <StepHead
              baslik="Yüz doğrulama"
              altbilgi="Adım 3/3 · Belgenle bir selfie"
            />
            <p className="my-4 text-[12.5px] font-medium leading-relaxed text-ink-400">
              Belgeni yüzünün yanında tut; ikisi de aynı karede net görünsün.
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setSelfie((v) => !v)}
                style={{ aspectRatio: "1" }}
                className={`w-[220px] rounded-full ${dropBase} ${
                  selfie
                    ? "ref-image cursor-pointer text-[13.5px] font-bold text-primary-hover"
                    : "cursor-pointer border-[1.5px] border-dashed border-border-input bg-subtle text-[13.5px] font-semibold leading-snug text-ink-400 hover:border-primary hover:text-primary"
                }`}
              >
                {selfie ? (
                  "Selfie alındı ✓"
                ) : (
                  <span>
                    📷 Kamerayı Aç
                    <br />
                    <span className="text-[11px] font-medium">
                      (önizlemede tıkla)
                    </span>
                  </span>
                )}
              </button>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setAdim(2)}
                className={geriBtn}
              >
                ‹ Geri
              </button>
              <button
                type="button"
                disabled={!r3ok}
                onClick={() => r3ok && setAdim(4)}
                className={r3ok ? primaryBtn : disabledBtn}
              >
                Doğrulamaya Gönder
              </button>
            </div>
          </div>
        )}

        {/* BİTİŞ: İNCELEMEDE */}
        {adim === 4 && (
          <div className="text-center">
            <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full bg-accent text-[22px] font-extrabold text-ink-900">
              ⏳
            </div>
            <h1 className="mt-4 text-[21px] font-extrabold leading-tight text-ink-900">
              Belgelerin incelemede
            </h1>
            <p className="mt-2.5 text-[13px] font-medium leading-relaxed text-ink-500">
              Doğrulama genellikle{" "}
              <strong className="text-ink-900">24 saat içinde</strong>{" "}
              tamamlanır; sonucu bildirim ve e-posta ile iletiriz.
              Onaylandığında profilinde{" "}
              <strong className="text-primary-hover">
                ✓ Kimlik doğrulandı
              </strong>{" "}
              rozeti görünür.
            </p>
            <div className="mt-[18px] rounded-control bg-page p-3.5 text-left">
              <div className="flex justify-between text-[12px] font-semibold leading-[1.6]">
                <span className="text-ink-400">Başvuru no</span>
                <span>#KYC-8841</span>
              </div>
              <div className="flex justify-between text-[12px] font-semibold leading-[1.6]">
                <span className="text-ink-400">Ad Soyad</span>
                <span>{ad}</span>
              </div>
              <div className="flex justify-between text-[12px] font-semibold leading-[1.6]">
                <span className="text-ink-400">Belge</span>
                <span>{belgeler.find((b) => b.id === tip)?.ad}</span>
              </div>
              <div className="flex justify-between text-[12px] font-semibold leading-[1.6]">
                <span className="text-ink-400">Durum</span>
                <span className="text-accent-ink">İnceleniyor</span>
              </div>
            </div>
            <Link
              href="/ayarlar"
              className="mt-5 inline-block rounded-control bg-primary px-[22px] py-3.5 text-[13.5px] font-bold text-white hover:bg-primary-hover"
            >
              Ayarlara Dön
            </Link>
          </div>
        )}
      </div>

      <div className="mt-[18px] flex gap-2">
        <span className={`h-[5px] w-[26px] rounded-full ${bar(1)}`} />
        <span className={`h-[5px] w-[26px] rounded-full ${bar(2)}`} />
        <span className={`h-[5px] w-[26px] rounded-full ${bar(3)}`} />
      </div>
      <span className="mt-4 max-w-[420px] text-center text-[11px] font-medium leading-relaxed text-ink-300">
        Belgelerin 256-bit SSL ile şifrelenir, doğrulama sonrası yasal saklama
        süresi dışında silinir.
      </span>
    </main>
  );
}
