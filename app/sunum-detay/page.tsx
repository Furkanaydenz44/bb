import type { Metadata } from "next";
import { SunumDetayClient } from "@/components/SunumDetayClient";

export const metadata: Metadata = {
  title: "Sunum Detayı",
  description:
    "Satıcının sunumunu tam ekran incele: fotoğraflar, video, satıcı güven bilgileri ve teklif iste seçeneği.",
};

export default function SunumDetayPage() {
  return <SunumDetayClient />;
}
