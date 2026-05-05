import type { ZodiacSign, ZodiacProfile, Element, AstroMatchResult, RecommendedStone } from '@/types'

// ── Zodiac Database ──────────────────────────────────────────
export const ZODIAC_DATA: ZodiacProfile[] = [
  {
    sign: 'ราศีเมษ', element: 'ไฟ', ruling_planet: 'ดาวอังคาร',
    lucky_stones: ['ทับทิม', 'การ์เนต', 'เพชร'],
    lucky_colors: ['แดง', 'ทอง', 'ส้ม'], lucky_numbers: [1, 9],
    personality: 'กล้าหาญ มีภาวะผู้นำ ชอบความท้าทาย',
    strengths: ['ความกล้า', 'พลังงาน', 'ความมุ่งมั่น'],
    gem_benefit: 'ทับทิมเสริมพลังอำนาจและความกล้าหาญ ดึงดูดโชคลาภและความสำเร็จ',
  },
  {
    sign: 'ราศีพฤษภ', element: 'ดิน', ruling_planet: 'ดาวศุกร์',
    lucky_stones: ['มรกต', 'โรสควอตซ์', 'บุษราคัม'],
    lucky_colors: ['เขียว', 'ชมพู', 'ครีม'], lucky_numbers: [2, 6],
    personality: 'มั่นคง อดทน รักความงาม ซื่อสัตย์',
    strengths: ['ความมั่นคง', 'ความอดทน', 'รสนิยมดี'],
    gem_benefit: 'มรกตเสริมความมั่งคั่งและความรัก ดึงดูดพลังงานบวกและความสมบูรณ์',
  },
  {
    sign: 'ราศีเมถุน', element: 'ลม', ruling_planet: 'ดาวพุธ',
    lucky_stones: ['มรกต', 'ซิทริน', 'มุก'],
    lucky_colors: ['เหลือง', 'เขียวอ่อน', 'เงิน'], lucky_numbers: [3, 5],
    personality: 'ฉลาด พูดเก่ง ปรับตัวได้ดี คิดเร็ว',
    strengths: ['สติปัญญา', 'การสื่อสาร', 'ความยืดหยุ่น'],
    gem_benefit: 'ซิทรินเสริมความคิดสร้างสรรค์และการสื่อสาร ดึงดูดโอกาสใหม่',
  },
  {
    sign: 'ราศีกรกฎ', element: 'น้ำ', ruling_planet: 'ดวงจันทร์',
    lucky_stones: ['มุก', 'มูนสโตน', 'ไพลิน'],
    lucky_colors: ['ขาว', 'เงิน', 'น้ำเงินอ่อน'], lucky_numbers: [2, 7],
    personality: 'อ่อนโยน ใส่ใจผู้อื่น รักครอบครัว สัญชาตญาณดี',
    strengths: ['ความเมตตา', 'สัญชาตญาณ', 'ความรัก'],
    gem_benefit: 'มุกเสริมพลังงานแห่งความรักและครอบครัว เพิ่มความอ่อนโยนและเสน่ห์',
  },
  {
    sign: 'ราศีสิงห์', element: 'ไฟ', ruling_planet: 'ดวงอาทิตย์',
    lucky_stones: ['บุษราคัม', 'เพชร', 'ทับทิม'],
    lucky_colors: ['ทอง', 'ส้ม', 'เหลือง'], lucky_numbers: [1, 4],
    personality: 'มั่นใจ ใจกว้าง ชอบเป็นศูนย์กลาง มีเสน่ห์',
    strengths: ['ความมั่นใจ', 'ความเป็นผู้นำ', 'ความเอื้อเฟื้อ'],
    gem_benefit: 'บุษราคัมเสริมอำนาจและชื่อเสียง ดึงดูดความสำเร็จและการยอมรับ',
  },
  {
    sign: 'ราศีกันย์', element: 'ดิน', ruling_planet: 'ดาวพุธ',
    lucky_stones: ['มรกต', 'ไพลิน', 'มุก'],
    lucky_colors: ['เขียว', 'น้ำตาล', 'ครีม'], lucky_numbers: [5, 6],
    personality: 'ละเอียด วิเคราะห์เก่ง ขยัน ใส่ใจสุขภาพ',
    strengths: ['ความละเอียด', 'การวิเคราะห์', 'ความรับผิดชอบ'],
    gem_benefit: 'มรกตเสริมสุขภาพและความคิดวิเคราะห์ ดึงดูดพลังงานสมดุล',
  },
  {
    sign: 'ราศีตุลย์', element: 'ลม', ruling_planet: 'ดาวศุกร์',
    lucky_stones: ['โอปอล', 'โรสควอตซ์', 'ไพลิน'],
    lucky_colors: ['ชมพู', 'ฟ้าอ่อน', 'ขาว'], lucky_numbers: [6, 9],
    personality: 'ชอบความสมดุล รักความงาม มีความยุติธรรม เข้าสังคมเก่ง',
    strengths: ['ความสมดุล', 'ความงาม', 'การทูต'],
    gem_benefit: 'โอปอลเสริมความสัมพันธ์และความรัก ดึงดูดความสงบและความสุข',
  },
  {
    sign: 'ราศีพิจิก', element: 'น้ำ', ruling_planet: 'ดาวอังคาร / พลูโต',
    lucky_stones: ['ทับทิม', 'ออนิกซ์ดำ', 'การ์เนต'],
    lucky_colors: ['แดงเข้ม', 'ดำ', 'เลือดหมู'], lucky_numbers: [8, 9],
    personality: 'เข้มแข็ง ลึกซึ้ง มีพลังแฝง เด็ดเดี่ยว',
    strengths: ['ความเข้มแข็ง', 'การเปลี่ยนแปลง', 'อำนาจ'],
    gem_benefit: 'ทับทิมเสริมพลังและอำนาจ ปกป้องจากพลังงานลบและเสริมความกล้า',
  },
  {
    sign: 'ราศีธนู', element: 'ไฟ', ruling_planet: 'ดาวพฤหัส',
    lucky_stones: ['ลาพิสลาซูลี', 'บุษราคัม', 'เทอร์คอยส์'],
    lucky_colors: ['น้ำเงิน', 'ม่วง', 'ทอง'], lucky_numbers: [3, 9],
    personality: 'ผจญภัย มองโลกกว้าง ชอบอิสระ มีปรัชญา',
    strengths: ['ความกล้าหาญ', 'ภูมิปัญญา', 'โชคลาภ'],
    gem_benefit: 'บุษราคัมเสริมโชคลาภและภูมิปัญญา ดึงดูดโอกาสและการขยายตัว',
  },
  {
    sign: 'ราศีมกร', element: 'ดิน', ruling_planet: 'ดาวเสาร์',
    lucky_stones: ['เพชร', 'ออนิกซ์ดำ', 'การ์เนต'],
    lucky_colors: ['ดำ', 'เทา', 'น้ำตาลเข้ม'], lucky_numbers: [4, 8],
    personality: 'อดทน มุ่งมั่น มีวินัย รักความสำเร็จ',
    strengths: ['ความมั่นคง', 'ความอดทน', 'ความสำเร็จ'],
    gem_benefit: 'เพชรเสริมความแข็งแกร่งและความสำเร็จ ดึงดูดความมั่งคั่งระยะยาว',
  },
  {
    sign: 'ราศีกุมภ์', element: 'ลม', ruling_planet: 'ดาวยูเรนัส',
    lucky_stones: ['อเมทิสต์', 'ลาพิสลาซูลี', 'ไพลิน'],
    lucky_colors: ['น้ำเงิน', 'ม่วง', 'ฟ้า'], lucky_numbers: [4, 7],
    personality: 'ความคิดก้าวหน้า สร้างสรรค์ มีอุดมการณ์ ชอบความแปลกใหม่',
    strengths: ['ความคิดสร้างสรรค์', 'สัญชาตญาณ', 'นวัตกรรม'],
    gem_benefit: 'อเมทิสต์เสริมสัญชาตญาณและความคิดสร้างสรรค์ เปิดจิตวิญญาณ',
  },
  {
    sign: 'ราศีมีน', element: 'น้ำ', ruling_planet: 'ดาวเนปจูน',
    lucky_stones: ['อความารีน', 'ไพลิน', 'มุก'],
    lucky_colors: ['ฟ้าทะเล', 'เขียวทะเล', 'ขาว'], lucky_numbers: [3, 7],
    personality: 'อ่อนโยน ฝันหวาน มีจิตวิญญาณ เห็นอกเห็นใจ',
    strengths: ['ความเมตตา', 'จิตวิญญาณ', 'ความรัก'],
    gem_benefit: 'อความารีนเสริมความสงบและจิตวิญญาณ ดึงดูดพลังงานบริสุทธิ์',
  },
]

// ── Zodiac Calculator ────────────────────────────────────────
export function getZodiacFromBirthdate(birthdate: Date): ZodiacProfile {
  const month = birthdate.getMonth() + 1
  const day = birthdate.getDate()

  const boundaries: [ZodiacSign, number, number][] = [
    ['ราศีมกร',  12, 22], ['ราศีกุมภ์',  1, 20],
    ['ราศีมีน',   2, 19], ['ราศีเมษ',    3, 21],
    ['ราศีพฤษภ', 4, 20],  ['ราศีเมถุน',  5, 21],
    ['ราศีกรกฎ', 6, 21],  ['ราศีสิงห์',  7, 23],
    ['ราศีกันย์', 8, 23], ['ราศีตุลย์',  9, 23],
    ['ราศีพิจิก', 10, 23],['ราศีธนู',   11, 22],
  ]

  for (let i = 0; i < boundaries.length; i++) {
    const [sign, startMonth, startDay] = boundaries[i]
    const [, nextMonth, nextDay] = boundaries[(i + 1) % boundaries.length]

    if (
      (month === startMonth && day >= startDay) ||
      (month === nextMonth && day < nextDay)
    ) {
      return ZODIAC_DATA.find(z => z.sign === sign) || ZODIAC_DATA[0]
    }
  }

  return ZODIAC_DATA[9] // ราศีมกร default
}

// ── Gem Recommendations ──────────────────────────────────────
const GEM_DETAILS: Record<string, { emoji: string; power: 1 | 2 | 3 }> = {
  'เพชร':        { emoji: '💎', power: 3 },
  'ทับทิม':      { emoji: '❤️', power: 3 },
  'ไพลิน':       { emoji: '💙', power: 3 },
  'มรกต':        { emoji: '💚', power: 3 },
  'บุษราคัม':    { emoji: '💛', power: 2 },
  'อเมทิสต์':   { emoji: '💜', power: 2 },
  'มุก':         { emoji: '🤍', power: 2 },
  'โรสควอตซ์':  { emoji: '🩷', power: 2 },
  'ซิทริน':      { emoji: '🟡', power: 1 },
  'การ์เนต':     { emoji: '🔴', power: 2 },
  'ออนิกซ์ดำ':  { emoji: '⬛', power: 2 },
  'อความารีน':  { emoji: '🩵', power: 2 },
  'ลาพิสลาซูลี': { emoji: '🔵', power: 2 },
  'มูนสโตน':    { emoji: '🌙', power: 1 },
  'โอปอล':      { emoji: '🌈', power: 2 },
  'เทอร์คอยส์': { emoji: '🩵', power: 1 },
}

export function buildAstroMatchResult(
  birthdate: Date,
  purpose: 'money' | 'love' | 'health' | 'power'
): AstroMatchResult {
  const zodiac = getZodiacFromBirthdate(birthdate)

  const purposeMessages: Record<string, string> = {
    money:  `สำหรับ${zodiac.sign}ธาตุ${zodiac.element} — ${zodiac.lucky_stones[0]}เป็นอัญมณีแห่งความมั่งคั่ง เสริมพลังดึงดูดโชคลาภและความสำเร็จทางธุรกิจ`,
    love:   `สำหรับ${zodiac.sign}ธาตุ${zodiac.element} — ${zodiac.lucky_stones[0]}เปิดพลังงานหัวใจ เสริมความรักและความสัมพันธ์ที่งดงาม`,
    health: `สำหรับ${zodiac.sign}ธาตุ${zodiac.element} — ${zodiac.lucky_stones[0]}สมดุลพลังงานชีวิต เสริมสุขภาพและความมีชีวิตชีวา`,
    power:  `สำหรับ${zodiac.sign}ธาตุ${zodiac.element} — ${zodiac.lucky_stones[0]}เสริมอำนาจและความน่าเชื่อถือ ดึงดูดความสำเร็จและการยอมรับ`,
  }

  const recommended_stones: RecommendedStone[] = zodiac.lucky_stones.map((stone, i) => {
    const details = GEM_DETAILS[stone] || { emoji: '✨', power: 1 as const }
    return {
      name: stone,
      emoji: details.emoji,
      benefit: zodiac.strengths[i] || zodiac.strengths[0],
      reason: i === 0 ? zodiac.gem_benefit : `เสริม${zodiac.strengths[i] || 'พลังงาน'}`,
      power_level: details.power,
    }
  })

  return {
    zodiac,
    recommended_stones,
    personal_message: purposeMessages[purpose],
  }
}
