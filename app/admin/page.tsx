import type { Metadata } from "next";
import { AdminClient } from "@/components/AdminClient";

export const metadata: Metadata = {
  title: "Moderasyon Paneli",
  description:
    "Platform ekibine özel iç araç: ilan onayları, itiraz kuyruğu ve kullanıcı yönetimi.",
};

export default function AdminPage() {
  return <AdminClient />;
}
