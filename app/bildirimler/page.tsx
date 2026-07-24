import type { Metadata } from "next";
import { BildirimlerClient } from "@/components/BildirimlerClient";

export const metadata: Metadata = {
  title: "Bildirimler",
  description:
    "Taleplerine gelen sunumlar, teklif istekleri, kargo ve sistem bildirimlerini tek yerde takip et.",
};

export default function BildirimlerPage() {
  return <BildirimlerClient />;
}
