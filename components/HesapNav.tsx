import Link from "next/link";

const items = [
  { label: "Profilim", href: "/profil" },
  { label: "Siparişlerim", href: "/siparislerim" },
  { label: "Kazançlarım", href: "/cuzdan" },
];

/** Hesap sayfaları arası ortak üst menü (Profilim · Siparişlerim · Kazançlarım). */
export function HesapNav({ active }: { active: string }) {
  return (
    <nav className="mb-5 flex flex-wrap gap-1.5">
      {items.map((n) => {
        const isActive = n.href === active;
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-[15px] py-[10px] text-[13px] font-bold transition-colors ${
              isActive
                ? "bg-ink-900 text-white"
                : "bg-card text-ink-500 ring-1 ring-inset ring-border hover:text-primary"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
