import { Chip } from "@/components/ui/Chip";
import { ButtonLink } from "@/components/ui/Button";

/** Hesap sayfalarında solda duran ortak profil kimlik kartı. */
export function HesapKart() {
  return (
    <aside className="overflow-hidden rounded-panel border border-border bg-card lg:sticky lg:top-[150px]">
      <div className="h-16 bg-gradient-to-br from-primary-soft via-primary/20 to-accent-soft" />
      <div className="px-5 pb-5 text-center">
        <div className="-mt-9 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary text-xl font-extrabold text-white ring-4 ring-card">
          EK
        </div>
        <h2 className="mt-2.5 text-[19px] font-extrabold tracking-[-0.3px] text-ink-900">
          emre.k
        </h2>
        <div className="mt-1 text-[14px] font-extrabold text-star">
          ★ 4,9{" "}
          <span className="text-[11.5px] font-semibold text-ink-400">
            · 15 değerlendirme
          </span>
        </div>
        <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
          <Chip variant="violet">✓ Kimlik doğrulandı</Chip>
          <Chip variant="lime">Alıcı Kalitesi: Yüksek</Chip>
        </div>
        <p className="mt-3.5 text-pretty text-[12.5px] font-medium leading-relaxed text-ink-700">
          Koleksiyoncuyum; plak, CD ve retro elektronik ararım. Sunumları aynı
          gün incelerim, anlaştığımda ödemeyi bekletmem.
        </p>
        <div className="mt-3 border-t border-hairline pt-3 text-[12px] font-medium text-ink-400">
          Kadıköy, İstanbul · 2024&apos;ten beri üye · %0 iptal
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <ButtonLink href="/ayarlar" variant="primary" size="sm">
            Profili Düzenle
          </ButtonLink>
          <ButtonLink href="/ayarlar" variant="secondary" size="sm">
            Hesap Ayarları
          </ButtonLink>
        </div>
      </div>
    </aside>
  );
}
