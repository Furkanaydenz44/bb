"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeaderSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/kesfet?q=${encodeURIComponent(query)}` : "/kesfet");
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className="flex max-w-[640px] flex-1 items-center gap-2.5 rounded-xl border border-border bg-page px-4 py-[13px] transition-colors focus-within:border-primary"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="h-[17px] w-[17px] flex-none text-ink-400"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Talep ara: ürün, marka, kategori..."
        aria-label="Talep ara"
        className="w-full bg-transparent text-[14.5px] font-medium text-ink-900 caret-primary outline-none placeholder:text-ink-400"
      />
    </form>
  );
}
