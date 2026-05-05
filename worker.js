// ══════════════════════════════════════════════════════════════
// MigiJames — Cloudflare Worker
// LINE Flex Message Proxy
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

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS })
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405, headers: CORS
      })
    }

    try {
      // ── รับข้อมูลจาก Form ──────────────────────────────────
      const data = await request.json()
      const { name, gmail, channel, contact, domain, phase, payment, branding, startDate, notes } = data

      // Validate
      if (!name || !gmail || !phase) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400, headers: CORS
        })
      }

      // ── สร้าง Flex Message ────────────────────────────────
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

          // Header — dark gold
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

          // Body
          body: {
            type: 'box',
            layout: 'vertical',
            backgroundColor: '#faf8f5',
            paddingAll: '20px',
            spacing: 'md',
            contents: [

              // Phase highlight
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

              // Info rows card
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

              // Notes (conditional)
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

          // Footer — action buttons
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

      // ── ส่งไป LINE API ────────────────────────────────────
      // Token เก็บใน Environment Variable — ไม่โผล่ใน code
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
        console.error('LINE API error:', err)
        return new Response(JSON.stringify({ error: 'LINE send failed', detail: err }), {
          status: 500, headers: CORS
        })
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers: CORS
      })

    } catch (err) {
      console.error('Worker error:', err)
      return new Response(JSON.stringify({ error: 'Internal error' }), {
        status: 500, headers: CORS
      })
    }
  }
}

// ── Helper functions ──────────────────────────────────────────
function row(icon, label, value) {
  return {
    type: 'box', layout: 'horizontal', spacing: 'sm',
    contents: [
      { type: 'text', text: icon, size: 'sm', flex: 0 },
      { type: 'text', text: label, color: '#b8a898', size: 'sm', flex: 2 },
      { type: 'text', text: String(value), color: '#1a1612', size: 'sm', flex: 4, wrap: true, align: 'end', weight: 'bold' },
    ],
  }
}

function sep() {
  return { type: 'separator', color: '#f0e8de', margin: 'sm' }
}
