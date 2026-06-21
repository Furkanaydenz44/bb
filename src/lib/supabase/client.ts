import { createBrowserClient } from '@supabase/ssr';

/** Supabase yapılandırıldı mı? (.env.local'da URL + anon anahtarı var mı) */
export const supabaseEnabled =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: ReturnType<typeof createBrowserClient> | null = null;

/** Tarayıcı Supabase istemcisi (singleton). Yapılandırılmadıysa hata verir. */
export function supabaseBrowser() {
  if (!supabaseEnabled) {
    throw new Error('Supabase yapılandırılmadı — .env.local içine URL + anon anahtarını ekle.');
  }
  if (!client) {
    client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return client;
}
