import type { Metadata } from "next";
import { TalepAlarmlariClient } from "@/components/TalepAlarmlariClient";

export const metadata: Metadata = {
  title: "Talep Alarmları",
  description:
    "Kayıtlı aramalarını yönet; kategori, anahtar kelime, fiyat ve il kriterlerine uyan talep açıldığında anında bildirim al.",
};

export default function TalepAlarmlariPage() {
  return <TalepAlarmlariClient />;
}
