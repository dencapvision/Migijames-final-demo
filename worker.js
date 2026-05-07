// ══════════════════════════════════════════════════════════════
// MigiJames — Cloudflare Worker
// LINE Flex Message Proxy + Supabase & D1 Storage
// Deploy ที่: workers.cloudflare.com
// ══════════════════════════════════════════════════════════════

export default {
  async fetch(request, env) {

    // ── CORS headers ─────────────────────────────────────────
    const CORS = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS })
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405, headers: CORS
      })
    }

    try {
      const data = await request.json()

      // ── ตรวจว่าเป็น Onboarding Form (projectName) หรือ Sales Form (name+phase) ──
      const isOnboarding = data.type === 'Onboarding' || !!data.projectName

      if (isOnboarding) {
        return await handleOnboarding(data, env, CORS)
      } else {
        return await handleSalesForm(data, env, CORS)
      }

    } catch (err) {
      console.error('Worker error:', err)
      return new Response(JSON.stringify({ error: 'Internal error' }), {
        status: 500, headers: CORS
      })
    }
  }
}

// ══════════════════════════════════════════════════════════════
// Handler: Onboarding Form (onboarding.html)
// Fields: projectName, gmail, mediaLink, mood, target, refs, items
// ══════════════════════════════════════════════════════════════
async function handleOnboarding(data, env, CORS) {
  const { projectName, gmail, mediaLink, mood, target, refs, items, itemsCount } = data

  if (!projectName || !gmail || !mediaLink) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400, headers: CORS
    })
  }

  const now = new Date().toLocaleString('th-TH', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  // ── สร้างรายการสินค้าสำหรับ Flex Message ──
  const itemLines = items ? items.split('\n').filter(Boolean) : []
  const itemContents = itemLines.length > 0
    ? itemLines.slice(0, 5).map(line => ({
        type: 'text',
        text: line,
        color: '#4a3f35',
        size: 'sm',
        wrap: true,
        margin: 'xs',
      }))
    : [{ type: 'text', text: 'ไม่มีรายการ', color: '#9a7a4a', size: 'sm' }]

  const flexMessage = {
    type: 'flex',
    altText: `📋 Onboarding ใหม่: ${projectName}`,
    contents: {
      type: 'bubble',
      size: 'giga',

      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#1a1612',
        paddingAll: '20px',
        contents: [
          {
            type: 'box', layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: '📋 Project Onboarding — MigiJames',
                color: '#c9a96e', size: 'sm', weight: 'bold', flex: 1,
              },
              {
                type: 'text', text: now,
                color: '#6b5d52', size: 'xxs',
                align: 'end', gravity: 'center',
              },
            ],
          },
          {
            type: 'text', text: projectName,
            color: '#ffffff', size: 'xxl',
            weight: 'bold', margin: 'sm',
          },
          {
            type: 'text', text: gmail,
            color: '#b8a898', size: 'sm', margin: 'xs',
          },
        ],
      },

      body: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#faf8f5',
        paddingAll: '20px',
        spacing: 'md',
        contents: [

          // Mood & Tone highlight
          {
            type: 'box', layout: 'horizontal',
            backgroundColor: '#1a1612',
            cornerRadius: '8px', paddingAll: '14px',
            contents: [
              { type: 'text', text: '🎨', size: 'md', flex: 0 },
              {
                type: 'box', layout: 'vertical', flex: 1, margin: 'sm',
                contents: [
                  { type: 'text', text: 'Mood & Tone', color: '#9a7a4a', size: 'xxs' },
                  { type: 'text', text: mood || 'ไม่ระบุ', color: '#c9a96e', size: 'sm', weight: 'bold', wrap: true },
                ],
              },
            ],
          },

          // Info card
          {
            type: 'box', layout: 'vertical',
            backgroundColor: '#ffffff',
            cornerRadius: '8px', paddingAll: '14px',
            spacing: 'sm',
            contents: [
              row('🎯', 'กลุ่มเป้าหมาย', target || 'ไม่ระบุ'),
              sep(),
              row('🔗', 'ลิงก์ไฟล์', mediaLink.length > 40 ? mediaLink.slice(0, 40) + '…' : mediaLink),
              ...(refs ? [sep(), row('📌', 'References', refs)] : []),
            ],
          },

          // Products / Services
          {
            type: 'box', layout: 'vertical',
            backgroundColor: '#f5ede0',
            cornerRadius: '8px', paddingAll: '14px',
            contents: [
              {
                type: 'text',
                text: `📦 สินค้า/บริการ (${itemsCount || itemLines.length} รายการ)`,
                color: '#9a7a4a', size: 'xxs', weight: 'bold', margin: 'none',
              },
              ...itemContents,
              ...(itemLines.length > 5 ? [{
                type: 'text',
                text: `… และอีก ${itemLines.length - 5} รายการ`,
                color: '#b8a898', size: 'xs', margin: 'xs',
              }] : []),
            ],
          },

        ],
      },

      footer: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#1a1612',
        paddingAll: '16px',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#c9a96e',
            height: 'sm',
            action: {
              type: 'uri',
              label: '📁 ดูไฟล์ของลูกค้า',
              uri: mediaLink,
            },
          },
          {
            type: 'button',
            style: 'secondary',
            height: 'sm',
            action: {
              type: 'uri',
              label: '🔮 ดู Demo MigiJames',
              uri: 'https://dencapvision.github.io/Migijames-final-demo/',
            },
          },
        ],
      },
    },
  }

  // ── ส่งไป LINE API (non-fatal) ──
  try {
    const lineRes = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.LINE_TOKEN}`,
      },
      body: JSON.stringify({
        to: env.LINE_USER_ID,
        messages: [flexMessage],
      }),
    })
    if (!lineRes.ok) {
      const err = await lineRes.text()
      console.error('[MigiJames] LINE API error (onboarding):', err)
    } else {
      console.log('[MigiJames] LINE notify OK (onboarding)')
    }
  } catch (lineErr) {
    console.error('[MigiJames] LINE fetch error:', lineErr.message)
  }

  // ── บันทึกข้อมูล ──
  const submissionId = crypto.randomUUID()
  const submittedAt = new Date().toISOString()
  const projectId = `MJ-${Date.now()}`

  if (env.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO onboarding_submissions
          (id, created_at, source, project_id, biz_name_th, biz_name_en, contact_email, contact_phone, contact_line, phases, style, launch_date, full_data)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        submissionId, submittedAt, 'migijames-onboarding', projectId,
        projectName, '', gmail, '', '',
        itemsCount ? String(itemsCount) : '',
        mood || '',
        '',
        JSON.stringify(data)
      ).run()
      console.log('[MigiJames] D1 save OK:', submissionId)
    } catch (d1Err) {
      console.error('[MigiJames] D1 save error:', d1Err.message)
    }
  }

  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
    try {
      const sbRes = await fetch(`${env.SUPABASE_URL}/rest/v1/onboarding_briefs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          project_id: projectId,
          biz_name_th: projectName,
          biz_name_en: '',
          contact_email: gmail,
          contact_phone: '',
          contact_line: '',
          phases: itemsCount ? String(itemsCount) : '',
          style: mood || '',
          launch_date: '',
          source: 'migijames-onboarding',
          full_data: data,
        }),
      })
      if (!sbRes.ok) {
        console.error('[MigiJames] Supabase save error:', await sbRes.text())
      } else {
        console.log('[MigiJames] Supabase save OK')
      }
    } catch (sbErr) {
      console.error('[MigiJames] Supabase save error:', sbErr.message)
    }
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200, headers: CORS
  })
}

// ══════════════════════════════════════════════════════════════
// Handler: Sales / Order Form (form.html)
// Fields: name, gmail, channel, contact, domain, phase, payment, branding, startDate, notes
// ══════════════════════════════════════════════════════════════
async function handleSalesForm(data, env, CORS) {
  const { name, gmail, channel, contact, domain, phase, payment, branding, startDate, notes } = data

  if (!name || !gmail || !phase) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400, headers: CORS
    })
  }

  const now = new Date().toLocaleString('th-TH', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  const flexMessage = {
    type: 'flex',
    altText: `🔮 ลูกค้าใหม่ MigiJames: ${name}`,
    contents: {
      type: 'bubble',
      size: 'giga',

      header: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#1a1612',
        paddingAll: '20px',
        contents: [
          {
            type: 'box', layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: '🔮 ลูกค้าใหม่ MigiJames',
                color: '#c9a96e', size: 'sm', weight: 'bold', flex: 1,
              },
              {
                type: 'text', text: now,
                color: '#6b5d52', size: 'xxs',
                align: 'end', gravity: 'center',
              },
            ],
          },
          {
            type: 'text', text: name,
            color: '#ffffff', size: 'xxl',
            weight: 'bold', margin: 'sm',
          },
          {
            type: 'text', text: gmail,
            color: '#b8a898', size: 'sm', margin: 'xs',
          },
        ],
      },

      body: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#faf8f5',
        paddingAll: '20px',
        spacing: 'md',
        contents: [
          {
            type: 'box', layout: 'horizontal',
            backgroundColor: '#1a1612',
            cornerRadius: '8px', paddingAll: '14px',
            contents: [
              { type: 'text', text: '📦', size: 'md', flex: 0 },
              {
                type: 'box', layout: 'vertical', flex: 1, margin: 'sm',
                contents: [
                  { type: 'text', text: 'แพ็กเกจที่เลือก', color: '#9a7a4a', size: 'xxs' },
                  { type: 'text', text: phase, color: '#c9a96e', size: 'sm', weight: 'bold', wrap: true },
                ],
              },
            ],
          },
          {
            type: 'box', layout: 'vertical',
            backgroundColor: '#ffffff',
            cornerRadius: '8px', paddingAll: '14px',
            spacing: 'sm',
            contents: [
              row('🌐', 'โดเมน', domain),
              sep(),
              row('💳', 'ชำระเงิน', payment),
              sep(),
              row(channel === 'LINE' ? '💬' : '📱', 'ติดต่อ', `${channel}: ${contact}`),
              sep(),
              row('🎨', 'Logo/Brand', branding || 'ไม่ระบุ'),
              sep(),
              row('📅', 'เริ่มงาน', startDate || 'ไม่ระบุ'),
            ],
          },
          ...(notes ? [{
            type: 'box', layout: 'vertical',
            backgroundColor: '#f5ede0',
            cornerRadius: '8px', paddingAll: '12px',
            contents: [
              { type: 'text', text: '📝 หมายเหตุ', color: '#9a7a4a', size: 'xxs', weight: 'bold' },
              { type: 'text', text: notes, color: '#6b5d52', size: 'sm', wrap: true, margin: 'xs' },
            ],
          }] : []),
        ],
      },

      footer: {
        type: 'box',
        layout: 'vertical',
        backgroundColor: '#1a1612',
        paddingAll: '16px',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'primary',
            color: '#c9a96e',
            height: 'sm',
            action: {
              type: 'uri',
              label: '📞 ติดต่อลูกค้า',
              uri: channel === 'LINE'
                ? `https://line.me/ti/p/${contact.replace('@', '')}`
                : `tel:${contact}`,
            },
          },
          {
            type: 'button',
            style: 'secondary',
            height: 'sm',
            action: {
              type: 'uri',
              label: '🔮 ดู Demo MigiJames',
              uri: 'https://dencapvision.github.io/Migijames-final-demo/',
            },
          },
        ],
      },
    },
  }

  try {
    const lineRes = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.LINE_TOKEN}`,
      },
      body: JSON.stringify({
        to: env.LINE_USER_ID,
        messages: [flexMessage],
      }),
    })
    if (!lineRes.ok) {
      const err = await lineRes.text()
      console.error('[MigiJames] LINE API error (sales):', err)
    } else {
      console.log('[MigiJames] LINE notify OK (sales)')
    }
  } catch (lineErr) {
    console.error('[MigiJames] LINE fetch error:', lineErr.message)
  }

  const submissionId = crypto.randomUUID()
  const submittedAt = new Date().toISOString()
  const projectId = `MJ-${Date.now()}`

  if (env.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO onboarding_submissions
          (id, created_at, source, project_id, biz_name_th, biz_name_en, contact_email, contact_phone, contact_line, phases, style, launch_date, full_data)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        submissionId, submittedAt, 'migijames', projectId,
        name, domain || '', gmail,
        channel !== 'LINE' ? (contact || '') : '',
        channel === 'LINE' ? (contact || '') : '',
        phase, branding || '', startDate || '',
        JSON.stringify(data)
      ).run()
      console.log('[MigiJames] D1 save OK:', submissionId)
    } catch (d1Err) {
      console.error('[MigiJames] D1 save error:', d1Err.message)
    }
  }

  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
    try {
      const sbRes = await fetch(`${env.SUPABASE_URL}/rest/v1/onboarding_briefs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          project_id: projectId,
          biz_name_th: name,
          biz_name_en: domain || '',
          contact_email: gmail,
          contact_phone: channel !== 'LINE' ? (contact || '') : '',
          contact_line: channel === 'LINE' ? (contact || '') : '',
          phases: phase,
          style: branding || '',
          launch_date: startDate || '',
          source: 'migijames',
          full_data: data,
        }),
      })
      if (!sbRes.ok) {
        console.error('[MigiJames] Supabase save error:', await sbRes.text())
      } else {
        console.log('[MigiJames] Supabase save OK')
      }
    } catch (sbErr) {
      console.error('[MigiJames] Supabase save error:', sbErr.message)
    }
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200, headers: CORS
  })
}

// ── Helper functions ──────────────────────────────────────────
function row(icon, label, value) {
  return {
    type: 'box', layout: 'horizontal', spacing: 'sm',
    contents: [
      { type: 'text', text: icon, size: 'sm', flex: 0 },
      { type: 'text', text: label, color: '#b8a898', size: 'sm', flex: 2 },
      { type: 'text', text: String(value || 'ไม่ระบุ'), color: '#1a1612', size: 'sm', flex: 4, wrap: true, align: 'end', weight: 'bold' },
    ],
  }
}

function sep() {
  return { type: 'separator', color: '#f0e8de', margin: 'sm' }
}
