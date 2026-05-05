'use client'
import { useEffect, useState } from 'react'

// Floating gem particles
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${8 + (i * 5.2) % 84}%`,
  delay: `${i * 0.7}s`,
  duration: `${11 + (i % 5) * 3}s`,
  size: i % 4 === 0 ? 'w-2 h-2' : 'w-1 h-1',
  opacity: i % 3 === 0 ? 'opacity-40' : 'opacity-20',
}))

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian"
    >
      {/* ── Atmospheric backgrounds ── */}
      <div className="absolute inset-0">
        {/* Deep radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-5%,rgba(201,169,110,0.13),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_20%_70%,rgba(139,107,166,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_40%_at_80%_60%,rgba(42,107,90,0.05),transparent)]" />

        {/* Diamond wireframe - subtle background graphic */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035]">
          <svg viewBox="0 0 500 500" className="w-[700px] h-[700px]">
            <polygon points="250,30 470,180 400,470 100,470 30,180"
              fill="none" stroke="#c9a96e" strokeWidth="0.6" />
            <polygon points="250,30 470,180 250,250"
              fill="none" stroke="#c9a96e" strokeWidth="0.3" />
            <polygon points="250,30 30,180 250,250"
              fill="none" stroke="#c9a96e" strokeWidth="0.3" />
            <polygon points="250,250 470,180 400,470"
              fill="none" stroke="#c9a96e" strokeWidth="0.3" />
            <polygon points="250,250 30,180 100,470"
              fill="none" stroke="#c9a96e" strokeWidth="0.3" />
            <polygon points="250,250 400,470 100,470"
              fill="none" stroke="#c9a96e" strokeWidth="0.3" />
            <line x1="250" y1="30" x2="250" y2="470"
              stroke="#c9a96e" strokeWidth="0.2" />
            <line x1="30" y1="180" x2="470" y2="180"
              stroke="#c9a96e" strokeWidth="0.2" />
            <circle cx="250" cy="250" r="160"
              fill="none" stroke="#c9a96e" strokeWidth="0.3" />
            <circle cx="250" cy="250" r="80"
              fill="none" stroke="#c9a96e" strokeWidth="0.2" />
          </svg>
        </div>

        {/* Diagonal pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #c9a96e 0, #c9a96e 1px, transparent 0, transparent 50%)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* ── Floating gem particles ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className={`gem-particle ${p.size} ${p.opacity}`}
          style={{
            left: p.left,
            bottom: '-20px',
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* ── Hero Content ── */}
      <div
        className={`
          relative z-10 text-center px-8
          transition-all duration-[1400ms] ease-out
          ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {/* Eyebrow */}
        <div className="text-eyebrow flex items-center justify-center gap-4 mb-10">
          <span className="w-10 h-px bg-gold/50" />
          Jewelry Story Telling · Since 2018
          <span className="w-10 h-px bg-gold/50" />
        </div>

        {/* Main headline */}
        <h1 className="text-display font-display text-white mb-4">
          <span className="block text-display-xl">
            <em className="text-gold not-italic">Migi</em>James
          </span>
        </h1>

        {/* Subheadline */}
        <p className="font-display text-display-sm text-white/35 italic font-light mb-6 tracking-wide">
          เพชรที่เลือกคุณ — ไม่ใช่คุณเลือกเพชร
        </p>

        {/* Descriptor */}
        <p className="font-body text-[13px] text-white/35 tracking-[0.18em] max-w-[440px] mx-auto mb-14 leading-[2.2] font-light">
          เราไม่ได้ขายเครื่องประดับ<br />
          เราออกแบบพลังงานเฉพาะบุคคล<br />
          ผ่านศาสตร์อัญมณีและพื้นดวงชะตา
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#astro" className="btn-gold">
            วิเคราะห์ดวงฟรี
          </a>
          <a href="#collections" className="btn-outline-light">
            ชม Collection
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-8 mt-16">
          {[
            { value: '500+', label: 'ชิ้นงาน Bespoke' },
            { value: '7+',   label: 'ปีประสบการณ์' },
            { value: '100%', label: 'ออกแบบเฉพาะบุคคล' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <div className="font-display text-xl text-gold font-light">{item.value}</div>
              <div className="font-body text-[9px] tracking-[0.2em] uppercase text-white/25 mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
        <span className="font-body text-[8px] tracking-[0.4em] text-white uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent animate-pulse-slow" />
      </div>
    </section>
  )
}
