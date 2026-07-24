import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex h-[76px] w-[72px] items-center justify-center rounded-2xl bg-ink-900 text-3xl font-extrabold text-white">
        b
      </span>

      <div className="mt-[18px] text-[76px] font-extrabold leading-none tracking-[-3px] text-ink-900">
        4<span className="text-primary">0</span>4
      </div>

      <h1 className="mt-3.5 text-pretty text-2xl font-extrabold leading-tight tracking-[-0.5px] text-ink-900">
        Aradığın sayfayı bulamadık.
      </h1>
      <p className="mt-2.5 max-w-[440px] text-pretty text-sm font-medium leading-relaxed text-ink-500">
        Bağlantı hatalı olabilir ya da bu talep yayından kalkmış olabilir. Ama
        bulamamak bizim işimiz değil — aradığın bir ürünse, ilanını aç, satıcılar
        sana gelsin.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <ButtonLink href="/" variant="primary" size="lg">
          Ana Sayfaya Dön
        </ButtonLink>
        <ButtonLink href="/kesfet" variant="secondary" size="lg">
          Talepleri Keşfet
        </ButtonLink>
        <ButtonLink href="/ilan-ac" variant="lime" size="lg">
          Aradığını İlan Et
        </ButtonLink>
      </div>

      <span className="mt-[26px] text-[11.5px] font-semibold leading-snug text-ink-300">
        Hata kodu: 404 · Yardım gerekirse{" "}
        <Link href="/destek" className="font-bold">
          destek talebi oluştur
        </Link>
      </span>
    </main>
  );
}
