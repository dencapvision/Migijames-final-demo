'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'Collections', href: '#collections' },
  { label: 'Bespoke',     href: '#bespoke' },
  { label: 'Astro Match', href: '#astro' },
  { label: 'Story',       href: '#story' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-700
        ${scrolled
          ? 'bg-obsidian/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'py-6'
        }
      `}
    >
      <div className="section-inner px-8 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-display text-2xl tracking-[0.05em] text-white font-light
                           group-hover:text-gold transition-colors duration-300">
            <em className="text-gold not-italic">Migi</em>James
          </span>
          <span className="font-body text-[8px] tracking-[0.4em] text-white/30 uppercase mt-0.5">
            Jewelry Story Telling
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-body text-[10px] tracking-[0.25em] uppercase
                           text-white/40 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#astro"
            className="font-body text-[10px] tracking-[0.25em] uppercase
                       text-gold/70 hover:text-gold transition-colors duration-300"
          >
            วิเคราะห์ดวงฟรี
          </a>
          <a
            href="#booking"
            className="btn-gold"
          >
            นัดปรึกษา
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/60 hover:text-white transition-colors p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="เปิดเมนู"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-px bg-current transition-all duration-300 origin-center
                             ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-4 h-px bg-current transition-all duration-300
                             ${menuOpen ? 'opacity-0 w-0' : ''}`} />
            <span className={`block w-6 h-px bg-current transition-all duration-300 origin-center
                             ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-obsidian/95 border-t border-white/5 px-8 py-8 space-y-6">
          {NAV_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block font-body text-[11px] tracking-[0.3em] uppercase text-white/50
                         hover:text-gold transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="block btn-gold text-center mt-4"
          >
            นัดปรึกษา
          </a>
        </div>
      )}
    </nav>
  )
}
