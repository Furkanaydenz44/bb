import type { Metadata } from "next";
import { CuzdanClient } from "@/components/CuzdanClient";

export const metadata: Metadata = {
  title: "Kazançlarım",
  description:
    "Satış kazançların, aktarılabilir bakiyen ve IBAN aktarımların — komisyon ve işlem geçmişiyle birlikte.",
};

export default function CuzdanPage() {
  return <CuzdanClient />;
}
