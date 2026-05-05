import type { Metadata } from 'next'
import { Playfair_Display, Sarabun, Libre_Baskerville } from 'next/font/google'
import './globals.css'

// ── Fonts ──────────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['200', '300', '400', '500'],
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
  weight: ['400'],
  style: ['italic'],
})

// ── Metadata ───────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'MigiJames — Jewelry Story Telling',
    template: '%s | MigiJames',
  },
  description:
    'ไม่ใช่แค่ขายเครื่องประดับ — เราออกแบบพลังงานเฉพาะบุคคลผ่านศาสตร์อัญมณีและพื้นดวงชะตา',
  keywords: ['เครื่องประดับ', 'เพชร', 'แหวนเพชร', 'พื้นดวง', 'อัญมณีมงคล', 'MigiJames'],
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    siteName: 'MigiJames',
  },
}

// ── Layout ─────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="th"
      className={`${playfair.variable} ${sarabun.variable} ${libreBaskerville.variable}`}
    >
      <body className="bg-obsidian font-body antialiased">
        {children}
      </body>
    </html>
  )
}
