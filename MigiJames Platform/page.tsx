import { Metadata } from 'next'
import NavBar from '@/components/layout/NavBar'
import HeroSection from '@/components/sections/HeroSection'
import StorySection from '@/components/sections/StorySection'
import CollectionsSection from '@/components/sections/CollectionsSection'
import AstroMatchSection from '@/components/sections/AstroMatchSection'
import BespokeSection from '@/components/sections/BespokeSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import BookingSection from '@/components/sections/BookingSection'
import FooterSection from '@/components/layout/FooterSection'

export const metadata: Metadata = {
  title: 'MigiJames — เพชรที่เลือกคุณ ไม่ใช่คุณเลือกเพชร',
}

export default function HomePage() {
  return (
    <main>
      {/* Fixed Navigation */}
      <NavBar />

      {/* 1. Hero — Dark Luxury, Full screen, Rolls-Royce inspired */}
      <HeroSection />

      {/* 2. Brand Story — "ทำไม MigiJames ถึงต่างจากร้านเพชรทั่วไป" */}
      <StorySection />

      {/* 3. Collections — ผลงาน Bespoke ที่โดดเด่น */}
      <CollectionsSection />

      {/* 4. Astro-Gem Matching — Feature ที่ไม่มีร้านไหนมี */}
      <AstroMatchSection />

      {/* 5. Bespoke Journey — กระบวนการสั่งทำ */}
      <BespokeSection />

      {/* 6. Testimonials — เรื่องเล่าจากลูกค้าจริง */}
      <TestimonialsSection />

      {/* 7. Booking — จองนัดปรึกษา */}
      <BookingSection />

      {/* Footer */}
      <FooterSection />
    </main>
  )
}
