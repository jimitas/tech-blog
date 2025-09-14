import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Article = {
  id: string
  title: string
  content: string
  author_id: string
  created_at: string
  updated_at: string
  author?: {
    id: string
    email: string
    user_metadata: {
      name?: string
      avatar_url?: string
    }
  }
}