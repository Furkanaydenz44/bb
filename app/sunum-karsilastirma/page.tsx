import type { Metadata } from "next";
import { SunumKarsilastirmaClient } from "@/components/SunumKarsilastirmaClient";

export const metadata: Metadata = {
  title: "Sunumları Karşılaştır",
  description:
    "Seçtiğin sunumları yan yana karşılaştır; fotoğraf, imza kanıtı, satıcı geçmişi ve yanıt sürelerini tek ekranda gör.",
};

export default function SunumKarsilastirmaPage() {
  return <SunumKarsilastirmaClient />;
}
