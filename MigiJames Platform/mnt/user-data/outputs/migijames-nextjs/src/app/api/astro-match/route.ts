import { NextRequest, NextResponse } from 'next/server'
import { buildAstroMatchResult } from '@/lib/astro'

export async function POST(request: NextRequest) {
  try {
    const { birthdate, purpose } = await request.json()

    if (!birthdate || !purpose) {
      return NextResponse.json({ error: 'กรุณาระบุวันเกิดและวัตถุประสงค์' }, { status: 400 })
    }

    const date = new Date(birthdate)
    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: 'รูปแบบวันที่ไม่ถูกต้อง' }, { status: 400 })
    }

    const result = buildAstroMatchResult(date, purpose)

    return NextResponse.json({ data: result })

  } catch (error) {
    console.error('Astro match API error:', error)
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 })
  }
}
