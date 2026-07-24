import type { Metadata } from "next";
import { Suspense } from "react";
import { IlanAcForm } from "@/components/IlanAcForm";

export const metadata: Metadata = {
  title: "İlan Aç",
  description:
    "Aradığın ürünü ilan et: fiyatı sen belirle, satıcılar sunumlarıyla sana gelsin. İlan açmak ücretsizdir.",
};

export default function IlanAcPage() {
  return (
    <Suspense>
      <IlanAcForm />
    </Suspense>
  );
}
