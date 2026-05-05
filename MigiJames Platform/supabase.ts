import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase (ใช้ใน Components)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase (ใช้ใน API Routes เท่านั้น - ไม่ expose ใน browser)
export function createServerSupabase() {
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
