import type { Metadata } from "next";
import { SiparislerimClient } from "@/components/SiparislerimClient";

export const metadata: Metadata = {
  title: "Siparişlerim",
  description:
    "Alımlarını ve satışlarını tek yerden takip et — kargo durumu, tutar ve sipariş detayları.",
};

export default function SiparislerimPage() {
  return <SiparislerimClient />;
}
