# MigiJames — Next.js Web App
## Jewelry Story Telling · Astro-Gem Intelligence

---

## 🗂️ โครงสร้างโปรเจกต์

```
migijames-nextjs/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout + fonts
│   │   ├── globals.css               # Design system CSS
│   │   ├── page.tsx                  # Homepage
│   │   ├── (marketing)/              # Public pages
│   │   ├── (admin)/admin/            # Admin dashboard
│   │   └── api/
│   │       ├── contact/route.ts      # Contact form API
│   │       ├── booking/route.ts      # Booking API
│   │       └── astro-match/route.ts  # Zodiac analysis API
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── NavBar.tsx            # Navigation
│   │   │   └── FooterSection.tsx     # Footer
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Full-screen hero
│   │   │   ├── StorySection.tsx      # Brand story
│   │   │   ├── CollectionsSection.tsx# Portfolio
│   │   │   ├── AstroMatchSection.tsx # 🌟 Unique feature
│   │   │   ├── BespokeSection.tsx    # Bespoke process
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── BookingSection.tsx    # Booking form
│   │   ├── ui/                       # Reusable components
│   │   ├── crm/                      # Admin CRM components
│   │   └── astro/                    # Astrology components
│   │
│   ├── lib/
│   │   ├── supabase.ts               # DB client
│   │   ├── r2.ts                     # Cloudflare R2 storage
│   │   └── astro.ts                  # Zodiac engine
│   │
│   ├── hooks/                        # Custom React hooks
│   └── types/index.ts                # TypeScript types
│
├── public/images/                    # Static assets
├── .env.example                      # Environment template
├── supabase-schema.sql               # Database schema
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 🚀 ขั้นตอนเริ่มต้น (ใน Antigravity IDE)

### Step 1 — Clone หรือ สร้างโปรเจกต์
```bash
# สร้างโฟลเดอร์และเปิดใน Antigravity
mkdir migijames && cd migijames
```

### Step 2 — ติดตั้ง Dependencies
```bash
npm install
```

### Step 3 — ตั้งค่า Environment Variables
```bash
# คัดลอก template
cp .env.example .env.local

# แก้ไขค่าใน .env.local:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, ...
# - RESEND_API_KEY
```

### Step 4 — ตั้งค่า Supabase Database
```bash
# ไปที่ supabase.com → SQL Editor
# วาง supabase-schema.sql ทั้งหมด → Run
```

### Step 5 — รัน Dev Server
```bash
npm run dev
# เปิด http://localhost:3000
```

---

## 🌐 Deploy ไป Cloudflare Pages

### Method 1: Git Integration (แนะนำ)
```bash
# 1. Push code ไป GitHub
git init && git add . && git commit -m "Initial MigiJames"
git remote add origin https://github.com/YOUR_USERNAME/migijames
git push -u origin main

# 2. Cloudflare Dashboard → Pages → Connect GitHub
# 3. เลือก repo migijames
# 4. Build settings:
#    Framework: Next.js
#    Build command: npm run build
#    Output: .next
# 5. เพิ่ม Environment Variables ทั้งหมด
# 6. Deploy ✅
```

---

## 🛠️ Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend + Backend | Next.js 14 | Free |
| Database + Auth | Supabase | Free tier |
| Image Storage | Cloudflare R2 | Free 10GB |
| Hosting | Cloudflare Pages | Free |
| Email | Resend | Free 3k/month |
| Domain | migijames.com | ~฿680/year |
| **Total** | | **~฿680/year** |

---

## 📋 Development Phases

### Phase 1 (4-6 weeks) — Brand Presence
- [x] Hero section (Rolls-Royce inspired)
- [x] Collections / Portfolio
- [x] Contact form + Email notification
- [x] Mobile responsive
- [ ] CMS for content updates

### Phase 2 (6-8 weeks) — CRM & Client Portal
- [x] Customer database schema
- [ ] Admin dashboard
- [ ] Client login portal
- [ ] Bespoke order tracker
- [ ] Consultation history

### Phase 3 (ongoing) — AI & Growth
- [x] Astro-Gem matching engine
- [ ] AI-powered recommendations (Claude API)
- [ ] Workshop booking + payment
- [ ] Line OA integration
- [ ] Analytics dashboard

---

## 🎨 Design System

**Colors:** Dark Luxury palette
- `obsidian` #0a0806 — Background
- `gold` #c9a96e — Primary accent  
- `cream` #faf6f0 — Light sections
- `charcoal` #1a1612 — Dark sections

**Fonts:**
- Display: Playfair Display (serif)
- Body: Sarabun (Thai + Latin)

**Inspiration:** Rolls-Royce Black Badge — full-screen storytelling, scroll narrative, minimal copy, maximum impact

---

## 📞 Support

พัฒนาโดย **ครูเด่น มาสเตอร์ฟา**  
CAP Vision Institute | @denmasterfa  
capvisionpartner.com
