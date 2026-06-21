# Bulbana — Backend (Supabase) taşıma

Hedef: localStorage "sahte DB"den gerçek çok-kullanıcılı backend'e geçmek. Domain
modeli zaten `src/data/types.ts` + `src/store/appData.tsx`'te tasarlandı; bu bir
**taşıma**, yeniden yazım değil.

## Mimari karar
- **DB + Auth + Realtime + Storage:** Supabase
- **İş kuralları sunucuda:** kredi düşürme, "Kabul Et yalnız alıcı", kargo=satıcı,
  teslim=alıcı, "ilanda 1 kez kredi" → hepsi `SECURITY DEFINER` RPC'lerde (cheat'e kapalı)
- **Satır güvenliği:** RLS — teklif/anlaşma/sohbet yalnız taraflarına görünür
- **Ödeme:** V2 (kredi altyapısı sunucuda hazır; satın alma sonra)

## Durum
- [x] **Şema + iş kuralları** — `supabase/migrations/20260620000000_init.sql`
      (tablolar, enum'lar, indeksler, RLS, kayıt→profil trigger'ı, kredi formülü,
      tüm akış RPC'leri: request_offer / send_offer / counter_offer / accept_offer /
      reject_offer / reject_presentation / mark_shipped / mark_delivered /
      create_presentation / send_message)
- [x] **Supabase client'ları** — `src/lib/supabase/{client,server}.ts`
- [ ] **Auth UI** — LoginPage'i e-posta/şifre kayıt+giriş'e bağla (signUp metadata: name, city)
- [ ] **Veri katmanı** — `AppDataProvider`'ı arkadan Supabase'e çevir (arayüz aynı kalır)
- [ ] **Realtime** — messages + notifications için canlı abonelik
- [ ] **Storage** — referans/sunum görselleri base64 yerine Supabase Storage'a
- [ ] **Tipler** — `npx supabase gen types typescript` ile DB tipleri üret

## SENİN YAPMAN GEREKEN (tek seferlik, ~5 dk)
1. [supabase.com](https://supabase.com) → yeni proje aç (ücretsiz plan yeter).
2. **SQL Editor**'a gir → `supabase/migrations/20260620000000_init.sql` içeriğini
   yapıştır → **Run**. (Bu yol şifre/secret gerektirmez, her şey sende kalır.)
3. **Settings → API**'den iki PUBLIC değeri al ve `.env.local` oluştur:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   NEXT_PUBLIC_SITE_URL=http://localhost:3100
   ```
   > anon key publishable (frontend'de güvenli). `service_role` key'i **paylaşma**,
   > şu an gerekmiyor.
4. (Opsiyonel) E-posta doğrulamayı kapatmak istersen: Authentication → Providers →
   Email → "Confirm email" kapalı (demo/test için hızlı giriş).

Bunları yapınca haber ver — veri katmanını (auth + provider'ı Supabase'e bağlama)
ben tamamlarım. `.env.local` yoksa uygulama otomatik **demo modda** (localStorage)
çalışmaya devam eder; hiçbir sayfa bozulmaz.

## Tablo ⇄ tip eşlemesi (referans)
| types.ts | tablo |
|---|---|
| User | profiles |
| Demand | demands |
| Presentation | presentations |
| Offer | offers (history jsonb) |
| Deal | deals |
| Thread | threads |
| Message | messages |
| AppNotification | notifications |
| (kredi hareketleri) | credit_ledger |
