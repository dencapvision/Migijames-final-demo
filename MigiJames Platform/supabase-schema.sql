-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- MigiJames — Supabase Database Schema
-- วิธีใช้: ไปที่ supabase.com → SQL Editor → วางทั้งหมดแล้วกด Run
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- ── Customers (CRM) ───────────────────────────────
create table if not exists customers (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text,
  email       text,
  birthday    date,
  birth_time  text,              -- HH:mm
  birth_place text,
  zodiac_sign text,              -- ราศีมกร, ราศีเมษ, ...
  element     text,              -- ไฟ, ดิน, ลม, น้ำ
  lucky_stones text[],           -- ['เพชร', 'ไพลิน']
  lucky_colors text[],
  vip_tier    text default 'Regular',  -- Regular, VIP, VVIP
  notes       text,
  avatar_url  text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Consultations / Bookings ──────────────────────
create table if not exists consultations (
  id             uuid primary key default gen_random_uuid(),
  customer_id    uuid references customers(id) on delete set null,
  customer_name  text,           -- สำรองไว้กรณีไม่มี account
  customer_phone text,
  type           text not null,  -- online, onsite, workshop
  scheduled_at   timestamptz,
  topic          text,
  status         text default 'pending', -- pending, confirmed, done, cancelled
  outcome_notes  text,
  created_at     timestamptz default now()
);

-- ── Products / Portfolio ──────────────────────────
create table if not exists products (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  category           text,      -- แหวน, สร้อยคอ, ต่างหู, ...
  price              numeric,
  stone_type         text,      -- เพชร, ทับทิม, ไพลิน, ...
  stone_weight       numeric,   -- กะรัต
  metal_type         text,      -- ทอง 18K, แพลทินัม, ...
  suitable_elements  text[],    -- ['ไฟ', 'ดิน']
  suitable_zodiacs   text[],
  image_urls         text[],    -- Cloudflare R2 URLs
  is_bespoke         boolean default false,
  story              text,      -- Jewelry Story Telling
  is_published       boolean default true,
  created_at         timestamptz default now()
);

-- ── Contact Inquiries ─────────────────────────────
create table if not exists contact_inquiries (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  phone        text not null,
  email        text,
  birthday     date,
  inquiry_type text,  -- ปรึกษาดวง, สั่งทำพิเศษ, ดูสินค้า, Workshop
  message      text,
  status       text default 'new',   -- new, contacted, closed
  created_at   timestamptz default now()
);

-- ── Row Level Security (RLS) ──────────────────────
-- เปิด RLS เพื่อความปลอดภัย
alter table customers          enable row level security;
alter table consultations      enable row level security;
alter table products           enable row level security;
alter table contact_inquiries  enable row level security;

-- Products: ทุกคนอ่านได้ (สินค้าที่ publish แล้ว)
create policy "Public can view published products"
  on products for select
  using (is_published = true);

-- Contact inquiries: ทุกคน insert ได้ (submit form)
create policy "Anyone can submit inquiry"
  on contact_inquiries for insert
  with check (true);

-- Admin access: ต้องการ service_role key (ใช้ใน API Routes เท่านั้น)
-- customers, consultations: admin only via service_role

-- ── Sample Data ───────────────────────────────────
-- ลูกค้าตัวอย่าง
insert into customers (name, phone, birthday, zodiac_sign, element, lucky_stones, vip_tier, notes)
values
  ('คุณนภา วงศ์สุวรรณ', '081-234-5678', '1984-03-13', 'ราศีมีน', 'น้ำ', ARRAY['เพชร','ไพลิน','มุก'], 'VVIP', 'ลูกค้าประจำ สั่งทำแหวนทุกปี'),
  ('คุณอรุณ สิทธิชัย',   '082-345-6789', '1987-11-07', 'ราศีพิจิก', 'น้ำ', ARRAY['ทับทิม','การ์เนต'], 'VIP', NULL),
  ('คุณมณี ประภาพร',     '083-456-7890', '1990-06-15', 'ราศีเมถุน', 'ลม', ARRAY['มรกต','ซิทริน'], 'VIP', NULL);

-- สินค้าตัวอย่าง
insert into products (name, category, price, stone_type, metal_type, suitable_elements, story, is_bespoke, is_published)
values
  ('แหวนเพชรดาวแห่งราศีมีน', 'แหวน', 250000, 'เพชร', 'แพลทินัม', ARRAY['น้ำ','ลม'], 'ออกแบบเพื่อราศีมีน ประดับเพชรกลม 2 กะรัต ล้อมด้วยไพลินขนาดเล็ก สะท้อนพลังงานแห่งน้ำและความฝัน', true, true),
  ('สร้อยคอทับทิมแห่งพลัง', 'สร้อยคอ', 185000, 'ทับทิม', 'ทอง 18K', ARRAY['ไฟ'], 'ทับทิมพม่าเกรด A น้ำหนัก 3 กะรัต บนโซ่ทอง 18K เสริมพลังงานไฟและอำนาจ', true, true),
  ('ต่างหูมรกตแห่งธรรมชาติ', 'ต่างหู', 120000, 'มรกต', 'ทอง 18K', ARRAY['ดิน','ลม'], 'มรกตโคลอมเบียคู่ ล้อมเพชร เสริมพลังงานดินและความมั่งคั่ง', true, true);
