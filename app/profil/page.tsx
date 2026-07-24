import type { Metadata } from "next";
import { Suspense } from "react";
import { ProfilClient } from "@/components/ProfilClient";

export const metadata: Metadata = {
  title: "Profilim",
  description:
    "emre.k profili — talepler, gönderilen sunumlar, takip edilenler ve değerlendirmeler tek yerde.",
};

export default function ProfilPage() {
  return (
    <Suspense>
      <ProfilClient />
    </Suspense>
  );
}
