-- Bulbana — ilk şema. types.ts'i birebir yansıtır + iş kuralları sunucuda (RPC).
-- Uygula: Supabase SQL Editor'a yapıştır VEYA `npx supabase db push` (link sonrası).

-- ============================================================
-- ENUM'lar
-- ============================================================
create type category_id as enum ('foto','muzik','sneaker','saat','koleksiyon','teknoloji','oto');
create type presentation_status as enum ('submitted','offer_requested','rejected');
create type offer_status as enum ('pending','countered','accepted','rejected');
create type deal_status as enum ('awaiting_shipment','shipped','delivered');
create type message_kind as enum ('text','system','offer','shipping');
create type notification_kind as enum ('presentation','approved','rejected','offer','counter','deal','shipped','delivered','message');

-- ============================================================
-- TABLOLAR
-- ============================================================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  name text not null,
  avatar text not null default '',
  city text not null default 'İstanbul',
  credits int not null default 100,
  score numeric(2,1) not null default 5.0,
  reviews int not null default 0,
  sales int not null default 0,
  response_time text not null default 'yeni',
  completion_rate int not null default 100,
  trust_signals text[] not null default '{Yeni üye}',
  created_at timestamptz not null default now()
);

create table demands (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  category_id category_id not null,
  title text not null,
  description text not null default '',
  price int not null default 0,
  city text not null default 'İstanbul',
  district text,
  badge text not null default 'Aktif Alıcı',
  cover_image text not null default '',
  reference_images text[] not null default '{}',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table presentations (
  id uuid primary key default gen_random_uuid(),
  demand_id uuid not null references demands(id) on delete cascade,
  seller_id uuid not null references profiles(id) on delete cascade,
  condition text not null default '',
  city text not null default 'İstanbul',
  cover_image text not null default '',
  images text[] not null default '{}',
  videos int not null default 0,
  description text not null default '',
  status presentation_status not null default 'submitted',
  created_at timestamptz not null default now()
);

create table offers (
  id uuid primary key default gen_random_uuid(),
  demand_id uuid not null references demands(id) on delete cascade,
  presentation_id uuid not null references presentations(id) on delete cascade,
  seller_id uuid not null references profiles(id) on delete cascade,
  buyer_id uuid not null references profiles(id) on delete cascade,
  price int not null,
  note text,
  delivery text,
  status offer_status not null default 'pending',
  credit_cost int not null default 0,
  history jsonb not null default '[]',
  created_at timestamptz not null default now(),
  unique (presentation_id)  -- ilanda yalnız 1 teklif (kredi 1 kez)
);

create table deals (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references offers(id) on delete cascade,
  demand_id uuid not null references demands(id) on delete cascade,
  presentation_id uuid not null references presentations(id) on delete cascade,
  buyer_id uuid not null references profiles(id) on delete cascade,
  seller_id uuid not null references profiles(id) on delete cascade,
  price int not null,
  status deal_status not null default 'awaiting_shipment',
  carrier text,
  tracking_no text,
  created_at timestamptz not null default now(),
  deadline_at timestamptz,
  shipped_at timestamptz,
  delivered_at timestamptz
);

create table threads (
  id uuid primary key default gen_random_uuid(),
  demand_id uuid not null references demands(id) on delete cascade,
  presentation_id uuid not null references presentations(id) on delete cascade,
  buyer_id uuid not null references profiles(id) on delete cascade,
  seller_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  last_at timestamptz not null default now(),
  unique (demand_id, buyer_id, seller_id)
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references threads(id) on delete cascade,
  sender_id uuid not null references profiles(id) on delete cascade,
  kind message_kind not null default 'text',
  body text not null default '',
  price int,
  at timestamptz not null default now()
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  kind notification_kind not null,
  text text not null,
  href text,
  read boolean not null default false,
  at timestamptz not null default now()
);

-- Append-only kredi defteri (profiles.credits yürüyen bakiye)
create table credit_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  delta int not null,
  reason text not null,
  ref_id text,
  at timestamptz not null default now()
);

-- ============================================================
-- İNDEKSLER
-- ============================================================
create index on demands(owner_id);
create index on demands(category_id);
create index on presentations(demand_id);
create index on presentations(seller_id);
create index on offers(presentation_id);
create index on offers(buyer_id);
create index on offers(seller_id);
create index on deals(presentation_id);
create index on threads(buyer_id);
create index on threads(seller_id);
create index on messages(thread_id);
create index on notifications(user_id) where read = false;

-- ============================================================
-- Kayıt olunca otomatik profil (auth.users -> profiles)
-- ============================================================
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  base text;
  uname text;
  n int := 0;
begin
  base := regexp_replace(lower(coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1))), '[^a-z0-9]+', '', 'g');
  if base = '' then base := 'uye'; end if;
  uname := base;
  while exists (select 1 from profiles where username = uname) loop
    n := n + 1; uname := base || n::text;
  end loop;
  insert into profiles (id, username, name, avatar, city)
  values (
    new.id,
    uname,
    coalesce(new.raw_user_meta_data->>'name', 'Yeni Üye'),
    upper(substr(coalesce(new.raw_user_meta_data->>'name','Y'),1,1)),
    coalesce(new.raw_user_meta_data->>'city', 'İstanbul')
  );
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- Kredi formülü (lib/credits.ts ile aynı) + kredi harcama
-- ============================================================
create or replace function offer_credit_cost(p_price int, p_cat category_id, p_buyer_score numeric)
returns int language plpgsql immutable as $$
declare
  rate numeric;
  cat numeric;
  qf numeric;
  cost numeric;
begin
  rate := case
    when p_price <= 1000 then 0.01
    when p_price <= 5000 then 0.006
    when p_price <= 15000 then 0.0035
    when p_price <= 50000 then 0.002
    else 0.0012 end;
  cat := case p_cat
    when 'foto' then 1.2 when 'muzik' then 1.2 when 'sneaker' then 1.1
    when 'saat' then 1.5 when 'koleksiyon' then 1.4 when 'teknoloji' then 1.05
    when 'oto' then 1.3 else 1.0 end;
  qf := greatest(0.85, least(1.2, 0.9 + (coalesce(p_buyer_score,4.5) - 4) * 0.25));
  cost := (p_price * rate * cat * qf) / 10.0;
  return greatest(1, least(30, round(cost)::int));
end; $$;

create or replace function spend_credit(p_user uuid, p_amount int, p_reason text, p_ref text)
returns void language plpgsql security definer set search_path = public as $$
begin
  update profiles set credits = credits - p_amount where id = p_user and credits >= p_amount;
  if not found then raise exception 'insufficient_credits'; end if;
  insert into credit_ledger(user_id, delta, reason, ref_id) values (p_user, -p_amount, p_reason, p_ref);
end; $$;

-- yardımcı: thread bul/oluştur
create or replace function ensure_thread(p_demand uuid, p_presentation uuid, p_buyer uuid, p_seller uuid)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  select id into v_id from threads where demand_id = p_demand and buyer_id = p_buyer and seller_id = p_seller;
  if v_id is null then
    insert into threads(demand_id, presentation_id, buyer_id, seller_id)
    values (p_demand, p_presentation, p_buyer, p_seller) returning id into v_id;
  end if;
  return v_id;
end; $$;

-- ============================================================
-- İŞ KURALLARI — RPC'ler (rol/kredi/sıra kontrolü SUNUCUDA)
-- ============================================================

-- Alıcı sunumdan resmi teklif ister
create or replace function request_offer(p_presentation uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_pres presentations; v_demand demands;
begin
  select * into v_pres from presentations where id = p_presentation;
  select * into v_demand from demands where id = v_pres.demand_id;
  if v_demand.owner_id <> auth.uid() then raise exception 'only_buyer'; end if;
  update presentations set status = 'offer_requested' where id = p_presentation;
  insert into notifications(user_id, kind, text, href)
  values (v_pres.seller_id, 'approved', (select name from profiles where id=v_demand.owner_id) || ' sunumunu beğendi — senden resmi teklif istiyor', null);
end; $$;

-- Satıcı kredi harcayarak resmi teklif verir -> thread döner
create or replace function send_offer(p_presentation uuid, p_price int, p_note text)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  v_pres presentations; v_demand demands; v_seller uuid := auth.uid();
  v_cost int; v_offer_id uuid; v_thread uuid; v_buyer_score numeric;
begin
  select * into v_pres from presentations where id = p_presentation;
  if v_pres.seller_id <> v_seller then raise exception 'not_your_presentation'; end if;
  select * into v_demand from demands where id = v_pres.demand_id;
  -- teklif zaten var mı? (kredi 1 kez) -> sohbete götür
  if exists (select 1 from offers where presentation_id = p_presentation) then
    return ensure_thread(v_demand.id, p_presentation, v_demand.owner_id, v_seller);
  end if;
  select score into v_buyer_score from profiles where id = v_demand.owner_id;
  v_cost := offer_credit_cost(v_demand.price, v_demand.category_id, v_buyer_score);
  perform spend_credit(v_seller, v_cost, 'offer', p_presentation::text);
  insert into offers(demand_id, presentation_id, seller_id, buyer_id, price, note, status, credit_cost, history)
  values (v_demand.id, p_presentation, v_seller, v_demand.owner_id, p_price, p_note, 'pending', v_cost,
          jsonb_build_array(jsonb_build_object('actor','seller','action','offer','price',p_price,'at',extract(epoch from now())*1000)))
  returning id into v_offer_id;
  v_thread := ensure_thread(v_demand.id, p_presentation, v_demand.owner_id, v_seller);
  insert into messages(thread_id, sender_id, kind, body) values
    (v_thread, v_seller, 'system', 'Sohbet açıldı · teklif maliyeti ' || v_cost || ' kredi (ilanda yalnız 1 kez; pazarlık ücretsiz).');
  insert into messages(thread_id, sender_id, kind, body, price) values
    (v_thread, v_seller, 'offer', coalesce(p_note,''), p_price);
  update threads set last_at = now() where id = v_thread;
  insert into notifications(user_id, kind, text, href)
  values (v_demand.owner_id, 'offer', (select name from profiles where id=v_seller) || ' resmi teklif verdi', '/mesajlar/' || v_thread);
  return v_thread;
end; $$;

-- Karşı teklif (ücretsiz) — iki taraf da
create or replace function counter_offer(p_offer uuid, p_price int, p_note text)
returns void language plpgsql security definer set search_path = public as $$
declare v_offer offers; v_uid uuid := auth.uid(); v_actor text; v_other uuid; v_thread uuid;
begin
  select * into v_offer from offers where id = p_offer;
  if v_uid <> v_offer.buyer_id and v_uid <> v_offer.seller_id then raise exception 'not_party'; end if;
  v_actor := case when v_uid = v_offer.buyer_id then 'buyer' else 'seller' end;
  update offers set status='countered', price=p_price,
    history = history || jsonb_build_object('actor',v_actor,'action','counter','price',p_price,'at',extract(epoch from now())*1000)
    where id = p_offer;
  v_thread := ensure_thread(v_offer.demand_id, v_offer.presentation_id, v_offer.buyer_id, v_offer.seller_id);
  insert into messages(thread_id, sender_id, kind, body, price) values (v_thread, v_uid, 'offer', coalesce(p_note,''), p_price);
  update threads set last_at = now() where id = v_thread;
  v_other := case when v_uid = v_offer.buyer_id then v_offer.seller_id else v_offer.buyer_id end;
  insert into notifications(user_id, kind, text, href)
  values (v_other, 'counter', (select name from profiles where id=v_uid) || ' karşı teklif verdi: ' || p_price || '₺', '/mesajlar/' || v_thread);
end; $$;

-- Kabul Et — YALNIZ ALICI (denetim bulgusu, sunucuda zorunlu)
create or replace function accept_offer(p_offer uuid)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_offer offers; v_uid uuid := auth.uid(); v_deal uuid; v_thread uuid;
begin
  select * into v_offer from offers where id = p_offer;
  if v_offer.buyer_id <> v_uid then raise exception 'only_buyer_can_accept'; end if;
  update offers set status='accepted',
    history = history || jsonb_build_object('actor','buyer','action','accept','price',v_offer.price,'at',extract(epoch from now())*1000)
    where id = p_offer;
  insert into deals(offer_id, demand_id, presentation_id, buyer_id, seller_id, price, status, deadline_at)
  values (p_offer, v_offer.demand_id, v_offer.presentation_id, v_offer.buyer_id, v_offer.seller_id, v_offer.price, 'awaiting_shipment', now() + interval '3 days')
  returning id into v_deal;
  v_thread := ensure_thread(v_offer.demand_id, v_offer.presentation_id, v_offer.buyer_id, v_offer.seller_id);
  insert into messages(thread_id, sender_id, kind, body) values
    (v_thread, v_uid, 'system', 'Anlaşma sağlandı: ' || v_offer.price || '₺. Satıcı 3 gün içinde kargolamalı.');
  update threads set last_at = now() where id = v_thread;
  insert into notifications(user_id, kind, text, href) values
    (v_offer.seller_id, 'deal', 'Anlaşma! ' || v_offer.price || '₺ — 3 gün içinde kargola', '/mesajlar/' || v_thread);
  return v_deal;
end; $$;

create or replace function reject_offer(p_offer uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_offer offers; v_uid uuid := auth.uid(); v_thread uuid; v_other uuid;
begin
  select * into v_offer from offers where id = p_offer;
  if v_uid <> v_offer.buyer_id and v_uid <> v_offer.seller_id then raise exception 'not_party'; end if;
  update offers set status='rejected' where id = p_offer;
  v_thread := ensure_thread(v_offer.demand_id, v_offer.presentation_id, v_offer.buyer_id, v_offer.seller_id);
  insert into messages(thread_id, sender_id, kind, body) values (v_thread, v_uid, 'system', 'Teklif reddedildi.');
  v_other := case when v_uid = v_offer.buyer_id then v_offer.seller_id else v_offer.buyer_id end;
  insert into notifications(user_id, kind, text, href) values (v_other, 'offer', 'Teklif reddedildi', '/mesajlar/' || v_thread);
end; $$;

create or replace function reject_presentation(p_presentation uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_pres presentations; v_demand demands;
begin
  select * into v_pres from presentations where id = p_presentation;
  select * into v_demand from demands where id = v_pres.demand_id;
  if v_demand.owner_id <> auth.uid() then raise exception 'only_buyer'; end if;
  update presentations set status='rejected' where id = p_presentation;
  insert into notifications(user_id, kind, text) values (v_pres.seller_id, 'rejected', 'Sunumun beğenilmedi');
end; $$;

create or replace function mark_shipped(p_deal uuid, p_carrier text, p_tracking text)
returns void language plpgsql security definer set search_path = public as $$
declare v_deal deals; v_thread uuid;
begin
  select * into v_deal from deals where id = p_deal;
  if v_deal.seller_id <> auth.uid() then raise exception 'only_seller'; end if;
  update deals set status='shipped', carrier=p_carrier, tracking_no=p_tracking, shipped_at=now() where id = p_deal;
  v_thread := ensure_thread(v_deal.demand_id, v_deal.presentation_id, v_deal.buyer_id, v_deal.seller_id);
  insert into messages(thread_id, sender_id, kind, body) values (v_thread, auth.uid(), 'shipping', 'Kargolandı · ' || p_carrier || ' · Takip no: ' || p_tracking);
  update threads set last_at = now() where id = v_thread;
  insert into notifications(user_id, kind, text, href) values (v_deal.buyer_id, 'shipped', 'Siparişin kargolandı — takip: ' || p_tracking, '/mesajlar/' || v_thread);
end; $$;

create or replace function mark_delivered(p_deal uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_deal deals; v_thread uuid;
begin
  select * into v_deal from deals where id = p_deal;
  if v_deal.buyer_id <> auth.uid() then raise exception 'only_buyer'; end if;
  update deals set status='delivered', delivered_at=now() where id = p_deal;
  -- işlem tamamlandı: satıcı istatistiği gerçekten artar (seviye canlı ilerler)
  update profiles set sales = sales + 1 where id = v_deal.seller_id;
  v_thread := ensure_thread(v_deal.demand_id, v_deal.presentation_id, v_deal.buyer_id, v_deal.seller_id);
  insert into messages(thread_id, sender_id, kind, body) values (v_thread, auth.uid(), 'system', 'Teslim alındı — işlem tamamlandı. 🎉');
  update threads set last_at = now() where id = v_thread;
  insert into notifications(user_id, kind, text, href) values (v_deal.seller_id, 'delivered', 'Alıcı teslim aldı — işlem tamamlandı', '/mesajlar/' || v_thread);
end; $$;

create or replace function create_presentation(p_demand uuid, p_condition text, p_city text, p_images text[], p_description text)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_owner uuid;
begin
  if array_length(p_images,1) is null or array_length(p_images,1) < 3 then raise exception 'min_3_photos'; end if;
  insert into presentations(demand_id, seller_id, condition, city, cover_image, images, description)
  values (p_demand, auth.uid(), p_condition, coalesce(p_city,'İstanbul'), p_images[1], p_images, p_description)
  returning id into v_id;
  select owner_id into v_owner from demands where id = p_demand;
  insert into notifications(user_id, kind, text, href)
  values (v_owner, 'presentation', (select name from profiles where id=auth.uid()) || ' talebine ürün sundu', null);
  return v_id;
end; $$;

create or replace function send_message(p_thread uuid, p_body text)
returns void language plpgsql security definer set search_path = public as $$
declare v_thread threads; v_other uuid;
begin
  select * into v_thread from threads where id = p_thread;
  if auth.uid() <> v_thread.buyer_id and auth.uid() <> v_thread.seller_id then raise exception 'not_party'; end if;
  insert into messages(thread_id, sender_id, kind, body) values (p_thread, auth.uid(), 'text', p_body);
  update threads set last_at = now() where id = p_thread;
  v_other := case when auth.uid() = v_thread.buyer_id then v_thread.seller_id else v_thread.buyer_id end;
  insert into notifications(user_id, kind, text, href) values (v_other, 'message', (select name from profiles where id=auth.uid()) || ': ' || left(p_body,40), '/mesajlar/' || p_thread);
end; $$;

-- ============================================================
-- RLS — Satır Seviyesi Güvenlik
-- ============================================================
alter table profiles enable row level security;
alter table demands enable row level security;
alter table presentations enable row level security;
alter table offers enable row level security;
alter table deals enable row level security;
alter table threads enable row level security;
alter table messages enable row level security;
alter table notifications enable row level security;
alter table credit_ledger enable row level security;

-- profiles: herkes okur, kişi kendini günceller
create policy "profiles read" on profiles for select using (true);
create policy "profiles update self" on profiles for update using (id = auth.uid());

-- demands: herkes okur; sahibi yazar/günceller/siler
create policy "demands read" on demands for select using (true);
create policy "demands insert own" on demands for insert with check (owner_id = auth.uid());
create policy "demands update own" on demands for update using (owner_id = auth.uid());
create policy "demands delete own" on demands for delete using (owner_id = auth.uid());

-- presentations: herkes okur (talep akışı); doğrudan yazımı RPC yapar (create_presentation)
create policy "presentations read" on presentations for select using (true);

-- offers/deals/threads: yalnız tarafları okur (yazım RPC ile)
create policy "offers read party" on offers for select using (buyer_id = auth.uid() or seller_id = auth.uid());
create policy "deals read party" on deals for select using (buyer_id = auth.uid() or seller_id = auth.uid());
create policy "threads read party" on threads for select using (buyer_id = auth.uid() or seller_id = auth.uid());

-- messages: yalnız thread tarafları okur (yazım RPC ile)
create policy "messages read party" on messages for select using (
  exists (select 1 from threads t where t.id = thread_id and (t.buyer_id = auth.uid() or t.seller_id = auth.uid()))
);

-- notifications: yalnız sahibi okur/günceller (okundu işareti)
create policy "notifications read own" on notifications for select using (user_id = auth.uid());
create policy "notifications update own" on notifications for update using (user_id = auth.uid());

-- credit_ledger: yalnız sahibi okur
create policy "ledger read own" on credit_ledger for select using (user_id = auth.uid());
