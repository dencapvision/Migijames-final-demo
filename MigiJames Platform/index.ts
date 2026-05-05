// ── MigiJames Domain Types ────────────────────────────────────

// Customer / CRM
export type VipTier = 'Regular' | 'VIP' | 'VVIP'
export type Element = 'ไฟ' | 'ดิน' | 'ลม' | 'น้ำ'

export interface Customer {
  id: string
  name: string
  phone?: string
  email?: string
  birthday?: string          // ISO date string
  birth_time?: string        // HH:mm
  birth_place?: string
  zodiac_sign?: string       // ราศีมกร, ราศีกุมภ์, ...
  element?: Element
  lucky_stones?: string[]    // ['เพชร', 'ไพลิน', 'มุก']
  lucky_colors?: string[]
  vip_tier: VipTier
  notes?: string
  avatar_url?: string
  created_at: string
  updated_at?: string
}

// Consultation / Booking
export type ConsultationType = 'online' | 'onsite' | 'workshop'
export type ConsultationStatus = 'pending' | 'confirmed' | 'done' | 'cancelled'

export interface Consultation {
  id: string
  customer_id: string
  customer?: Customer        // joined
  type: ConsultationType
  scheduled_at: string       // ISO datetime
  topic: string
  status: ConsultationStatus
  outcome_notes?: string
  created_at: string
}

// Product
export type JewelryCategory = 'แหวน' | 'สร้อยคอ' | 'ต่างหู' | 'กำไล' | 'จี้' | 'ชุดเครื่องประดับ'
export type StoneType = 'เพชร' | 'ทับทิม' | 'ไพลิน' | 'มรกต' | 'บุษราคัม' | 'อเมทิสต์' | 'มุก' | 'อื่นๆ'

export interface Product {
  id: string
  name: string
  category: JewelryCategory
  price: number
  stone_type: StoneType
  stone_weight?: number      // carats
  metal_type?: string        // ทอง 18K, แพลทินัม
  suitable_elements?: Element[]
  suitable_zodiacs?: string[]
  image_urls?: string[]      // Cloudflare R2 URLs
  is_bespoke: boolean
  story?: string             // Jewelry Story (สำหรับ brand storytelling)
  is_published: boolean
  created_at: string
}

// Astrology
export type ZodiacSign =
  | 'ราศีมกร' | 'ราศีกุมภ์' | 'ราศีมีน'
  | 'ราศีเมษ' | 'ราศีพฤษภ' | 'ราศีเมถุน'
  | 'ราศีกรกฎ' | 'ราศีสิงห์' | 'ราศีกันย์'
  | 'ราศีตุลย์' | 'ราศีพิจิก' | 'ราศีธนู'

export interface ZodiacProfile {
  sign: ZodiacSign
  element: Element
  ruling_planet: string
  lucky_stones: string[]
  lucky_colors: string[]
  lucky_numbers: number[]
  personality: string
  strengths: string[]
  gem_benefit: string
}

export interface AstroMatchResult {
  zodiac: ZodiacProfile
  recommended_stones: RecommendedStone[]
  personal_message: string
  suggested_jewelry?: Product[]
}

export interface RecommendedStone {
  name: string
  emoji: string
  benefit: string
  reason: string
  power_level: 1 | 2 | 3    // ⭐ rating
}

// Contact Form
export interface ContactFormData {
  name: string
  phone: string
  email?: string
  birthday?: string
  inquiry_type: 'ปรึกษาดวง' | 'สั่งทำพิเศษ' | 'ดูสินค้า' | 'Workshop'
  message: string
}

// Booking
export interface BookingFormData {
  customer_name: string
  phone: string
  email?: string
  consultation_type: ConsultationType
  preferred_date: string
  preferred_time: string
  topic: string
  birthday?: string
}

// API Responses
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}
