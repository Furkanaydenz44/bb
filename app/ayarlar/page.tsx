import type { Metadata } from "next";
import { AyarlarClient } from "@/components/AyarlarClient";

export const metadata: Metadata = {
  title: "Hesap Ayarları",
  description:
    "Profil bilgilerini, adreslerini, ödeme yöntemlerini, bildirim ve gizlilik tercihlerini ve güvenlik ayarlarını yönet.",
};

export default function AyarlarPage() {
  return <AyarlarClient />;
}
