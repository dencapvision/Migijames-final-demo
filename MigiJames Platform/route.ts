import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { Resend } from 'resend'
import type { ContactFormData } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // ── Validate ──────────────────────────────────
    if (!body.name || !body.phone || !body.inquiry_type) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
        { status: 400 }
      )
    }

    // ── Save to Supabase ──────────────────────────
    const supabase = createServerSupabase()

    const { error: dbError } = await supabase
      .from('contact_inquiries')
      .insert({
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        birthday: body.birthday || null,
        inquiry_type: body.inquiry_type,
        message: body.message,
        status: 'new',
      })

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json({ error: 'บันทึกข้อมูลไม่สำเร็จ' }, { status: 500 })
    }

    // ── Send notification email to MigiJames ─────
    await resend.emails.send({
      from: 'MigiJames System <noreply@migijames.com>',
      to: ['migi@migijames.com'],  // เปลี่ยนเป็น email จริง
      subject: `[MigiJames] ลูกค้าใหม่: ${body.name} — ${body.inquiry_type}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #1a1612; color: #faf6f0;">
          <h2 style="color: #c9a96e; font-weight: 400; margin-bottom: 24px;">✦ ลูกค้าใหม่ต้องการปรึกษา</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #b8a898; font-size: 12px;">ชื่อ</td><td style="padding: 8px 0;">${body.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #b8a898; font-size: 12px;">โทรศัพท์</td><td style="padding: 8px 0;">${body.phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #b8a898; font-size: 12px;">อีเมล</td><td style="padding: 8px 0;">${body.email || '-'}</td></tr>
            <tr><td style="padding: 8px 0; color: #b8a898; font-size: 12px;">วันเกิด</td><td style="padding: 8px 0;">${body.birthday || '-'}</td></tr>
            <tr><td style="padding: 8px 0; color: #b8a898; font-size: 12px;">ประเภท</td><td style="padding: 8px 0; color: #c9a96e;">${body.inquiry_type}</td></tr>
            <tr><td style="padding: 8px 0; color: #b8a898; font-size: 12px; vertical-align: top;">ข้อความ</td><td style="padding: 8px 0;">${body.message}</td></tr>
          </table>
        </div>
      `,
    })

    // ── Send confirmation to customer ─────────────
    if (body.email) {
      await resend.emails.send({
        from: 'MigiJames <hello@migijames.com>',
        to: [body.email],
        subject: 'ได้รับข้อความของคุณแล้ว — MigiJames',
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #1a1612; color: #faf6f0;">
            <h2 style="color: #c9a96e; font-weight: 400;">ขอบคุณ ${body.name}</h2>
            <p style="color: #b8a898; line-height: 1.8;">ได้รับข้อความของคุณเรียบร้อยแล้ว เราจะติดต่อกลับภายใน 24 ชั่วโมง</p>
            <p style="color: #6b5d52; font-size: 12px; margin-top: 32px;">MigiJames — Jewelry Story Telling</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ message: 'ส่งข้อความสำเร็จ' })

  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' }, { status: 500 })
  }
}
