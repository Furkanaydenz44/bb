"use client";

import { useState } from "react";
import Link from "next/link";

const inputCls =
  "w-full box-border rounded-control border-[1.5px] border-border-input px-3.5 py-3 text-[13.5px] font-semibold text-ink-900 outline-none focus:border-primary";

function BrandLogo() {
  return (
    <Link
      href="/"
      className="mb-[26px] flex items-center gap-2.5 no-underline"
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
  );
}

export default function SifreSifirlamaPage() {
  const [adim, setAdim] = useState(1);
  const [email, setEmail] = useState("");
  const [kod, setKod] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [kodGonderildi, setKodGonderildi] = useState(false);

  const e1ok = email.includes("@") && email.includes(".") && email.length >= 6;
  const e2ok = kod.length === 6;
  const eslesir = p1.length >= 8 && p1 === p2;
  const uyusmuyor = p2.length >= 8 && p1 !== p2;

  const bar = (n: number) =>
    adim > n ? "bg-primary" : adim === n ? "bg-accent" : "bg-border-input";

  const primaryBtn =
    "w-full rounded-control py-[15px] text-[14.5px] font-extrabold cursor-pointer bg-primary text-white hover:bg-primary-hover";
  const disabledBtn =
    "w-full rounded-control py-[15px] text-[14.5px] font-extrabold text-center cursor-not-allowed bg-[#efebf5] text-ink-300";

  return (
    <main className="mx-auto flex w-full max-w-[480px] flex-col items-center px-6 py-12">
      <BrandLogo />

      <div className="w-full rounded-panel border border-border bg-card p-[26px]">
        {adim === 1 && (
          <>
            <h1 className="text-[20px] font-extrabold leading-tight text-ink-900">
              Şifreni sıfırla
            </h1>
            <p className="mb-[18px] mt-1.5 text-[13px] font-medium leading-relaxed text-ink-400">
              Hesabına kayıtlı e-postayı gir; 6 haneli doğrulama kodu
              gönderelim.
            </p>
            <label className="mb-[7px] block text-[12.5px] font-bold text-ink-900">
              E-posta
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value.slice(0, 60))}
              placeholder="ornek@eposta.com"
              className={inputCls}
            />
            <button
              type="button"
              disabled={!e1ok}
              onClick={() => {
                if (e1ok) {
                  setAdim(2);
                  setKodGonderildi(false);
                }
              }}
              className={`mt-4 ${e1ok ? primaryBtn : disabledBtn}`}
            >
              Kodu Gönder
            </button>
          </>
        )}

        {adim === 2 && (
          <>
            <h1 className="text-[20px] font-extrabold leading-tight text-ink-900">
              Kodu doğrula
            </h1>
            <p className="mb-[18px] mt-1.5 text-[13px] font-medium leading-relaxed text-ink-400">
              {email || "e-posta adresine"} adresine 6 haneli kod gönderdik.{" "}
              <span className="text-ink-300">
                (Önizleme: herhangi 6 rakam işe yarar.)
              </span>
            </p>
            <input
              value={kod}
              onChange={(e) =>
                setKod(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="• • • • • •"
              inputMode="numeric"
              className="w-full box-border rounded-control border-[1.5px] border-border-input p-3.5 text-center text-[22px] font-extrabold tracking-[10px] text-ink-900 outline-none focus:border-primary"
            />
            <div className="mt-2.5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setAdim(1);
                  setKod("");
                  setKodGonderildi(false);
                }}
                className="cursor-pointer py-1 text-[12px] font-semibold text-ink-400 hover:text-ink-900"
              >
                ‹ E-postayı değiştir
              </button>
              {kodGonderildi ? (
                <span className="py-1 text-[12px] font-bold text-accent-ink">
                  Kod tekrar gönderildi ✓
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setKodGonderildi(true)}
                  className="cursor-pointer py-1 text-[12px] font-bold text-primary"
                >
                  Kodu tekrar gönder
                </button>
              )}
            </div>
            <button
              type="button"
              disabled={!e2ok}
              onClick={() => {
                if (e2ok) {
                  setAdim(3);
                  setKodGonderildi(false);
                }
              }}
              className={`mt-3.5 ${e2ok ? primaryBtn : disabledBtn}`}
            >
              Doğrula
            </button>
          </>
        )}

        {adim === 3 && (
          <>
            <h1 className="text-[20px] font-extrabold leading-tight text-ink-900">
              Yeni şifreni belirle
            </h1>
            <p className="mb-[18px] mt-1.5 text-[13px] font-medium leading-relaxed text-ink-400">
              Kod doğrulandı ✓ — en az 8 karakterli yeni bir şifre seç.
            </p>
            <label className="mb-[7px] block text-[12.5px] font-bold text-ink-900">
              Yeni şifre
            </label>
            <input
              value={p1}
              onChange={(e) => setP1(e.target.value.slice(0, 40))}
              type="password"
              placeholder="••••••••"
              className={`${inputCls} mb-3`}
            />
            <label className="mb-[7px] block text-[12.5px] font-bold text-ink-900">
              Yeni şifre (tekrar)
            </label>
            <input
              value={p2}
              onChange={(e) => setP2(e.target.value.slice(0, 40))}
              type="password"
              placeholder="••••••••"
              className={inputCls}
            />
            {uyusmuyor && (
              <p className="mt-2 text-[11.5px] font-semibold leading-snug text-danger">
                Şifreler eşleşmiyor.
              </p>
            )}
            <button
              type="button"
              disabled={!eslesir}
              onClick={() => eslesir && setAdim(4)}
              className={`mt-4 ${eslesir ? primaryBtn : disabledBtn}`}
            >
              Şifreyi Güncelle
            </button>
          </>
        )}

        {adim === 4 && (
          <div className="text-center">
            <div className="mx-auto flex h-[54px] w-[54px] items-center justify-center rounded-full bg-primary text-[22px] font-extrabold text-white">
              ✓
            </div>
            <h1 className="mt-4 text-[20px] font-extrabold leading-tight text-ink-900">
              Şifren güncellendi
            </h1>
            <p className="mt-2 text-[13px] font-medium leading-relaxed text-ink-500">
              Yeni şifrenle giriş yapabilirsin. Güvenlik için tüm cihazlardaki
              oturumlar kapatıldı.
            </p>
            <Link
              href="/giris"
              className="mt-[18px] inline-block rounded-control bg-primary px-[22px] py-3.5 text-[13.5px] font-bold text-white hover:bg-primary-hover"
            >
              Giriş Yap
            </Link>
          </div>
        )}
      </div>

      <div className="mt-[18px] flex gap-2">
        <span className={`h-[5px] w-[26px] rounded-full ${bar(1)}`} />
        <span className={`h-[5px] w-[26px] rounded-full ${bar(2)}`} />
        <span className={`h-[5px] w-[26px] rounded-full ${bar(3)}`} />
      </div>
      <Link
        href="/giris"
        className="mt-4 text-[12.5px] font-semibold text-ink-400 hover:text-ink-900"
      >
        ‹ Girişe dön
      </Link>
    </main>
  );
}
