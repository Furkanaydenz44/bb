# Bulbana

Türkçe **ters pazaryeri**: alıcı bir *talep* açar, satıcılar ürünlerini *sunar*, alıcı beğenirse satıcı **kredi harcayarak** resmi teklif verir; pazarlık → anlaşma → sohbet. Komisyonsuz. **Tek hesap, işleme göre rol** (kendi talebinde alıcı, başkasının talebine sunum yapınca satıcı).

## Stack
- **Next.js 15** (App Router, SSR) + TypeScript
- **Supabase** (Postgres + Auth + Storage + Realtime)

## Geliştirme
1. `npm install`
2. `.env.local` oluştur — bkz. `.env.local.example`
3. Supabase'e bağla: `supabase link --project-ref <ref>` ardından `npm run db:push`
4. `npm run dev` → http://localhost:3100

## Klasör yapısı
| Yol | Açıklama |
|---|---|
| `src/app` | Next.js route'ları (RSC + Server Actions) |
| `src/components` | Paylaşılan UI bileşenleri |
| `src/features` | Sayfa bileşenleri *(Supabase'e migrasyon sürüyor)* |
| `src/lib` | supabase client, slug, routes, pazarlık mantığı |
| `src/server` | Server-only veri erişimi |
| `src/styles/global.css` | Tasarım sistemi (tek dosya) |
| `supabase/migrations` | DB şema + RLS + RPC fonksiyonları |

## Akış
`talep → sunum → (alıcı) teklif iste / reddet → (satıcı) resmi teklif [kredi] → pazarlık → anlaşma → sohbet`
