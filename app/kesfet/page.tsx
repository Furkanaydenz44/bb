import type { Metadata } from "next";
import { KesfetClient } from "@/components/KesfetClient";

export const metadata: Metadata = {
  title: "Talepleri Keşfet",
  description:
    "Gerçek alıcı taleplerini kategori, il ve fiyata göre filtrele; karşılayabileceğin taleplere sunum yap.",
};

export default async function KesfetPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string }>;
}) {
  const { q, kategori } = await searchParams;
  const kats = kategori ? [kategori] : [];
  // key: aynı rotada q/kategori değişince client'ı remount ederek
  // filtre state'ini yeni parametreyle yeniden başlatır (arama senkronu).
  return (
    <KesfetClient
      key={`${q ?? ""}|${kategori ?? ""}`}
      initialQ={q ?? ""}
      initialKats={kats}
    />
  );
}
