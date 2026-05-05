'use client'
import { useState } from 'react'
import { buildAstroMatchResult } from '@/lib/astro'
import type { AstroMatchResult } from '@/types'

type Purpose = 'money' | 'love' | 'health' | 'power'

const PURPOSES: { value: Purpose; label: string; icon: string }[] = [
  { value: 'money',  label: 'เสริมการเงิน',  icon: '✦' },
  { value: 'love',   label: 'เสริมความรัก',  icon: '♡' },
  { value: 'health', label: 'เสริมสุขภาพ',   icon: '◈' },
  { value: 'power',  label: 'เสริมอำนาจ',    icon: '◆' },
]

export default function AstroMatchSection() {
  const [birthdate, setBirthdate] = useState('')
  const [purpose, setPurpose] = useState<Purpose>('money')
  const [result, setResult] = useState<AstroMatchResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = () => {
    if (!birthdate) return
    setLoading(true)
    setTimeout(() => {
      const date = new Date(birthdate)
      const res = buildAstroMatchResult(date, purpose)
      setResult(res)
      setLoading(false)
    }, 800)
  }

  return (
    <section id="astro" className="bg-charcoal py-24 md:py-32 px-8">
      <div className="section-inner">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
          <div>
            <div className="text-eyebrow flex items-center gap-3 mb-5">
              <span className="divider-gold" />
              Feature พิเศษเฉพาะ MigiJames
            </div>
            <h2 className="font-display text-display-md text-white font-light leading-tight mb-6">
              อัญมณีที่<br />
              <em className="text-gold not-italic">ถูกดวง</em><br />
              กับคุณ
            </h2>
            <p className="font-body text-[13px] text-white/40 leading-relaxed font-light max-w-sm">
              กรอกวันเกิด ระบบจะวิเคราะห์ราศี ธาตุ และแนะนำอัญมณีที่เสริมพลังงานตรงกับดวงชะตาของคุณโดยเฉพาะ
            </p>
            <p className="font-body text-[12px] text-white/25 mt-4 leading-relaxed">
              นี่คือสิ่งที่ทำให้ MigiJames แตกต่างอย่างสิ้นเชิง — ทุกชิ้นงานออกแบบจากพื้นดวงของคุณ ไม่ใช่แค่ความสวยงาม
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { n: '12', label: 'ราศี', sub: 'ครอบคลุมทุกราศี' },
              { n: '4',  label: 'ธาตุ', sub: 'ไฟ ดิน ลม น้ำ' },
              { n: '30+', label: 'อัญมณี', sub: 'อัญมณีมงคลในระบบ' },
              { n: '∞',  label: 'Bespoke', sub: 'ออกแบบไม่มีสิ้นสุด' },
            ].map(s => (
              <div key={s.label} className="card-luxury p-5 text-center">
                <div className="font-display text-2xl text-gold font-light">{s.n}</div>
                <div className="font-body text-[10px] tracking-[0.2em] text-white/60 uppercase mt-1">
                  {s.label}
                </div>
                <div className="font-body text-[9px] text-white/25 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive analyzer */}
        <div className="border border-gold/15 relative overflow-hidden">
          {/* Top gold line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <span className="font-body text-[10px] tracking-ultra uppercase text-gold/70">
                ✦ &nbsp; Astro-Gem Matching &nbsp; ✦
              </span>
            </div>

            {/* Form */}
            <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto mb-8">
              <div>
                <label className="block font-body text-[9px] tracking-[0.3em] uppercase text-white/30 mb-2">
                  วันเกิด
                </label>
                <input
                  type="date"
                  value={birthdate}
                  onChange={e => setBirthdate(e.target.value)}
                  className="input-luxury"
                />
              </div>
              <div>
                <label className="block font-body text-[9px] tracking-[0.3em] uppercase text-white/30 mb-2">
                  วัตถุประสงค์
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PURPOSES.map(p => (
                    <button
                      key={p.value}
                      onClick={() => setPurpose(p.value)}
                      className={`
                        font-body text-[9px] tracking-[0.15em] uppercase
                        py-2.5 px-3 border transition-all duration-300
                        ${purpose === p.value
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-white/10 text-white/30 hover:border-white/30 hover:text-white/50'
                        }
                      `}
                    >
                      {p.icon} {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mb-10">
              <button
                onClick={handleAnalyze}
                disabled={!birthdate || loading}
                className={`
                  btn-gold min-w-[240px]
                  disabled:opacity-40 disabled:cursor-not-allowed
                  ${loading ? 'animate-pulse' : ''}
                `}
              >
                {loading ? '🔮 กำลังวิเคราะห์...' : '🔮 วิเคราะห์ดวงและแนะนำอัญมณี'}
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="border-t border-gold/10 pt-10 animate-fade-in">
                {/* Zodiac header */}
                <div className="text-center mb-8">
                  <div className="font-display text-3xl text-white font-light mb-2">
                    {result.zodiac.sign}
                  </div>
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <span className="font-body text-[10px] tracking-[0.25em] uppercase text-gold">
                      ธาตุ{result.zodiac.element}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gold/40" />
                    <span className="font-body text-[10px] tracking-[0.25em] uppercase text-white/30">
                      ดาวประจำตัว: {result.zodiac.ruling_planet}
                    </span>
                  </div>
                  <p className="font-body text-[12px] text-white/30 italic">
                    {result.zodiac.personality}
                  </p>
                </div>

                {/* Recommended stones */}
                <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-8">
                  {result.recommended_stones.map((stone, i) => (
                    <div
                      key={stone.name}
                      className={`card-luxury p-5 text-center cursor-pointer
                        ${i === 0 ? 'border-gold/30' : ''}`}
                    >
                      <div className="text-3xl mb-3">{stone.emoji}</div>
                      <div className="font-display text-sm text-white font-light mb-1">
                        {stone.name}
                      </div>
                      <div className="font-body text-[9px] text-white/30 leading-relaxed">
                        {stone.benefit}
                      </div>
                      {/* Power level */}
                      <div className="flex justify-center gap-1 mt-2">
                        {Array.from({ length: 3 }).map((_, j) => (
                          <span
                            key={j}
                            className={`w-1 h-1 rounded-full
                              ${j < stone.power_level ? 'bg-gold' : 'bg-white/10'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Personal message */}
                <div className="border border-gold/15 bg-gold/[0.03] p-6 text-center max-w-xl mx-auto">
                  <p className="font-display text-base text-gold-light italic leading-relaxed mb-5">
                    "{result.personal_message}"
                  </p>
                  <a href="#booking" className="btn-gold inline-block">
                    นัดปรึกษาเพิ่มเติมกับ MigiJames
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
