import type { Metadata } from "next";
import { DavetEtClient } from "@/components/DavetEtClient";

export const metadata: Metadata = {
  title: "Davet Et",
  description:
    "Arkadaşını davet et; ikiniz de bir sonraki satışta %7 yerine %5 komisyon ödeyin. Referans programı ile kazan-kazan.",
};

export default function DavetEtPage() {
  return <DavetEtClient />;
}
