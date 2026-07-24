import type { Metadata } from "next";
import { IlanYonetimiClient } from "@/components/IlanYonetimiClient";

export const metadata: Metadata = {
  title: "İlan Yönetimi",
  description:
    "İlanının görüntülenme, takip ve sunum istatistiklerini izle; süresini uzat, duraklat ya da sunumları karşılaştır.",
};

export default function IlanYonetimiPage() {
  return <IlanYonetimiClient />;
}
