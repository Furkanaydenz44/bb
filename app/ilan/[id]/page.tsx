import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTalep, talepler } from "@/lib/data";
import { IlanDetay } from "@/components/IlanDetay";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const talep = getTalep(id);
  if (!talep) return { title: "Talep bulunamadı" };
  return {
    title: talep.baslik,
    description: `${talep.ilce}, ${talep.il} · Alıcının belirlediği fiyat: ${talep.fiyatNum.toLocaleString("tr-TR")} TL. Uygun ürünün varsa sunumunu ilet.`,
  };
}

// Pre-render every seed talep at build time.
export function generateStaticParams() {
  return talepler.map((t) => ({ id: t.id }));
}

export default async function IlanPage({ params }: Params) {
  const { id } = await params;
  const talep = getTalep(id);
  if (!talep) notFound();

  const benzer = [
    ...talepler.filter((t) => t.id !== id && t.kategori === talep.kategori),
    ...talepler.filter((t) => t.id !== id && t.kategori !== talep.kategori),
  ].slice(0, 4);

  return <IlanDetay talep={talep} benzer={benzer} />;
}
