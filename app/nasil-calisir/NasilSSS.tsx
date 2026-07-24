"use client";

import { useState } from "react";

const sorular = [
  {
    soru: "Neden ilanı alıcı açıyor?",
    cevap:
      "BulBana ters pazardır: bulunamayan, nadir ya da stoku bitmiş ürünlerde asıl kıt olan taleptir. Alıcı ne istediğini ve ödeyeceği fiyatı ilan eder; elinde o ürün olan satıcılar doğrudan gerçek bir müşteriyle karşılaşır.",
  },
  {
    soru: "Sunumumu kimler görebilir?",
    cevap:
      "Yalnızca ilan sahibi. Diğer satıcılar sunumunu, fotoğraflarını ve fiyat beklentini göremez — rekabet bilgin sana kalır. İlan sayfasında herkes yalnızca toplam sunum sayısını görür.",
  },
  {
    soru: "Pazarlık ya da revize teklif için ücret öder miyim?",
    cevap:
      "Hayır. Sunum göndermek, teklif vermek, revize teklif ve pazarlık tamamen ücretsizdir. BulBana yalnızca satış gerçekleşirse, anlaşılan fiyat üzerinden %7 komisyon alır.",
  },
  {
    soru: "Ürün anlatıldığı gibi çıkmazsa ne olur?",
    cevap:
      "Ödemen satıcıya geçmeden BulBana güvencesinde tutulduğu için itiraz başlatabilirsin. Destek ekibi sunum fotoğrafları ve sohbet kaydı üzerinden inceler; haklıysan ödemen iade edilir.",
  },
  {
    soru: "Komisyon kimden ve ne zaman alınır?",
    cevap:
      "Satıcıdan, yalnızca gerçekleşen satışta. Alıcı ürünü teslim alıp onayladığında, anlaşılan fiyatın %7'u düşülür ve kalan tutar satıcıya aktarılır. Alıcı ek ücret ödemez.",
  },
];

export function NasilSSS() {
  const [acik, setAcik] = useState<number>(0);

  return (
    <div className="flex flex-col gap-2">
      {sorular.map((q, i) => {
        const open = acik === i;
        return (
          <div
            key={q.soru}
            className={`overflow-hidden rounded-[14px] bg-card ${
              open ? "border-[1.5px] border-primary" : "border border-border"
            }`}
          >
            <button
              type="button"
              onClick={() => setAcik(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full cursor-pointer items-center justify-between gap-3 px-[18px] py-4 text-left hover:opacity-80"
            >
              <span
                className={`text-sm font-bold leading-snug ${
                  open ? "text-primary-hover" : "text-ink-900"
                }`}
              >
                {q.soru}
              </span>
              <span
                className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-[13px] font-bold ${
                  open ? "bg-primary text-white" : "bg-page text-ink-500"
                }`}
              >
                {open ? "−" : "+"}
              </span>
            </button>
            {open && (
              <p className="px-[18px] pb-4 text-[13px] font-medium leading-relaxed text-ink-700">
                {q.cevap}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
