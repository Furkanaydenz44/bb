import type { Metadata } from "next";
import { SiparisClient } from "@/components/SiparisClient";

export const metadata: Metadata = {
  title: "Sipariş Takibi",
  description:
    "Ödemeni güvenceye al, kargoyu takip et, ürünü teslim alıp onayla ve satıcıyı değerlendir — hepsi tek akışta.",
};

export default function SiparisPage() {
  return <SiparisClient />;
}
