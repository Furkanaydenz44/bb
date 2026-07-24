import type { Metadata } from "next";
import { SaticiProfiliClient } from "@/components/SaticiProfiliClient";

export const metadata: Metadata = {
  title: "plakdukkani34 — Satıcı Profili",
  description:
    "plakdukkani34 satıcı profili: puan dağılımı, güven metrikleri, alıcı değerlendirmeleri ve açık talepleri.",
};

export default function SaticiProfiliPage() {
  return <SaticiProfiliClient />;
}
